#!/usr/bin/node

const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        this.db = null;
        MongoClient.connect(process.env.DB_HOST || 'mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
        if (err) console.log(err);
        else {
            this.db = client.db(process.env.DB_DATABASE || 'files_manager');
        }
        });
    }
    
    isAlive() {
        return !!this.db;
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
