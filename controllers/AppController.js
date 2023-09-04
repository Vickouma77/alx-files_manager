#!/usr/bin/node

const { dbClient } = require('../utils/db');
const { redisClient } = require('../utils/redis');


class AppController {
  static async getStatus(req, res) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();

    if (redisStatus && dbStatus) {
      return res.status(200).json({ redis: true, db: true });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();

    return res.status(200).json({ users: usersCount, files: filesCount });
  }
}

module.exports = AppController;
