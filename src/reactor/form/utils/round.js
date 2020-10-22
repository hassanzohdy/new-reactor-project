/**
 * Round number with given precision
 * 
 * @param   Number value
 * @param   Number precision
 * @returns Number;
 */
export default function round(value, precision = 2) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.floor(value * multiplier) / multiplier;
} 