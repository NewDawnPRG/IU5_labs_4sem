function concatenate(arr, separator) {
    let result = '';
    for (let i = 0; i < arr.length; i++) {
        if (i > 0) result += separator;
        result += arr[i];
    }
    return result;
}

function erase(arr) {
    return arr.filter(item => Boolean(item));
}

console.log(concatenate(['Я','Учусь','на','лучшей','кафедре'], ' '));

const data = [0, 1, false, 2, undefined, '', 3, null];
console.log(erase(data)) // [1, 2, 3]
