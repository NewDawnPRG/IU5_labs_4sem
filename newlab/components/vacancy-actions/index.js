export function createVacancyActions() {
    const actions = document.createElement('div');
    actions.className = 'vacancy-actions';
    actions.innerHTML = `
        <button class="btn btn-primary">Откликнуться</button>
        <button class="btn btn-outline">В избранное</button>
    `;
    return actions;
}
