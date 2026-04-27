export function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="container header-inner">
            <a href="#" class="logo" id="logo">hh.ru</a>
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
    `;

    const logo = header.querySelector('#logo');
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
        window.location.reload();
    });

    return header;
}
