#!/usr/bin/node

const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (err) => {
            console.log('Redis error: ', err);
        });
    }

    isAlive() {
        return this.client.connected;
    }
  
}

const redisClient = new RedisClient();