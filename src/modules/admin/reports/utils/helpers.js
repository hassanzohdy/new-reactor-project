import moment from 'moment';
import { trans } from 'reactor/localization';

export const years = [];

export const currentYear = moment().year();

for (let year = currentYear; year >= currentYear - 20; year--) {
    years.push(year);
}

const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

export const months = monthsList.map((month, index) => ({
    label: trans(month),
    value: index + 1,
}));
