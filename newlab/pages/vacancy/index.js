import { createBackButton } from '../../components/back-button/index.js';
import { createVacancyDetail } from '../../components/vacancy-detail/index.js';

export function renderVacancyPage() {
    const container = document.createElement('div');
    container.className = 'container';
    container.style.paddingTop = '20px';

    container.appendChild(createBackButton());
    container.appendChild(createVacancyDetail());

    return container;
}
