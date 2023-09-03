#!/usr/bin/node

const { DBClient } = require('../utils/db');
const { RedisClient } = require('../utils/redis');

class AppController {
  static getStatus(req, res) {
    const status = {
      redis: RedisClient.isAlive(),
      db: DBClient.isAlive(),
    };
    return res.status(200).send(status);
  }

  static async getStats(req, res) {
    const users = await DBClient.nbUsers();
    const files = await DBClient.nbFiles();
    const status = {
      users,
      files,
    };
    return res.status(200).send(status);
  }
}

module.exports = AppController;
