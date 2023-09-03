#!/usr/bin/node

const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

app.get('/routes/index.js', (req, res) => {
    res.send('Welcome to Holberton School!');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
