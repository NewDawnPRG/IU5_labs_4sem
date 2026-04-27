export function createCategories() {
    const section = document.createElement('section');
    section.innerHTML = `
        <h2 class="section-title">Популярное</h2>
        <div class="categories">
            <a href="#" class="cat-card">
                <span class="cat-title">Работа из дома</span>
                <span class="cat-salary">42 667 вакансий</span>
            </a>
            <a href="#" class="cat-card">
                <span class="cat-title">Подработка</span>
                <span class="cat-salary">до 505 000 ₽</span>
            </a>
            <a href="#" class="cat-card">
                <span class="cat-title">Курьер</span>
                <span class="cat-salary">5 000 – 305 000 ₽</span>
            </a>
            <a href="#" class="cat-card">
                <span class="cat-title">Водитель</span>
                <span class="cat-salary">20 000 – 355 000 ₽</span>
            </a>
            <a href="#" class="cat-card">
                <span class="cat-title">Продавец</span>
                <span class="cat-salary">10 000 – 250 000 ₽</span>
            </a>
            <a href="#" class="cat-card">
                <span class="cat-title">Программист</span>
                <span class="cat-salary">15 000 – 545 000 ₽</span>
            </a>
        </div>
    `;
    return section;
}
