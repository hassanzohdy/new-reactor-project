export default function arraysEqual(array1, array2) {
    return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
}