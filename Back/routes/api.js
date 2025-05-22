const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Router = express.Router();

Router.get('/',(req,res)=>{
    res.json({
        message:"communication from backend"
    })
});

module.exports = Router;