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
            </div>
            <div id="loading" class="text-center my-5" style="display:none;">
                <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Загрузка...</span></div>
                <p class="mt-2 text-muted">Загрузка вакансий...</p>
            </div>
            <div id="error-msg" class="alert alert-danger" style="display:none;"></div>
            <div id="cards-container" class="row g-3"></div>
        </div>`;
    }

    loadVacancies() {
        const loading = document.getElementById('loading');
        const error = document.getElementById('error-msg');
        const container = document.getElementById('cards-container');

        loading.style.display = 'block';
        error.style.display = 'none';
        container.innerHTML = '';

        this.api.getAll()
            .then(data => {
                this.vacancies = data;
                loading.style.display = 'none';
                this.renderCards();
            })
            .catch(err => {
                loading.style.display = 'none';
                error.style.display = 'block';
                error.textContent = `Ошибка: ${err.message}. Сервер на порту 3000 запущен?`;
                console.error(err);
            });
    }

    getFiltered() {
        if (!this.filterText.trim()) return this.vacancies;
        const q = this.filterText.toLowerCase();
        return this.vacancies.filter(v =>
            v.title.toLowerCase().includes(q) || (v.company && v.company.toLowerCase().includes(q))
        );
    }

    renderCards() {
        const container = document.getElementById('cards-container');
        if (!container) return;
        container.innerHTML = '';
        const filtered = this.getFiltered();

        if (filtered.length === 0) {
            container.innerHTML = `<div class="col-12"><div class="alert alert-info text-center">Ничего не найдено</div></div>`;
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
                id => this.deleteVacancy(id)
            );
        });
    }

    deleteVacancy(id) {
        if (!confirm('Удалить вакансию?')) return;
        this.api.delete(id)
            .then(() => this.loadVacancies())
            .catch(err => {
                alert('Ошибка удаления: ' + err.message);
                console.error(err);
            });
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

        document.getElementById('filter-input').addEventListener('input', e => {
            this.filterText = e.target.value;
            this.renderCards();
        });

        document.getElementById('add-btn').addEventListener('click', () => {
            new VacancyFormPage(this.parent, null).render();
        });

        this.loadVacancies();
    }
}
