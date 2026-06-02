import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { VacancyApiService } from "../../services/api.js";
import { MainPage } from "../main/index.js";
import { VacancyFormPage } from "../vacancy-form/index.js";

export class VacancyPage {
    constructor(parent, id) {
        this.parent = parent;
        this.api = new VacancyApiService();
        this.id = id;
    }

    getHTML(data) {
        const d = data.description || {};
        const list = (arr, title) => arr?.length
            ? `<div class="mb-3"><h5>${title}:</h5><ul>${arr.map(i => `<li>${i}</li>`).join('')}</ul></div>`
            : '';

        return `
        <div class="container mt-4 mb-4">
            <button id="back-btn" class="btn btn-outline-secondary mb-3">← Назад к вакансиям</button>
            <div class="card border-0 shadow-sm">
                <img src="${data.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop'}"
                     class="card-img-top" style="height: 300px; object-fit: cover;"
                     onerror="this.src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop'">
                <div class="card-body p-4">
                    <h2 class="card-title mb-3">${data.title}</h2>
                    <p class="text-muted mb-1">🏢 ${data.company} • 📍 ${data.city} • 📅 ${data.published}</p>
                    <h4 class="text-success fw-bold my-3">${data.salary}</h4>
                    <p class="mb-3">${data.employment} • Опыт: ${data.experience}</p>
                    <hr>
                    ${list(d.duties, 'Обязанности')}
                    ${list(d.requirements, 'Требования')}
                    ${list(d.conditions, 'Условия')}
                    <div class="mt-4 d-flex gap-2">
                        <button id="edit-btn" class="btn btn-danger">✏️ Редактировать</button>
                        <button id="delete-btn" class="btn btn-outline-danger">️ Удалить</button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    render() {
        this.parent.innerHTML = '';
        const headerContainer = document.createElement('div');
        this.parent.appendChild(headerContainer);
        new HeaderComponent(headerContainer).render(() => new MainPage(this.parent).render());

        this.parent.insertAdjacentHTML('beforeend', `<div id="vacancy-loading" class="container mt-5 text-center"><div class="spinner-border text-danger"></div><p class="mt-2">Загрузка вакансии...</p></div>`);

        const addFooter = () => {
            const footerContainer = document.createElement('div');
            this.parent.appendChild(footerContainer);
            new FooterComponent(footerContainer).render(() => new MainPage(this.parent).render());
        };

        this.api.getById(this.id)
            .then(data => {
                const loading = document.getElementById('vacancy-loading');
                if (loading) loading.remove();
                this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
                this.bindEvents();
                addFooter();
            })
            .catch(err => {
                const loading = document.getElementById('vacancy-loading');
                if (loading) {
                    loading.innerHTML = `<div class="alert alert-danger">Ошибка: ${err.message}</div><button id="back-btn2" class="btn btn-secondary">← Назад</button>`;
                    document.getElementById('back-btn2').addEventListener('click', () => new MainPage(this.parent).render());
                }
                addFooter();
            });
    }

    bindEvents() {
        document.getElementById('back-btn').addEventListener('click', () => new MainPage(this.parent).render());
        document.getElementById('edit-btn').addEventListener('click', () => new VacancyFormPage(this.parent, this.id).render());
        document.getElementById('delete-btn').addEventListener('click', () => {
            if (!confirm('Удалить вакансию?')) return;
            this.api.delete(this.id)
                .then(() => new MainPage(this.parent).render())
                .catch(err => alert('Ошибка: ' + err.message));
        });
    }
}
