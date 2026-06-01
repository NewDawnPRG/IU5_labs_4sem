import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { VacancyApiService } from "../../services/api.js";
import { MainPage } from "../main/index.js";

export class VacancyPage {
    constructor(parent, id) {
        this.parent = parent;
        this.api = new VacancyApiService();
        this.id = id;
    }

    getHTML(data) {
        const d = data.description || {};
        const list = (arr, title) => arr?.length ? `<p><strong>${title}:</strong> ${arr.join(', ')}</p>` : '';
        return `
        <div class="container mt-3" style="max-width: 800px;">
            <button id="back-btn" class="btn btn-secondary mb-3">← Назад</button>
            <div class="card">
                <img src="${data.image || 'https://via.placeholder.com/800x300'}" class="card-img-top" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h3>${data.title}</h3>
                    <p class="text-muted">${data.company} • ${data.city} • ${data.published}</p>
                    <h5 class="text-success">${data.salary}</h5>
                    <p>${data.employment} • Опыт: ${data.experience}</p>
                    <hr>
                    ${list(d.duties, 'Обязанности')}
                    ${list(d.requirements, 'Требования')}
                    ${list(d.conditions, 'Условия')}
                    <button id="edit-btn" class="btn btn-danger mt-3">Редактировать</button>
                </div>
            </div>
        </div>`;
    }

    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render(() => new MainPage(this.parent).render());

        this.api.getById(this.id,
            data => {
                this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
                document.getElementById('back-btn').addEventListener('click', () => new MainPage(this.parent).render());
                document.getElementById('edit-btn').addEventListener('click', () => {
                    import('../vacancy-form/index.js').then(mod => new mod.VacancyFormPage(this.parent, this.id).render());
                });
                new FooterComponent(this.parent).render(() => new MainPage(this.parent).render());
            },
            (s, m) => {
                this.parent.innerHTML += `<div class="alert alert-danger">Ошибка: ${m}</div>`;
                new FooterComponent(this.parent).render(() => new MainPage(this.parent).render());
            }
        );
    }
}
