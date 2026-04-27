export function createSearchSection() {
    const section = document.createElement('section');
    section.className = 'search-section';
    section.innerHTML = `
        <div class="container">
            <h1>Поиск работы в Москве</h1>
            <div class="search-box">
                <input type="text" class="search-input" placeholder="Должность, ключевые слова">
                <button class="btn search-btn">Найти</button>
            </div>
        </div>
    `;
    return section;
}
