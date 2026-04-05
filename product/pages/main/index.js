import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {FooterComponent} from "../../components/footer/index.js";
import { productStore } from "../../data.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filterText = '';
        this.bonusActivated = false;
        this.bonusSecret = {
            code: "открыть",
            bonusPercent: 10
        };
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    parseSalary(salaryText) {
        const match = salaryText.match(/(\d+(?:[.\s]\d+)?)/);
        if (!match) return 0;
        const numStr = match[0].replace(/[.\s]/g, '');
        return parseInt(numStr, 10) || 0;
    }

    getSalaryMatrix() {
        const items = productStore.items;
        const salaries = items.slice(0, 3).map(item => this.parseSalary(item.text));
        while (salaries.length < 3) salaries.push(0);
        return [
            [salaries[0], salaries[1], salaries[2]],
            [salaries[0], salaries[1], salaries[2]],
            [salaries[0], salaries[1], salaries[2]]
        ];
    }

    compressProductName(productName) {
        if (productName.length === 0) return "";
        let compressed = "";
        let count = 1;
        for (let i = 0; i < productName.length; i++) {
            if (productName[i] === productName[i + 1]) {
                count++;
            } else {
                compressed += productName[i];
                if (count > 1) compressed += count;
                count = 1;
            }
        }
        return compressed;
    }

    calculateSalaryMatrixDiagonalSum(matrix) {
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

    applySuperBonus() {
        if (this.bonusActivated) {
            alert("Супербонус уже был активирован ранее!");
            return;
        }

        let userInput;
        do {
            userInput = prompt("Введите кодовое слово для получения супербонуса (+10% к зарплате всех товаров):");
            if (userInput === null) {
                alert("Операция отменена.");
                return;
            }
            if (userInput !== this.bonusSecret.code) {
                alert(`Неверное слово! Попробуйте ещё раз. (Подсказка: "${this.bonusSecret.code}")`);
            }
        } while (userInput !== this.bonusSecret.code);

        productStore.items.forEach(item => {
            let currentSalary = this.parseSalary(item.text);
            const newSalary = Math.floor(currentSalary * (1 + this.bonusSecret.bonusPercent / 100));
            item.text = item.text.replace(/\d[\d.\s]*/, newSalary.toLocaleString('ru-RU').replace(/,/g, '.'));
        });

        this.bonusActivated = true;
        alert(`Супербонус активирован! Зарплаты увеличены на ${this.bonusSecret.bonusPercent}%.`);
        this.render();
    }

    onCompressButtonClick() {
        const inputEl = document.getElementById('rle-input');
        if (!inputEl) return;
        const rawString = inputEl.value;
        const compressed = this.compressProductName(rawString);
        const resultEl = document.getElementById('rle-result');
        if (resultEl) resultEl.textContent = `Результат сжатия: ${compressed}`;
    }

    onMatrixButtonClick() {
        const matrix = this.getSalaryMatrix();
        const sum = this.calculateSalaryMatrixDiagonalSum(matrix);
        const resultEl = document.getElementById('matrix-result');
        if (resultEl) {
            const matrixStr = matrix.map(row => `[ ${row.join(', ')} ]`).join('\n');
            resultEl.innerHTML = `<pre>Матрица зарплат (3x3):\n${matrixStr}</pre><strong>Сумма диагоналей: ${sum}</strong>`;
        }
    }

    getHTML() {
        const escapedFilter = this.filterText.replace(/"/g, '&quot;');
        return (
            `
                <div class="container mt-2">
                    <div class="row mb-3">
                        <div class="col">
                            <input type="text" id="filter-input" class="form-control" placeholder="Фильтр по названию..." value="${escapedFilter}">
                        </div>
                        <div class="col-auto">
                            <button id="clear-filter" class="btn btn-secondary">Сбросить</button>
                        </div>
                    </div>
                    <button id="add-button" class="btn btn-success mb-3">➕ Добавить копию первой карточки</button>
                    <div id="main-page" class="d-flex flex-wrap"></div>

                    <div class="card mt-4">
                        <div class="card-header bg-primary text-white">Сжатие названия вакансии (RLE)</div>
                        <div class="card-body">
                            <div class="mb-2">
                                <label for="rle-input" class="form-label">Введите строку (названия вакансий через запятую или любой текст):</label>
                                <input type="text" id="rle-input" class="form-control" placeholder="Например: Яблоки,Бананы,Груши">
                            </div>
                            <button id="compress-btn" class="btn btn-outline-primary">Сжать строку</button>
                            <div id="rle-result" class="mt-3 alert alert-secondary"></div>
                        </div>
                    </div>

                    <div class="card mt-4 mb-4">
                        <div class="card-header bg-success text-white">Матрица зарплат (первые 3 товара)</div>
                        <div class="card-body">
                            <p class="card-text">Матрица 3×3 построена на основе зарплат первых трёх вакансий.</p>
                            <button id="matrix-calc-btn" class="btn btn-outline-success">Вычислить сумму диагоналей</button>
                            <div id="matrix-result" class="mt-3 alert alert-info"></div>
                        </div>
                    </div>

                    <div class="card mt-4 mb-4">
                        <div class="card-header bg-warning text-dark">Супербонус (кодовое слово)</div>
                        <div class="card-body">
                            <p class="card-text">Активируйте скрытый бонус, введя секретное слово.</p>
                            <button id="super-bonus-btn" class="btn btn-warning">🔐 Получить супербонус</button>
                        </div>
                    </div>
                </div>
            `
        )
    }

    getFilteredItems() {
        if (!this.filterText.trim()) {
            return productStore.items;
        }
        const lowerFilter = this.filterText.toLowerCase();
        return productStore.items.filter(item =>
            item.title.toLowerCase().includes(lowerFilter)
        );
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        if (!cardId) return;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    deleteCard(e) {
        const cardId = e.target.dataset.id;
        if (!cardId) return;
        productStore.removeProduct(cardId);
        this.render();
    }

    addCard() {
        productStore.addProduct();
        this.render();
    }

    goHome() {
        this.render();
    }

    onFilterInput(e) {
        this.filterText = e.target.value;
        const cursorStart = e.target.selectionStart;
        const cursorEnd = e.target.selectionEnd;
        this.render(cursorStart, cursorEnd);
    }

    clearFilter() {
        this.filterText = '';
        this.render(0, 0);
    }

    render(savedCursorStart = null, savedCursorEnd = null) {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(this.goHome.bind(this));

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const filterInput = document.getElementById('filter-input');
        if (filterInput) {
            filterInput.addEventListener('input', this.onFilterInput.bind(this));
            if (savedCursorStart !== null && savedCursorEnd !== null) {
                filterInput.focus();
                filterInput.setSelectionRange(savedCursorStart, savedCursorEnd);
            }
        }

        const clearBtn = document.getElementById('clear-filter');
        if (clearBtn) {
            clearBtn.addEventListener('click', this.clearFilter.bind(this));
        }

        const addBtn = document.getElementById('add-button');
        if (addBtn) addBtn.addEventListener('click', this.addCard.bind(this));

        const container = document.getElementById('main-page');
        const filteredItems = this.getFilteredItems();
        filteredItems.forEach(item => {
            const card = new ProductCardComponent(container);
            card.render(
                item,
                this.clickCard.bind(this),
                this.deleteCard.bind(this)
            );
        });

        if (filteredItems.length === 0 && this.filterText.trim()) {
            container.insertAdjacentHTML('beforeend', '<div class="alert alert-info">Ничего не найдено</div>');
        }

        const compressBtn = document.getElementById('compress-btn');
        if (compressBtn) {
            compressBtn.addEventListener('click', this.onCompressButtonClick.bind(this));
        }
        const matrixBtn = document.getElementById('matrix-calc-btn');
        if (matrixBtn) {
            matrixBtn.addEventListener('click', this.onMatrixButtonClick.bind(this));
        }
        const superBonusBtn = document.getElementById('super-bonus-btn');
        if (superBonusBtn) {
            superBonusBtn.addEventListener('click', this.applySuperBonus.bind(this));
        }

        const rleInput = document.getElementById('rle-input');
        if (rleInput && productStore.items.length > 0) {
            const defaultNames = productStore.items.map(item => item.title).join(',');
            rleInput.value = defaultNames;
        }

        const footer = new FooterComponent(this.parent);
        footer.render(this.goHome.bind(this));
    }
}
