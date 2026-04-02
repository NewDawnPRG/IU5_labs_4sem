import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { productStore } from "../../data.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div class="container mt-2">
                    <button id="add-button" class="btn btn-success mb-3">➕ Добавить копию первой карточки</button>
                    <div id="main-page" class="d-flex flex-wrap"></div>
                </div>
            `
        )
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    deleteCard(e) {
        const cardId = e.target.dataset.id;
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

    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(this.goHome.bind(this));

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const addBtn = document.getElementById('add-button');
        if (addBtn) addBtn.addEventListener('click', this.addCard.bind(this));

        const container = document.getElementById('main-page');
        productStore.items.forEach(item => {
            const card = new ProductCardComponent(container);
            card.render(
                item,
                this.clickCard.bind(this),
                this.deleteCard.bind(this)
            );
        });
    }
}
