window.onload = function() {
    let a = '';
    let b = '';
    let selectedOp = null;
    let result = null;
    let memory = 0;

    // (+) Стек для скобок: хранит { a, op }
    let stack = [];

    const display = document.getElementById('display');
    const resultDiv = document.querySelector('.result');

    const MAX_LEN = 12;

    function formatNumber(str) {
        if (str === '' || str === '-') return '0';
        if (str === 'Ошибка') return 'Ошибка';

        if (str.length <= MAX_LEN) return str;

        let num = parseFloat(str);
        if (isNaN(num)) return 'Ошибка';

        let rounded = num.toPrecision(MAX_LEN - 1);
        if (rounded.length > MAX_LEN) {
            rounded = rounded.slice(0, MAX_LEN);
        }
        return rounded;
    }

    function canAddDigit(currentValue, digit) {
        let newValue = currentValue + digit;
        if (newValue.length > MAX_LEN) {
            updateDisplay('Ошибка');
            return false;
        }
        return true;
    }

    function updateDisplay(value) {
        display.innerText = formatNumber(value);
    }

    function performCalculation() {
        if (a === '' || b === '' || selectedOp === null) return false;

        let num1 = parseFloat(a);
        let num2 = parseFloat(b);
        let res;

        switch (selectedOp) {
            case '+': res = num1 + num2; break;
            case '-': res = num1 - num2; break;
            case 'x': res = num1 * num2; break;
            case '/':
                if (num2 === 0) {
                    updateDisplay('Ошибка');
                    a = '';
                    b = '';
                    selectedOp = null;
                    return false;
                }
                res = num1 / num2;
                break;
            default: return false;
        }

        result = res;
        a = formatNumber(result.toString());
        b = '';
        updateDisplay(a);
        return true;
    }

    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let f = 1;
        for (let i = 2; i <= n; i++) f *= i;
        return f;
    }

    const buttons = document.querySelectorAll('.my-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.innerText;

            if (text === '(') {
                stack.push({ a: a, op: selectedOp });
                a = '';
                b = '';
                selectedOp = null;
                updateDisplay('0');
                return;
            }

            if (text === ')') {
                if (stack.length === 0) {
                    updateDisplay('Ошибка');
                    return;
                }
                if (selectedOp !== null && b !== '') {
                    performCalculation();
                }
                let innerResult = parseFloat(a);
                if (isNaN(innerResult)) {
                    updateDisplay('Ошибка');
                    a = ''; b = ''; selectedOp = null; stack = [];
                    return;
                }
                let prev = stack.pop();
                let prevA = prev.a;
                let prevOp = prev.op;

                if (prevA === '' || prevOp === null) {
                    a = innerResult.toString();
                } else {
                    let num1 = parseFloat(prevA);
                    let res;
                    switch (prevOp) {
                        case '+': res = num1 + innerResult; break;
                        case '-': res = num1 - innerResult; break;
                        case 'x': res = num1 * innerResult; break;
                        case '/':
                            if (innerResult === 0) {
                                updateDisplay('Ошибка');
                                a = ''; b = ''; selectedOp = null; stack = [];
                                return;
                            }
                            res = num1 / innerResult;
                            break;
                        default: res = innerResult;
                    }
                    a = formatNumber(res.toString());
                }
                b = '';
                selectedOp = null;
                updateDisplay(a);
                return;
            }

            if (!isNaN(parseInt(text)) || text === '.') {
                if (selectedOp === null) {
                    if (a === '' && text === '.') {
                        a = '0.';
                        updateDisplay(a);
                        return;
                    }
                    if (canAddDigit(a, text)) {
                        a += text;
                        updateDisplay(a);
                    }
                } else {
                    if (b === '' && text === '.') {
                        b = '0.';
                        updateDisplay(b);
                        return;
                    }
                    if (canAddDigit(b, text)) {
                        b += text;
                        updateDisplay(b);
                    }
                }
            }

            else if (text === '+' || text === '-' || text === 'x' || text === '/') {
                if (a === '') return;
                if (selectedOp !== null && b !== '') {
                    performCalculation();
                }
                selectedOp = text;
            }

            else if (text === 'C') {
                a = '';
                b = '';
                selectedOp = null;
                result = null;
                stack = [];
                updateDisplay('0');
            }

            else if (text === '=') {
                if (a !== '' && b !== '' && selectedOp !== null) {
                    performCalculation();
                    selectedOp = null;
                }
            }

            else if (text === '+/-') {
                if (selectedOp === null && a !== '') {
                    let val = parseFloat(a) * -1;
                    a = formatNumber(val.toString());
                    updateDisplay(a);
                } else if (selectedOp !== null && b !== '') {
                    let val = parseFloat(b) * -1;
                    b = formatNumber(val.toString());
                    updateDisplay(b);
                }
            }

            else if (text === '%') {
                if (selectedOp === null && a !== '') {
                    let val = parseFloat(a) / 100;
                    a = formatNumber(val.toString());
                    updateDisplay(a);
                } else if (selectedOp !== null && b !== '') {
                    let val = parseFloat(b) / 100;
                    b = formatNumber(val.toString());
                    updateDisplay(b);
                }
            }

            else if (text === '←') {
                if (selectedOp === null && a !== '') {
                    a = a.slice(0, -1);
                    updateDisplay(a === '' ? '0' : a);
                } else if (selectedOp !== null && b !== '') {
                    b = b.slice(0, -1);
                    updateDisplay(b === '' ? '0' : b);
                }
            }

            else if (text === '√') {
                let current = (selectedOp === null) ? a : b;
                if (current !== '') {
                    let val = parseFloat(current);
                    if (val < 0) {
                        updateDisplay('Ошибка');
                        return;
                    }
                    let root = Math.sqrt(val);
                    let formatted = formatNumber(root.toString());
                    if (selectedOp === null) {
                        a = formatted;
                        updateDisplay(a);
                    } else {
                        b = formatted;
                        updateDisplay(b);
                    }
                }
            }

            else if (text === 'x²') {
                let current = (selectedOp === null) ? a : b;
                if (current !== '') {
                    let val = parseFloat(current);
                    let square = val * val;
                    let formatted = formatNumber(square.toString());
                    if (selectedOp === null) {
                        a = formatted;
                        updateDisplay(a);
                    } else {
                        b = formatted;
                        updateDisplay(b);
                    }
                }
            }

            else if (text === 'x!') {
                let current = (selectedOp === null) ? a : b;
                if (current !== '') {
                    let val = parseFloat(current);
                    if (val < 0 || !Number.isInteger(val)) {
                        updateDisplay('Ошибка');
                        return;
                    }
                    let fact = factorial(val);
                    let formatted = formatNumber(fact.toString());
                    if (selectedOp === null) {
                        a = formatted;
                        updateDisplay(a);
                    } else {
                        b = formatted;
                        updateDisplay(b);
                    }
                }
            }

            else if (text === '000') {
                if (selectedOp === null) {
                    if (canAddDigit(a, '000')) {
                        a += '000';
                        updateDisplay(a);
                    }
                } else {
                    if (canAddDigit(b, '000')) {
                        b += '000';
                        updateDisplay(b);
                    }
                }
            }

            else if (text === 'M+') {
                let current = (selectedOp === null && a !== '') ? parseFloat(a) :
                              (selectedOp !== null && b !== '') ? parseFloat(b) :
                              (result !== null) ? result : 0;
                memory += current;
            }

            else if (text === 'M-') {
                let current = (selectedOp === null && a !== '') ? parseFloat(a) :
                              (selectedOp !== null && b !== '') ? parseFloat(b) :
                              (result !== null) ? result : 0;
                memory -= current;
            }

            else if (text === 'Disp') {
                if (resultDiv.style.backgroundColor === 'lightblue') {
                    resultDiv.style.backgroundColor = '';
                } else {
                    resultDiv.style.backgroundColor = 'lightblue';
                }
            }

            else if (text === 'Tg') {
                let current = (selectedOp === null) ? a : b;
                if (current !== '') {
                    let val = parseFloat(current);
                    let rad = val * (Math.PI / 180);
                    let res = Math.tan(rad);
                    if (!isFinite(res)) {
                        updateDisplay('Ошибка');
                        return;
                    }
                    res = parseFloat(res.toFixed(10));
                    let formatted = formatNumber(res.toString());
                    if (selectedOp === null) {
                        a = formatted;
                        updateDisplay(a);
                    } else {
                        b = formatted;
                        updateDisplay(b);
                    }
                }
            }
        });
    });
};
