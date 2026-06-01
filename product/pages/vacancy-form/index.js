import { HeaderComponent } from "../../components/header/index.js";
import { FooterComponent } from "../../components/footer/index.js";
import { VacancyApiService } from "../../services/api.js";
import { MainPage } from "../main/index.js";

export class VacancyFormPage {
    constructor(parent, editId = null) {
        this.parent = parent;
        this.api = new VacancyApiService();
        this.editId = editId;
        this.data = null;
    }

    getHTML() {
        const isEdit = !!this.editId;
        return `
        <div class="container mt-3" style="max-width: 600px;">
            <h3>${isEdit ? 'Редактирование' : 'Добавление'} вакансии</h3>
            <form id="vacancy-form">
                <div class="mb-2"><label>Название *</label><input type="text" id="v-title" class="form-control" required></div>
                <div class="mb-2"><label>Компания *</label><input type="text" id="v-company" class="form-control" required></div>
                <div class="mb-2"><label>Зарплата</label><input type="text" id="v-salary" class="form-control"></div>
                <div class="mb-2"><label>Город</label><input type="text" id="v-city" class="form-control"></div>
                <div class="mb-2"><label>Занятость</label><input type="text" id="v-employment" class="form-control"></div>
                <div class="mb-2"><label>Ссылка на картинку</label><input type="text" id="v-image" class="form-control"></div>
                <div class="mb-2"><label>Опыт</label><input type="text" id="v-experience" class="form-control"></div>
                <div class="mb-2"><label>Дата публикации</label><input type="text" id="v-published" class="form-control" value="Только что"></div>
                <div class="mb-2"><label>Обязанности (через запятую)</label><input type="text" id="v-duties" class="form-control"></div>
                <div class="mb-2"><label>Требования (через запятую)</label><input type="text" id="v-requirements" class="form-control"></div>
                <div class="mb-2"><label>Условия (через запятую)</label><input type="text" id="v-conditions" class="form-control"></div>
                <button type="submit" class="btn btn-primary w-100 mt-2">${isEdit ? 'Сохранить' : 'Создать'}</button>
                <button type="button" id="cancel-btn" class="btn btn-secondary w-100 mt-2">Отмена</button>
            </form>
            <div id="form-error" class="alert alert-danger mt-2" style="display:none;"></div>
        </div>`;
    }

    loadData() {
        if (!this.editId) return;
        this.api.getById(this.editId,
            data => { this.data = data; this.fillForm(); },
            (s, m) => { alert('Ошибка: ' + m); new MainPage(this.parent).render(); }
        );
    }

    fillForm() {
        if (!this.data) return;
        document.getElementById('v-title').value = this.data.title || '';
        document.getElementById('v-company').value = this.data.company || '';
        document.getElementById('v-salary').value = this.data.salary || '';
        document.getElementById('v-city').value = this.data.city || '';
        document.getElementById('v-employment').value = this.data.employment || '';
        document.getElementById('v-image').value = this.data.image || '';
        document.getElementById('v-experience').value = this.data.experience || '';
        document.getElementById('v-published').value = this.data.published || 'Только что';
        document.getElementById('v-duties').value = (this.data.description?.duties || []).join(', ');
        document.getElementById('v-requirements').value = (this.data.description?.requirements || []).join(', ');
        document.getElementById('v-conditions').value = (this.data.description?.conditions || []).join(', ');
    }

    collectData() {
        const toArr = id => document.getElementById(id).value.split(',').map(s => s.trim()).filter(Boolean);
        return {
            title: document.getElementById('v-title').value,
            company: document.getElementById('v-company').value,
            salary: document.getElementById('v-salary').value,
            city: document.getElementById('v-city').value,
            employment: document.getElementById('v-employment').value,
            image: document.getElementById('v-image').value,
            experience: document.getElementById('v-experience').value,
            published: document.getElementById('v-published').value || 'Только что',
            description: {
                duties: toArr('v-duties'),
                requirements: toArr('v-requirements'),
                conditions: toArr('v-conditions')
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const errDiv = document.getElementById('form-error');
        errDiv.style.display = 'none';
        const data = this.collectData();

        if (!data.title || !data.company) {
            errDiv.textContent = 'Заполните название и компанию';
            errDiv.style.display = 'block';
            return;
        }

        const ok = () => new MainPage(this.parent).render();
        const fail = (s, m) => { errDiv.textContent = `Ошибка: ${m}`; errDiv.style.display = 'block'; };

        this.editId ? this.api.update(this.editId, data, ok, fail) : this.api.create(data, ok, fail);
    }

    render() {
        this.parent.innerHTML = '';
        new HeaderComponent(this.parent).render(() => new MainPage(this.parent).render());
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('cancel-btn').addEventListener('click', () => new MainPage(this.parent).render());
        document.getElementById('vacancy-form').addEventListener('submit', this.handleSubmit.bind(this));
        new FooterComponent(this.parent).render(() => new MainPage(this.parent).render());
        this.loadData();
    }
}
