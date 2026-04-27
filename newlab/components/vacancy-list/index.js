import { createVacancyCard } from '../vacancy-card/index.js';

export function createVacancyList() {
    const section = document.createElement('section');
    section.innerHTML = '<h2 class="section-title">Вакансии дня</h2>';

    const list = document.createElement('div');
    list.className = 'vacancy-list';

    const vacancies = [
        {
            title: 'Мобильный банкир (начинающий специалист)',
            salary: 'от 110 000 до 190 000 ₽',
            company: 'Альфа-Банк',
            link: '#vacancy'
        },
        {
            title: 'Курьер / Велокурьер в Озон фреш',
            salary: 'от 120 000 до 250 000 ₽',
            company: 'Ozon',
            link: '#'
        },
        {
            title: 'Менеджер по работе с клиентами',
            salary: 'от 70 000 до 120 000 ₽',
            company: 'МТС',
            link: '#'
        },
        {
            title: 'Калькулятор',
            salary: 'от 4 300 до 5 500 ₽',
            company: 'МГТУ',
            link: '#'
        }
    ];

    vacancies.forEach(vacancy => {
        list.appendChild(createVacancyCard(vacancy));
    });

    section.appendChild(list);
    return section;
}
