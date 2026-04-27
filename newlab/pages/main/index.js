import { createSearchSection } from '../../components/search-section/index.js';
import { createCategories } from '../../components/categories/index.js';
import { createVacancyList } from '../../components/vacancy-list/index.js';

export function renderMainPage() {
    const container = document.createElement('div');
    container.className = 'container';

    container.appendChild(createSearchSection());
    container.appendChild(createCategories());
    container.appendChild(createVacancyList());

    return container;
}
