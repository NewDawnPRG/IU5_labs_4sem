import { createVacancyActions } from '../vacancy-actions/index.js';

export function createVacancyDetail() {
    const detail = document.createElement('div');
    detail.className = 'vacancy-detail';
    detail.innerHTML = `
        <div class="vacancy-header">
            <h1 class="vacancy-title">Мобильный банкир (начинающий специалист)</h1>
            <div class="vacancy-salary-large">от 110 000 до 190 000 ₽</div>
            <div class="vacancy-company-name">Альфа-Банк</div>
            <div class="vacancy-meta">
                Москва, м. Белорусская<br>
                Опыт работы: не требуется<br>
                Полная занятость, полный день<br>
                Опубликовано 3 дня назад
            </div>
        </div>

        <div class="vacancy-section">
            <h2 class="vacancy-section-title">Обязанности:</h2>
            <div class="vacancy-section-content">
                <ul>
                    <li>Выезд к клиентам (юридическим лицам) в офис</li>
                    <li>Консультирование по продуктам банка</li>
                    <li>Оформление документов</li>
                    <li>Поддержание долгосрочных отношений с клиентами</li>
                </ul>
            </div>
        </div>

        <div class="vacancy-section">
            <h2 class="vacancy-section-title">Требования:</h2>
            <div class="vacancy-section-content">
                <ul>
                    <li>Высшее образование (или студент старших курсов)</li>
                    <li>Грамотная речь, коммуникабельность</li>
                    <li>Уверенный пользователь ПК</li>
                    <li>Желание развиваться в банковской сфере</li>
                </ul>
            </div>
        </div>

        <div class="vacancy-section">
            <h2 class="vacancy-section-title">Условия:</h2>
            <div class="vacancy-section-content">
                <ul>
                    <li>Официальное трудоустройство по ТК РФ</li>
                    <li>Белая заработная плата</li>
                    <li>Обучение за счёт компании</li>
                    <li>Карьерный рост</li>
                    <li>ДМС после испытательного срока</li>
                </ul>
            </div>
        </div>
    `;

    detail.appendChild(createVacancyActions());
    return detail;
}
