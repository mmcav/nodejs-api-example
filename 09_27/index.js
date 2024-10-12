const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => console.log('Running on port ' + port));

app.get('/', (req, res) => res.send('Server running, GET OK'));

const fs = require('fs');
const filename = 'data.json';
let games = [];
fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        games = JSON.parse(data);
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});

app.get('/games', (req, res) => {
    if (req.query.genre) {
        return res.send(games.filter(game => game.genre === req.query.genre));
    }
    if (req.query.year) {
        return res.send(games.filter(game => game.year === parseInt(req.query.year, 10)));
    }
    res.send(games);
});

app.post('/games', (req, res) => {
    let content = req.body;

    content.id = games.length + 1;
    games.push(content);

    let data = JSON.stringify(games);
    fs.writeFileSync(filename, data);

    res.send('Post OK');
});