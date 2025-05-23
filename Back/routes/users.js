const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Router = express.Router();

Router.post('/:data', (req, res) => {
    const data  = JSON.parse(req.params.data);
    console.log(data);

    res.json(data);
});

module.exports = Router;