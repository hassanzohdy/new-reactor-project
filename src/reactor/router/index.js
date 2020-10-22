import 'shared/modules';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes-handler';
import concatRoute from './concat-route';
import stackBuilder from './stackBuilder';
import initiateNavigator from './navigator';
import {queryString, hash} from './router-history';
import { addRouter, partOf, group } from './routes-list';
import { navigateTo, navigateBack, switchLang, refresh, currentRoute } from './navigator';

/**
 * Scan the entire routes list
 * 
 * @returns  {void}
 */
export function scan() {
    initiateNavigator();
    ReactDOM.render(<Routes />, document.getElementById('root'));
}

export { concatRoute, navigateTo, navigateBack, switchLang, refresh, currentRoute };
export default {
    add: addRouter,
    partOf,
    group,
    hash,
    stack: stackBuilder,
    get queryString() {
        return queryString();
    }
};