import { VacancyCardComponent } from "../../components/vacancy-card/index.js";
import { VacancyPage } from "../vacancy/index.js";
import { VacancyFormPage } from "../vacancy-form/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { VacancyApiService } from "../../services/api.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.api = new VacancyApiService();
        this.vacancies = [];
        this.filterText = '';
        this.isEditingWithDelay = false;
    }

    getHTML() {
        return `
        <div class="container mt-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h1 class="h3 mb-0">Вакансии</h1>
                <button id="add-btn" class="btn btn-danger">+ Добавить вакансию</button>
            </div>
            <div class="mb-3">
                <input type="text" id="filter-input" class="form-control" placeholder="Поиск по названию или компании...">
                <div id="search-status" class="form-text text-muted mt-1"></div>
            </div>
            <div id="loading" class="text-center my-5" style="display:none;">
                <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Загрузка...</span></div>
                <p class="mt-2 text-muted">Загрузка вакансий...</p>
            </div>
            <div id="error-msg" class="alert alert-danger" style="display:none;"></div>
            <div id="cards-container" class="row g-3"></div>
        </div>`;
    }

    updateSearchState() {
        const input = document.getElementById('filter-input');
        const status = document.getElementById('search-status');
        if (input) {
            input.disabled = this.isEditingWithDelay;
            input.placeholder = this.isEditingWithDelay ? 'Поиск временно заблокирован...' : 'Поиск по названию или компании...';
        }
        if (status) {
            status.innerHTML = this.isEditingWithDelay
                ? '<span class="text-warning">⏳ Запрос с задержкой выполняется. Поиск ожидает завершения.</span>'
                : '';
        }
    }

    loadVacancies() {
        const loading = document.getElementById('loading');
        const error = document.getElementById('error-msg');
        const container = document.getElementById('cards-container');

        loading.style.display = 'block';
        error.style.display = 'none';
        container.innerHTML = '';

        this.api.getAll(
            (data) => {
                this.vacancies = data;
                loading.style.display = 'none';
                this.renderCards();
            },
            (status, msg) => {
                loading.style.display = 'none';
                error.style.display = 'block';
                error.textContent = `Ошибка загрузки: ${msg}. Убедитесь, что сервер на порту 3000 запущен.`;
                console.error('API Error:', status, msg);
            }
        );
    }

    getFiltered() {
        if (!this.filterText.trim()) return this.vacancies;
        const q = this.filterText.toLowerCase();
        return this.vacancies.filter(v =>
            v.title.toLowerCase().includes(q) ||
            (v.company && v.company.toLowerCase().includes(q))
        );
    }

    renderCards() {
        const container = document.getElementById('cards-container');
        if (!container) return;

        container.innerHTML = '';
        const filtered = this.getFiltered();

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">Ничего не найдено</div>
                </div>`;
            return;
        }

        filtered.forEach(v => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';
            container.appendChild(col);

            const card = new VacancyCardComponent(col);
            card.render(v,
                id => new VacancyPage(this.parent, id).render(),
                id => new VacancyFormPage(this.parent, id).render(),
                id => this.handleEditWithDelay(id),
                id => this.deleteVacancy(id)
            );
        });
    }

    handleEditWithDelay(id) {
        if (this.isEditingWithDelay) return;

        const vacancy = this.vacancies.find(v => v.id == id);
        if (!vacancy) return;

        const newTitle = prompt('Введите новое название вакансии:', vacancy.title);
        if (newTitle === null || newTitle.trim() === '') return;

        this.isEditingWithDelay = true;
        this.updateSearchState();

        const cardEl = document.querySelector(`.card[data-id="${id}"]`);
        const delayBtn = cardEl?.querySelector('[data-action="delay"]');
        if (delayBtn) {
            delayBtn.innerHTML = '⏳ 2с...';
            delayBtn.disabled = true;
        }

        setTimeout(() => {
            const updateData = { ...vacancy, title: newTitle.trim() };

            this.api.update(id, updateData,
                () => {
                    this.isEditingWithDelay = false;
                    this.updateSearchState();
                    this.loadVacancies();
                },
                (status, msg) => {
                    console.error('Update error:', status, msg);
                    this.isEditingWithDelay = false;
                    this.updateSearchState();
                    alert('Ошибка обновления: ' + msg);
                }
            );
        }, 2000);
    }

    deleteVacancy(id) {
        if (this.isEditingWithDelay || !confirm('Удалить вакансию?')) return;
        this.api.delete(id,
            () => this.loadVacancies(),
            (s, m) => {
                alert('Ошибка удаления: ' + m);
                console.error('Delete error:', s, m);
            }
        );
    }

    render() {
        this.parent.innerHTML = '';

        const headerContainer = document.createElement('div');
        this.parent.appendChild(headerContainer);
        new HeaderComponent(headerContainer).render(() => this.render());

        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const footerContainer = document.createElement('div');
        this.parent.appendChild(footerContainer);
        new FooterComponent(footerContainer).render(() => this.render());

        const filterInput = document.getElementById('filter-input');
        if (filterInput) {
            filterInput.addEventListener('input', e => {
                if (this.isEditingWithDelay) return;
                this.filterText = e.target.value;
                this.renderCards();
            });
        }

        const addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                new VacancyFormPage(this.parent, null).render();
            });
        }

        this.loadVacancies();
    }
}
