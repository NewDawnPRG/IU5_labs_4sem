const fs = require('fs');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '../data/vacancies.json');

const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }
};


const findAll = (searchQuery) => {
    let vacancies = readData();
    if (searchQuery) {
        return vacancies.filter(v =>
            v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.company.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    return vacancies;
};

const findOne = (id) => {
    const vacancies = readData();
    return vacancies.find(v => v.id === parseInt(id));
};

const create = (vacancyData) => {
    const vacancies = readData();
    const newId = vacancies.length > 0 ? Math.max(...vacancies.map(v => v.id)) + 1 : 1;

    const newVacancy = { id: newId, ...vacancyData };
    vacancies.push(newVacancy);
    writeData(vacancies);
    return newVacancy;
};

const update = (id, vacancyData) => {
    const vacancies = readData();
    const index = vacancies.findIndex(v => v.id === parseInt(id));
    if (index === -1) return null;
    vacancies[index] = { ...vacancies[index], ...vacancyData };
    writeData(vacancies);
    return vacancies[index];
};

const updateFull = (id, vacancyData) => {
    const vacancies = readData();
    const index = vacancies.findIndex(v => v.id === parseInt(id));

    if (index === -1) return null;

    vacancies[index] = { id: parseInt(id), ...vacancyData };

    writeData(vacancies);
    return vacancies[index];
};

const remove = (id) => {
    let vacancies = readData();
    const filtered = vacancies.filter(v => v.id !== parseInt(id));

    if (filtered.length === vacancies.length) return false;

    writeData(filtered);
    return true;
};

module.exports = {
    findAll,
    findOne,
    create,
    update,
    updateFull,
    remove
};
