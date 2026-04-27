import { createVacancyDetail } from '../../components/vacancy-detail/index.js';
import { vacancies } from '../../data.js';

export function renderVacancyPage(id) {
    const vacancy = vacancies.find(v => v.id === id);
    if (!vacancy) return document.createElement('div');

    const container = document.createElement('div');
    container.className = 'container';
    container.style.paddingTop = '20px';

    const backBtn = document.createElement('a');
    backBtn.href = '#';
    backBtn.className = 'back-link';
    backBtn.textContent = '← Назад к поиску';
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
    });

    container.appendChild(backBtn);
    container.appendChild(createVacancyDetail(vacancy));

    return container;
}
