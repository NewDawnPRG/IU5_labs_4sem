export class FooterComponent {
    constructor(parent) {
        this.parent = parent;
        this.stylesInjected = false;
    }

    getStyles() {
        return `
            html, body {
                height: 100%;
                margin: 0;
            }
            body {
                display: flex;
                flex-direction: column;
            }
            body > :first-child {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            footer {
                margin-top: auto;
            }

            * {
                box-sizing: border-box;
            }
            :root {
                --hh-gray: #f5f5f5;
                --hh-text: #000;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            footer {
                background: var(--hh-gray);
                padding: 40px 0;
                border-top: 1px solid #e0e0e0;
            }
            .footer-links {
                display: flex;
                gap: 30px;
                flex-wrap: wrap;
            }
            .footer-col h4 {
                margin-top: 0;
                font-size: 14px;
                color: #666;
            }
            .footer-col a {
                display: block;
                text-decoration: none;
                color: var(--hh-text);
                margin-bottom: 8px;
                font-size: 14px;
            }
            .copyright {
                margin-top: 30px;
                font-size: 12px;
                color: #999;
            }
        `;
    }

    injectStyles() {
        if (this.stylesInjected) return;
        const styleTag = document.createElement('style');
        styleTag.id = 'hh-footer-styles';
        styleTag.textContent = this.getStyles();
        document.head.appendChild(styleTag);
        this.stylesInjected = true;
    }

    getHTML() {
        return `
            <footer>
                <div class="container">
                    <div class="footer-links">
                        <div class="footer-col">
                            <h4>Соискателям</h4>
                            <a href="#">Каталог вакансий</a>
                            <a href="#">Работа рядом с метро</a>
                            <a href="#">Рейтинг работодателей</a>
                        </div>
                        <div class="footer-col">
                            <h4>Работодателям</h4>
                            <a href="#">Размещение вакансий</a>
                            <a href="#">Поиск по резюме</a>
                            <a href="#">Тарифы</a>
                        </div>
                        <div class="footer-col">
                            <h4>Помощь</h4>
                            <a href="#">Вопросы и ответы</a>
                            <a href="#">Написать в поддержку</a>
                            <a href="#">Безопасный HeadHunter</a>
                        </div>
                    </div>
                    <div class="copyright">
                        © 2026 ЛР Выполнена Калмыков Александр Юрьевич
                    </div>
                </div>
            </footer>
        `;
    }

    render() {
        this.injectStyles();
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
