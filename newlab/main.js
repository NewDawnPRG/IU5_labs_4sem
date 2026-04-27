import { injectStyles } from './components/styles/index.js';
import { createHeader } from './components/header/index.js';
import { createFooter } from './components/footer/index.js';
import { renderMainPage } from './pages/main/index.js';
import { renderVacancyPage } from './pages/vacancy/index.js';
import { vacancies } from './data.js';

injectStyles();
const app = document.getElementById('app');

app.appendChild(createHeader());

const contentWrapper = document.createElement('div');
contentWrapper.id = 'page-content';
app.appendChild(contentWrapper);

const router = () => {
    const hash = window.location.hash;
    contentWrapper.innerHTML = '';

    if (hash.startsWith('#vacancy/')) {
        const id = parseInt(hash.split('/')[1], 10);
        contentWrapper.appendChild(renderVacancyPage(id));
    } else {
        contentWrapper.appendChild(renderMainPage(
            (id) => {
                window.location.hash = `#vacancy/${id}`;
            },
            (id) => {
                const index = vacancies.findIndex(v => v.id === id);
                if (index !== -1) {
                    vacancies.splice(index, 1);
                    router();
                }
            },
            (vacancy) => {
                const newVacancy = {
                    ...JSON.parse(JSON.stringify(vacancy)),
                    id: Date.now(),
                    title: vacancy.title + ' (копия)'
                };
                vacancies.unshift(newVacancy);
                router();
            }
        ));
    }
};

window.addEventListener('hashchange', router);
router();

app.appendChild(createFooter());
