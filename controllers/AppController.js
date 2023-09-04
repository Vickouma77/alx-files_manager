#!/usr/bin/node

const { dbClient } = require('../utils/db');
const { redisClient } = require('../utils/redis');


class AppController {
  static getStatus(request, response) {
    response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  };

  static async getStats(request, response) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    response.status(200).json({ users, files });
  };
}

module.exports = AppController;
