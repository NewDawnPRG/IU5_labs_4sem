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

function sumDiagonals(matrix) {
    const n = matrix.length;
    let total = 0;

    for (let i = 0; i < n; i++) {
        total += matrix[i][i];
        total += matrix[i][n - 1 - i];
    }

    if (n % 2 === 1) {
        const mid = Math.floor(n / 2);
        total -= matrix[mid][mid];
    }

    return total;
}

function rle(str) {
    if (str.length === 0) return "";

    let result = "";
    let count = 1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result += str[i];
            if (count > 1) result += count;
            count = 1;
        }
    }

    return result;
}

console.log("----------[TASK 1.1]----------");

console.log(concatenate(['Я','Учусь','на','лучшей','кафедре'], ' '));

console.log("----------[TASK 1.10]----------");

const data = [0, 1, false, 2, undefined, '', 3, null];
console.log(erase(data)) // [1, 2, 3]

console.log("----------[TASK 2.7]----------");

const matrix = [[1,2,3], [4,5,6], [7,8,9]];
console.log(sumDiagonals(matrix));

console.log("----------[TASK 3.6]----------");

console.log(rle("aaabbbcc"));
console.log(rle("abc"));
console.log(rle(""));
