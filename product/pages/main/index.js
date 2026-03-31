import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

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
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4pRJnmBD3zch6OPcvmTL_tJrpYJ5ULpn6zA&s",
                title: "Ноутбук",
                text: "Мощный ноутбук для работы и игр"
              },
              {
                id: 2,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHPl0uDKmPeHCWCMscHqMuByGFelP2uTj9A&s",
                title: "Смартфон",
                text: "Современный смартфон с отличной камерой"
              },
              {
                id: 3,
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVc9PYBPL62dq_HwuuwOj-C6Z5FliZHF9ETQ&s",
                title: "Наушники",
                text: "Беспроводные наушники с шумоподавлением"
              }
        ]
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
}
