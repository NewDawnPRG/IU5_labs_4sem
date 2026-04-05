function concatenate(arr, separator) {
    let result = '';
    for (let i = 0; i < arr.length; i++) {
        if (i > 0) result += separator;
        result += arr[i];
    }
    return result;
}

console.log(concatenate(['Я','Учусь','на','лучшей','кафедре'], ' '));
