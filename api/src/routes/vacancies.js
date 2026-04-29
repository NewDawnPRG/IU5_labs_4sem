const express = require('express');
const router = express.Router();
const vacanciesController = require('../controllers/vacanciesController');

router.get('/', vacanciesController.getAll);
router.get('/:id', vacanciesController.getById);
router.post('/', vacanciesController.createVacancy);
router.patch('/:id', vacanciesController.updateVacancy);
router.delete('/:id', vacanciesController.deleteVacancy);

module.exports = router;
