import { createBackButton } from '../../components/back-button/index.js';
import { createVacancyDetail } from '../../components/vacancy-detail/index.js';
import { vacancies } from '../../data.js';

export function renderVacancyPage(id, onBack) {
  const vacancy = vacancies.find(v => v.id === id);
  if (!vacancy) {
    return document.createElement('div');
  }

  const container = document.createElement('div');
  container.className = 'container';
  container.style.paddingTop = '20px';

  const backBtn = createBackButton();
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    onBack();
  });
  container.appendChild(backBtn);
  container.appendChild(createVacancyDetail(vacancy));

  return container;
}
