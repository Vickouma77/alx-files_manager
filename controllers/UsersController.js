#!/usr/bin/node

import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });
    const userExists = await dbClient.users.findOne({ email });
    if (userExists) return response.status(400).json({ error: 'Already exist' });
    const user = await dbClient.users.insertOne({ email, password: sha1(password) });
    return response.status(201).json({ id: user.insertedId, email });
  }
}

module.exports = UsersController;
