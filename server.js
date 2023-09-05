#!/usr/bin/node

const express = require('express');

const app = express();
const router = require('./routes/index');

const port = parseInt(process.env.PORT, 10) || 5000;

app.use('/', router);
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
