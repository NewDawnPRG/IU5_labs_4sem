export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
        this.stylesInjected = false;
    }

    getStyles() {
        return `
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #fff;
            }

            :root {
                --hh-red: #d6001c;
                --hh-text: #000;
            }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }

            header {
                border-bottom: 1px solid #e0e0e0;
                padding: 15px 0;
                background: #fff;
                position: sticky;
                top: 0;
                z-index: 100;
            }

            .header-inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
            }

            .logo {
                font-size: 24px;
                font-weight: bold;
                color: var(--hh-red);
                text-decoration: none;
            }

            .nav-links {
                display: flex;
                gap: 15px;
            }

            .nav-links a {
                text-decoration: none;
                color: var(--hh-text);
                font-size: 14px;
            }

            .auth-buttons {
                display: flex;
                gap: 10px;
            }

            .btn {
                padding: 8px 16px;
                border-radius: 4px;
                text-decoration: none;
                font-size: 14px;
                display: inline-block;
                border: none;
                font-family: inherit;
                cursor: pointer;
            }

            .btn-outline {
                border: 1px solid var(--hh-red);
                color: var(--hh-red);
                background: #fff;
            }

            .btn-primary {
                background: var(--hh-red);
                color: #fff;
                border: 1px solid var(--hh-red);
            }
        `;
    }

    injectStyles() {
        if (this.stylesInjected) return;
        const styleTag = document.createElement('style');
        styleTag.id = 'hh-header-styles';
        styleTag.textContent = this.getStyles();
        document.head.appendChild(styleTag);
        this.stylesInjected = true;
    }

    getHTML() {
        return `
            <header>
                <div class="container header-inner">
                    <a href="index.html" class="logo" id="home-button">hh.ru</a>
                    <nav class="nav-links">
                        <a href="#">Москва</a>
                        <a href="#">Соискателям</a>
                        <a href="#">Работодателям</a>
                        <a href="#">Карьерная консультация</a>
                    </nav>
                    <div class="auth-buttons">
                        <a href="#" class="btn btn-outline">Войти</a>
                        <a href="#" class="btn btn-primary">Создать резюме</a>
                    </div>
                </div>
            </header>
        `;
    }

    addListeners(listener) {
        document.getElementById("home-button")?.addEventListener("click", listener);
    }

    render(listener) {
        this.injectStyles();
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
