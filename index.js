const { json } = require("express");
const express = require("express");
const Joi = require("joi");

// sample data
const expenses = require('./sample-data-expenses.json'); 
const income = require('./sample-data-income.json')

// ---- init
const app = express();
const port = 3000;
const router = express.Router();

// ---- allow cors
const cors = require('cors');
app.use(cors());

// ---- routing api
app.use(express.json());

app.use('/', express.static('static'));

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

router.route('/expenses')
    .get((req, res) => {
        res.send(JSON.stringify(expenses));
    });

router.route('/income')
    .get((req, res) => {
        res.send(JSON.stringify(income));
    });

app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}...`));