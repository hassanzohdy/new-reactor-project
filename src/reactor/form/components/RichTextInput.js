import React from 'react';
import Label from './Label';
import { trans } from 'reactor/localization/translator';
import toInputName from 'reinforcements/src/utilities/str/toInputName';
import { FormControl, styled, FormHelperText, makeStyles } from '@material-ui/core';
import useRequiredInputValidator from '../hooks/use-required-input-validator';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichTextInput.scss';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// When the editor is empty, it returns the following html text
// in that case we'll compare the value with the following constant
// If it equals it, then we'll consider the value is empty
const emptyValueString = '<p><br></p>';

const InputWrapper = styled(FormControl)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
}));

const InputLabel = styled(Label)(({ theme }) => ({
    marginBottom: theme.spacing(1.5),
}));

// const useStyles = makeStyles({
//     root: {
//         '.ql-editor': {
//             textAlign: 'left',
//             direction: 'ltr',
//             display: 'none !important',
//         }
//     }
// });


export default function RichTextInput({ required, name, defaultValue, style = { height: '200px', direction: 'rtl' }, placeholder, value, onChange, label, ...otherProps }) {
    const contentBlock = htmlToDraft(defaultValue || value || '');

    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

    const [editorState, setEditorState] = React.useState(EditorState.createWithContent(contentState));
    const [inputValue, setValue] = React.useState(() => {
        if (defaultValue || value) return defaultValue || value;

        return '';
    });

    const onContentStateChange = contentState => {
        const value = draftToHtml(contentState);
        setValue(value);

        if (onChange) {
            onChange(value);
        }

        if (!value) {
            setError(trans('validation.required'));
        } else {
            clearRequiredValidation();
        }
    };

    const [error, setError] = React.useState(null);

    const hasError = Boolean(error);

    const componentRef = React.useRef();

    const clearRequiredValidation = useRequiredInputValidator(required, componentRef, inputValue, setError);

    if (placeholder) {
        placeholder = trans(placeholder);
    }

    return (
        <InputWrapper error={hasError} fullWidth>
            <InputLabel label={trans(label)} required={required} />

            <Editor
                onContentStateChange={onContentStateChange}
                editorState={editorState}
                textAlignment="right"
                onEditorStateChange={setEditorState}
            />

            <FormHelperText error={hasError}>{error}</FormHelperText>

            {name &&
                <input type="hidden" name={toInputName(name)} value={inputValue} />
            }
        </InputWrapper>
    );
}