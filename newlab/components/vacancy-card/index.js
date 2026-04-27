export function createVacancyCard(vacancy) {
    const card = document.createElement('a');
    card.className = 'vacancy-card vacancy-info';
    card.href = '#vacancy';
    card.innerHTML = `
        <h3>${vacancy.title}</h3>
        <div class="vacancy-salary">${vacancy.salary}</div>
        <div class="vacancy-company">${vacancy.company}</div>
    `;

    card.addEventListener('click', (e) => {
        if (vacancy.link === '#vacancy') {
            e.preventDefault();
            window.location.hash = '#vacancy';
            window.location.reload();
        }
    });

    return card;
}
