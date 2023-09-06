#!/usr/bin/node

const express = require('express');

const app = express();
const router = require('./routes/index');

const port = parseInt(process.env.PORT, 10) || 5000;

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
