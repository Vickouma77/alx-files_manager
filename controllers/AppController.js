#!/usr/bin/node

const { dbClient } = require('../utils/db');
const { redisClient } = require('../utils/redis');

class AppController {
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).send(status);
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    const status = {
      users,
      files,
    };
    res.status(200).send(status);
  }
}

module.exports = AppController;
