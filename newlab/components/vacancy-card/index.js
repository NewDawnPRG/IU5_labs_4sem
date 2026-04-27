export function createVacancyCard(vacancy, onDetailsClick) {
    const card = document.createElement('div');
    card.className = 'vacancy-card';
    card.style.cursor = 'pointer';

    card.innerHTML = `
      <div class="vacancy-info">
        <h3>${vacancy.title}</h3>
        <div class="vacancy-salary">${vacancy.salary}</div>
        <div class="vacancy-company">${vacancy.company}</div>
      </div>
      <div class="vacancy-brief">
        <div class="brief-item">${vacancy.city}</div>
        <div class="brief-item">Опыт работы: ${vacancy.experience}</div>
        <div class="brief-item">${vacancy.employment}</div>
      </div>
      <div class="vacancy-card-actions">
        <button class="btn btn-primary details-btn">Подробнее</button>
      </div>
    `;

    const briefEl = card.querySelector('.vacancy-brief');
    const actionsEl = card.querySelector('.vacancy-card-actions');
    const detailsBtn = card.querySelector('.details-btn');

    briefEl.style.display = 'none';
    actionsEl.style.display = 'none';

    briefEl.style.marginTop = '10px';
    briefEl.style.fontSize = '14px';
    briefEl.style.color = '#666';
    briefEl.style.lineHeight = '1.5';
    actionsEl.style.marginTop = '15px';
    actionsEl.style.paddingTop = '10px';
    actionsEl.style.borderTop = '1px solid #e0e0e0';

    let isExpanded = false;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.details-btn')) return;

      isExpanded = !isExpanded;
      briefEl.style.display = isExpanded ? 'block' : 'none';
      actionsEl.style.display = isExpanded ? 'flex' : 'none';
      card.style.background = isExpanded ? '#fff5f5' : '#fff';
    });

    detailsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      onDetailsClick(vacancy.id);
    });

    return card;
  }
