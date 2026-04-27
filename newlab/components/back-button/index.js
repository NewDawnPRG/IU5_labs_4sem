export function createBackButton() {
    const button = document.createElement('a');
    button.className = 'back-link';
    button.href = '#';
    button.textContent = '← Назад к поиску';
    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
        window.location.reload();
    });
    return button;
}
