import { setTitle, setDescription, setImage, setUrl, setCanonicalUrl } from '../metadata';
import { trans } from 'reactor/localization';

export default function Helmet({ title, id, image, url, canonicalUrl, appendAppName = true, description, bodyClass }) {
    setTitle(trans(title) +  (appendAppName ? ' | ' + trans('appName') : ''));

    if (description) {
        setDescription(description);
    }

    if (image) {
        setImage(image);
    }

    if (url) {
        if (url === true) {
            url = window.location.href;
        }
        setUrl(url);
    }

    if (! canonicalUrl && url) {
        canonicalUrl = url;
    }

    if (canonicalUrl) {
        setCanonicalUrl(canonicalUrl);
    }

    if (bodyClass) {
        document.body.className = bodyClass;
    }

    if (id) {
        document.body.id = id;
    }

    return '';
}