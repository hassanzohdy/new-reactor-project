import React from 'react';
import useOnce from 'reactor/hooks/useOnce';
import { lastRequest } from 'reactor/http/endpoint';

export default function useRequest(promiseFunction, loading) {
    const [state, setState] = React.useState({
        value: null,
        error: null,
        isLoading: false,
        isLoaded: false,
    });

    useOnce(() => {
        setState({
            ...state,
            isLoading: true,
        });

        promiseFunction().then(response => {
            setState({
                value: response,
                isLoaded: true,
                isLoading: false,
                error: null
            });

            loading && loading(false);
        })
            .catch(response => {
                if (response.__CANCEL__ === true) return;

                loading && loading(false);

                setState({
                    value: null,
                    isLoaded: true,
                    isLoading: false,
                    error: response
                });
            });

        let request;

        setTimeout(() => {
            request = lastRequest();
        }, 0);

        return () => request.abort();
    });

    return [state.value, state.error, state.isLoading];
}