import { createSearchSection } from '../../components/search-section/index.js';
import { createVacancyCard } from '../../components/vacancy-card/index.js';
import { vacancies } from '../../data.js';

export function renderMainPage(onNavigate) {
  const container = document.createElement('div');
  container.className = 'container';

  const searchSection = createSearchSection();
  container.appendChild(searchSection);

  const listWrapper = document.createElement('div');
  listWrapper.style.marginBottom = '40px';
  listWrapper.innerHTML = `<h2 class="section-title">Вакансии дня</h2>`;
  const listDiv = document.createElement('div');
  listDiv.className = 'vacancy-list';
  listWrapper.appendChild(listDiv);
  container.appendChild(listWrapper);

  const input = searchSection.querySelector('.search-input');

  const renderList = (filterText = '') => {
    listDiv.innerHTML = '';
    const filtered = vacancies.filter(v =>
      v.title.toLowerCase().includes(filterText.toLowerCase()) ||
      v.company.toLowerCase().includes(filterText.toLowerCase())
    );
    filtered.forEach(v => {
      listDiv.appendChild(createVacancyCard(v, onNavigate));
    });
  };

  input.addEventListener('input', (e) => renderList(e.target.value));
  renderList();

  return container;
}
