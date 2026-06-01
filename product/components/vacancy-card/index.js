export class VacancyCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Используем placeholder если нет картинки
        const imageUrl = data.image && data.image.trim()
            ? data.image
            : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop';

        return `
        <div class="card h-100 shadow-sm">
            <img src="${imageUrl}"
                 class="card-img-top"
                 alt="${data.title || 'Вакансия'}"
                 onerror="this.src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop'">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data.title || 'Без названия'}</h5>
                <p class="card-text text-success fw-bold mb-1">${data.salary || 'Зарплата не указана'}</p>
                <p class="card-text text-muted mb-1">
                    <small>🏢 ${data.company || 'Компания не указана'}</small>
                </p>
                <p class="card-text text-muted mb-1">
                    <small>📍 ${data.city || 'Город не указан'}</small>
                </p>
                <p class="card-text text-muted mb-2">
                    <small>💼 ${data.employment || ''} • ⏱ ${data.experience || 'Опыт не указан'}</small>
                </p>
                <p class="card-text text-muted mb-3">
                    <small>📅 ${data.published || ''}</small>
                </p>
                <div class="mt-auto d-flex gap-2 flex-wrap">
                    <button class="btn btn-primary btn-sm flex-fill" data-action="view" data-id="${data.id}">
                        Подробнее
                    </button>
                    <button class="btn btn-primary btn-sm flex-fill" data-action="edit" data-id="${data.id}">
                        Редактировать
                    </button>
                    <button class="btn btn-danger btn-sm" data-action="delete" data-id="${data.id}">
                        🗑️
                    </button>
                </div>
            </div>
        </div>`;
    }

    render(data, onView, onEdit, onDelete) {
        this.parent.innerHTML = this.getHTML(data);
        const btns = this.parent.querySelectorAll('button');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const id = e.target.dataset.id;
                if (action === 'view') onView(id);
                else if (action === 'edit') onEdit(id);
                else if (action === 'delete') onDelete(id);
            });
        });
    }
}
