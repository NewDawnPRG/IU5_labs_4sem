export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 300px;">
                    <img class="card-img-top" src="${data.src}" alt="картинка" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <span class="badge bg-primary">${data.badge}</span>
                        <h5 class="card-title mt-2">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <button class="btn btn-primary me-2" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                        <button class="btn btn-danger" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            `
        )
    }

    addListeners(data, clickListener, deleteListener) {
        document.getElementById(`click-card-${data.id}`).addEventListener("click", clickListener);
        document.getElementById(`delete-card-${data.id}`).addEventListener("click", deleteListener);
    }

    render(data, clickListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener, deleteListener);
    }
}
