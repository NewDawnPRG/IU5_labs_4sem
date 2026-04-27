import { injectStyles } from './components/styles/index.js';
import { createHeader } from './components/header/index.js';
import { createFooter } from './components/footer/index.js';
import { renderMainPage } from './pages/main/index.js';
import { renderVacancyPage } from './pages/vacancy/index.js';

injectStyles();

const app = document.getElementById('app');

app.appendChild(createHeader());

const currentHash = window.location.hash;
if (currentHash === '#vacancy') {
    app.appendChild(renderVacancyPage());
} else {
    app.appendChild(renderMainPage());
}

app.appendChild(createFooter());
