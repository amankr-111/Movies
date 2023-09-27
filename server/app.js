const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const port = 3000; 
app.use(bodyParser.json());


app.use(cors());

// Connecting to the DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'movies',
});
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


// Sending the data to the DB
app.post('/favorites', (req, res) => {
    const { title, year, type, poster } = req.body;
    const sql = 'INSERT INTO favorite_movies (title, year, type, poster) VALUES (?, ?, ?, ?)';

    db.query(sql, [title, year, type, poster], (err, result) => {
        if (err) {
            console.error('Error saving movie to favorites:', err);
            res.status(500).json({ error: 'Failed to save movie to favorites.' });
        } else {
            res.status(200).json({ message: 'Movie saved to favorites!' });
        }
    });
});

// fetching the data for the favorites page

app.get('/favorites', (req, res) => {
    const sql = 'SELECT * FROM favorite_movies';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching favorite movies:', err);
            res.status(500).json({ error: 'Failed to fetch favorite movies.' });
        } else {
            res.status(200).json(results);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
