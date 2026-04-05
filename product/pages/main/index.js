import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {FooterComponent} from "../../components/footer/index.js";
import { productStore } from "../../data.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filterText = '';
    }

    get pageRoot() {
        return document.getElementById('main-page')
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

        const footer = new FooterComponent(this.parent);
        footer.render(this.goHome.bind(this));
    }
}
