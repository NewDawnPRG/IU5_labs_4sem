export function createVacancyCard(vacancy, onDetailsClick, onDeleteClick, onCopyClick) {
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-3';

    col.innerHTML = `
        <div class="card vacancy-card h-100">
            <img src="${vacancy.image}" class="vacancy-img" alt="${vacancy.title}">
            <div class="vacancy-info">
                <h3>${vacancy.title}</h3>
                <div class="vacancy-salary">${vacancy.salary}</div>
                <div class="vacancy-company">${vacancy.company}</div>
            </div>

            <div class="vacancy-brief" style="display: none; margin-top: 10px; font-size: 13px; color: #666;">
                <div>📍 ${vacancy.city}</div>
                <div>💼 Опыт: ${vacancy.experience}</div>
                <div>⏱ ${vacancy.employment}</div>
            </div>

            <div class="card-actions d-flex justify-content-between align-items-center" style="margin-top: 15px; display: none;">
                <button class="btn btn-primary btn-sm details-btn">Подробнее</button>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary btn-sm copy-btn" title="Копировать">📋</button>
                    <button class="btn btn-outline-danger btn-sm delete-btn" title="Удалить">🗑</button>
                </div>
            </div>
        </div>
    `;

    const card = col.querySelector('.card');
    const brief = col.querySelector('.vacancy-brief');
    const actions = col.querySelector('.card-actions');
    let isExpanded = false;

    card.addEventListener('click', (e) => {
        if (e.target.closest('.details-btn') ||
            e.target.closest('.copy-btn') ||
            e.target.closest('.delete-btn')) {
            return;
        }

        isExpanded = !isExpanded;
        brief.style.display = isExpanded ? 'block' : 'none';
        actions.style.display = isExpanded ? 'flex' : 'none';
        card.style.background = isExpanded ? '#fff5f5' : '#fff';
    });

    col.querySelector('.details-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        onDetailsClick(vacancy.id);
    });

    col.querySelector('.copy-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        onCopyClick(vacancy);
    });

    col.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        onDeleteClick(vacancy.id);
    });

    return col;
}
