import { trans } from 'reactor/localization';

export default {
    rule: 'minLength',
    evaluate: function minLength(value, props) {
        const minLength = props.minLength;
        return {
            hasError: String(value).length < minLength,
            errorMessage: trans('validation.minLength', minLength),
        }
    }
};
