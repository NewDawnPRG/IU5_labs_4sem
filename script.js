window.onload = function() {
    let a = '';
    let b = '';
    let selectedOp = null;
    let result = null;
    let memory = 0;

    const display = document.getElementById('display');
    const resultDiv = document.querySelector('.result');

    function updateDisplay(value) {
        display.innerText = value;
    }

    function calculate() {
        if (a === '' || b === '' || selectedOp === null) return;
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
                    a = ''; b = ''; selectedOp = null;
                    return;
                }
                res = num1 / num2;
                break;
            default: return;
        }
        result = res;
        a = result.toString();
        b = '';
        selectedOp = null;
        updateDisplay(a);
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

            // Цифры и точка
            if (!isNaN(parseInt(text)) || text === '.') {
                if (selectedOp === null) {
                    if (text === '.' && a.includes('.')) return;
                    a += text;
                    updateDisplay(a);
                } else {
                    if (text === '.' && b.includes('.')) return;
                    b += text;
                    updateDisplay(b);
                }
            }

            else if (text === '+' || text === '-' || text === 'x' || text === '/') {
                if (a === '') return;
                if (selectedOp !== null && b !== '') {
                    calculate();
                }
                selectedOp = text;
            }

            else if (text === 'C') {
                a = ''; b = ''; selectedOp = null; result = null;
                updateDisplay('0');
            }

            else if (text === '=') {
                if (a !== '' && b !== '' && selectedOp !== null) {
                    calculate();
                }
            }

            else if (text === '+/-') {
                if (selectedOp === null && a !== '') {
                    a = (parseFloat(a) * -1).toString();
                    updateDisplay(a);
                } else if (selectedOp !== null && b !== '') {
                    b = (parseFloat(b) * -1).toString();
                    updateDisplay(b);
                }
            }

            else if (text === '%') {
                if (selectedOp === null && a !== '') {
                    a = (parseFloat(a) / 100).toString();
                    updateDisplay(a);
                } else if (selectedOp !== null && b !== '') {
                    b = (parseFloat(b) / 100).toString();
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
                    if (selectedOp === null) {
                        a = root.toString();
                        updateDisplay(a);
                    } else {
                        b = root.toString();
                        updateDisplay(b);
                    }
                }
            }

            else if (text === 'x²') {
                let current = (selectedOp === null) ? a : b;
                if (current !== '') {
                    let val = parseFloat(current);
                    let square = val * val;
                    if (selectedOp === null) {
                        a = square.toString();
                        updateDisplay(a);
                    } else {
                        b = square.toString();
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
                    if (selectedOp === null) {
                        a = fact.toString();
                        updateDisplay(a);
                    } else {
                        b = fact.toString();
                        updateDisplay(b);
                    }
                }
            }

            else if (text === '000') {
                if (selectedOp === null) {
                    if (a === '0') a = '0';
                    a += '000';
                    updateDisplay(a);
                } else {
                    if (b === '0') b = '0';
                    b += '000';
                    updateDisplay(b);
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
        });
    });
};
