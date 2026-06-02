export class VacancyApiService {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    _request(url, options = {}) {
        return fetch(url, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options
        }).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP ${response.status}: ${text}`);
                });
            }
            if (response.status === 204) return null;
            return response.json();
        });
    }

    getAll() {
        return this._request(`${this.baseUrl}/vacancies`);
    }

    getById(id) {
        return this._request(`${this.baseUrl}/vacancies/${id}`);
    }

    create(data) {
        return this._request(`${this.baseUrl}/vacancies`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    update(id, data) {
        return this._request(`${this.baseUrl}/vacancies/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    delete(id) {
        return this._request(`${this.baseUrl}/vacancies/${id}`, {
            method: 'DELETE'
        });
    }
}
