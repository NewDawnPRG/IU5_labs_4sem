export function createFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
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
            <div class="copyright">© 2026 ЛР Выполнена Калмыков Александр Юрьевич</div>
        </div>
    `;
    return footer;
}
