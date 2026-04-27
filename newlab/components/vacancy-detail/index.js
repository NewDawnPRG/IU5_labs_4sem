import { createVacancyActions } from '../vacancy-actions/index.js';

export function createVacancyDetail(vacancy) {
  const detail = document.createElement('div');
  detail.className = 'vacancy-detail';

  const renderList = (arr) => arr.map(item => `<li>${item}</li>`).join('');

  detail.innerHTML = `
    <div class="vacancy-header">
      <h1 class="vacancy-title">${vacancy.title}</h1>
      <div class="vacancy-salary-large">${vacancy.salary}</div>
      <div class="vacancy-company-name">${vacancy.company}</div>
      <div class="vacancy-meta">
        ${vacancy.city}<br>
        Опыт работы: ${vacancy.experience}<br>
        ${vacancy.employment}<br>
        Опубликовано ${vacancy.published}
      </div>
    </div>

    <div class="vacancy-section">
      <h2 class="vacancy-section-title">Обязанности:</h2>
      <div class="vacancy-section-content"><ul>${renderList(vacancy.description.duties)}</ul></div>
    </div>

    <div class="vacancy-section">
      <h2 class="vacancy-section-title">Требования:</h2>
      <div class="vacancy-section-content"><ul>${renderList(vacancy.description.requirements)}</ul></div>
    </div>

    <div class="vacancy-section">
      <h2 class="vacancy-section-title">Условия:</h2>
      <div class="vacancy-section-content"><ul>${renderList(vacancy.description.conditions)}</ul></div>
    </div>
  `;

  detail.appendChild(createVacancyActions());
  return detail;
}
