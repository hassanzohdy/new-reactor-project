/**
 * Toggle the given value in the given array
 * If the toggleIn value is true, then the value will be appended.
 * 
 * @example toggleArrayValue([1, 2], 3, true) // [1, 2, 3] // add value 3
 * @example toggleArrayValue([1, 2, 3], 3, true) // [1, 2, 3] will not add it again
 * @example toggleArrayValue([1, 2, 3], 2, false) // [1, 3] remove the value 2
 * 
 * @param {Array} array
 * @param {any} value
 * @param {boolean} toggleIn
 * @param {Function} indexFilter
 * @returns {Array}
 */
export default function toggleArrayValue(array, value, toggleIn, indexFilter) {
    if (toggleIn === true) {
        if (array.includes(value)) return array;

        array.push(value);
    } else {
        function arrayFilterIndex(arrayValue, comingValue) {
            return Object.is(arrayValue, comingValue);
        }

        if (!indexFilter) {
            indexFilter = arrayFilterIndex;
        }

        const valueIndex = array.findIndex((arrayValue) => indexFilter(arrayValue, value));

        array.splice(valueIndex, 1);
    }

    return array;
}