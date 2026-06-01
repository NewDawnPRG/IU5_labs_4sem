const vacanciesService = require('../services/vacanciesService');

const getAll = (req, res) => {
    const { search, company } = req.query;
    const result = vacanciesService.findAll(search, company);
    res.json(result);
};

const getById = (req, res) => {
    const vacancy = vacanciesService.findOne(req.params.id);
    if (!vacancy) return res.status(404).json({ error: 'Вакансия не найдена' });
    res.json(vacancy);
};

const createVacancy = (req, res) => {
    if (!req.body.title || !req.body.company) {
        return res.status(400).json({ error: 'Заполните title и company' });
    }
    const newVacancy = vacanciesService.create(req.body);
    res.status(201).json(newVacancy);
};

const updateVacancy = (req, res) => {
    const updatedVacancy = vacanciesService.updatePartial(req.params.id, req.body);
    if (!updatedVacancy) return res.status(404).json({ error: 'Вакансия не найдена' });
    res.json(updatedVacancy);
};

const updateVacancyFull = (req, res) => {
    if (!req.body.title || !req.body.company || !req.body.salary) {
        return res.status(400).json({ error: 'Для полного обновления (PUT) заполните title, company и salary' });
    }

    const updatedVacancy = vacanciesService.updateFull(req.params.id, req.body);
    if (!updatedVacancy) return res.status(404).json({ error: 'Вакансия не найдена' });
    res.json(updatedVacancy);
};

const deleteVacancy = (req, res) => {
    const success = vacanciesService.remove(req.params.id);
    if (!success) return res.status(404).json({ error: 'Вакансия не найдена' });
    res.status(204).send();
};

module.exports = {
    getAll,
    getById,
    createVacancy,
    updateVacancy,
    updateVacancyFull,
    deleteVacancy
};
