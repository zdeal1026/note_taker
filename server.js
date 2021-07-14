//dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
const db = require('./db/db.json')

//setting port
const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//creating routes
app.get('/', (req,res)=> {
    res/sendfile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res)=> {
    const data = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
    res.json(data);
})