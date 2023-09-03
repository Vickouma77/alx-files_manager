#!/usr/bin/node

const { mongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || 27017;
    const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

    this.db = mongoClient.connect(`mongodb://${DB_HOST}:${DB_PORT}`, { useUnifiedTopology: true });

    this.db = this.db.db(DB_DATABASE);
  }

  isAlive() {
    return this.db;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
