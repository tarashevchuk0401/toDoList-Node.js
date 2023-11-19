const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require('./routs/tasks') 


const app = express();

mongoose.connect('mongodb+srv://tarashevchuk0401:Probook4520s@cluster0.ydcwxpk.mongodb.net/tasks?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to DB')
    }).catch(() => {
        console.log('Connection failed')
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
    next();
})

app.use('/api/tasks', taskRoutes)



module.exports = app;