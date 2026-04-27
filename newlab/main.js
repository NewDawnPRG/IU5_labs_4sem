import { injectStyles } from './components/styles/index.js';
import { createHeader } from './components/header/index.js';
import { createFooter } from './components/footer/index.js';
import { renderMainPage } from './pages/main/index.js';
import { renderVacancyPage } from './pages/vacancy/index.js';

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
    contentWrapper.appendChild(renderVacancyPage(id, () => {
      window.location.hash = '';
    }));
  } else {
    contentWrapper.appendChild(renderMainPage((id) => {
      window.location.hash = `#vacancy/${id}`;
    }));
  }
};

window.addEventListener('hashchange', router);
router();

app.appendChild(createFooter());
