//dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');

//setting port
const app = express();
const PORT = 8080;

//creating routes
app.get('/', (req,res)=> {
    res/sendfile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res)=> {
    res.sendfile(path.join(__dirname, 'public/notes.html'))
});