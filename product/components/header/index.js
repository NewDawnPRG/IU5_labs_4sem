export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <nav class="navbar navbar-light bg-light">
                <div class="container-fluid">
                    <button id="home-button" class="btn btn-outline-primary">🏠 Домой</button>
                </div>
            </nav>
        `;
    }

    addListeners(listener) {
        document.getElementById("home-button")?.addEventListener("click", listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
