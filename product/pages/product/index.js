import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { productStore } from "../../data.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        return productStore.items.find(p => p.id == this.id);
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    goHome() {
        new MainPage(this.parent).render();
    }

    render() {
        const product = this.getData();
        if (!product) {
            new MainPage(this.parent).render();
            return;
        }

        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(this.goHome.bind(this));

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backBtn = new BackButtonComponent(this.pageRoot);
        backBtn.render(this.clickBack.bind(this));

        const productComp = new ProductComponent(this.pageRoot);
        productComp.render(product);
    }
}
