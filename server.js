//dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
const db = require('./db/db.json')

const { v4: uuidv4 } = require('uuid')

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
});

//posts content and creates id for notes
app.post('/api/notes', (req, res)=> {
    const body = {...req.body};
    body.id = uuidv4();
    const data =JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    fs.writeFileSync('./db/db/json', JSON.stringify(data.concat(body)), 'utf-8');
    res.json(body);
})

//filters note ids to delete specific notes
app.delete('/api/notes/:id', (req,res) => {
    const id =req.params.id;
    const objects = JSON.parse(fs.readFileSync('./db/db.json','utf-8'));
    const items = objects.filter(item => item.id !==id);
    fs.writeFileSync('./db/db.json', JSON.stringify(items), 'utf-8');
    res.json(items);
})

//port listening
app.listen(PORT, () => {
    console.log('listening on port http://localhost${PORT}');
});