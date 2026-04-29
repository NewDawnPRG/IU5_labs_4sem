const express = require('express');
const vacanciesRouter = require('./routes/vacancies');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/vacancies', vacanciesRouter);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
