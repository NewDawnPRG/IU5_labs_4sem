import { createSearchSection } from '../../components/search-section/index.js';
import { createVacancyCard } from '../../components/vacancy-card/index.js';
import { vacancies } from '../../data.js';

export function renderMainPage(onNavigate, onDelete, onCopy) {
    const container = document.createElement('div');
    container.className = 'container';

    const searchSection = createSearchSection();
    container.appendChild(searchSection);

    const listWrapper = document.createElement('div');
    listWrapper.innerHTML = `<h2 class="section-title">Вакансии дня</h2>`;

    const row = document.createElement('div');
    row.className = 'row';
    row.id = 'vacancies-row';

    listWrapper.appendChild(row);
    container.appendChild(listWrapper);

    const input = searchSection.querySelector('.search-input');

    const renderList = (filterText = '') => {
        row.innerHTML = '';
        const filtered = vacancies.filter(v =>
            v.title.toLowerCase().includes(filterText.toLowerCase()) ||
            v.company.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filtered.length === 0) {
            row.innerHTML = '<div class="col-12 text-center text-muted py-4">Вакансии не найдены</div>';
            return;
        }

        filtered.forEach(v => {
            row.appendChild(createVacancyCard(v, onNavigate, onDelete, onCopy));
        });
    };

    if (input) {
        input.addEventListener('input', (e) => renderList(e.target.value));
    }

    renderList();

    return container;
}
