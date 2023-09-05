#!/usr/bin/node

import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });

    try {
      const userExists = await dbClient.users.findOne({ email });

      if (userExists) {
        return response.status(400).json({ error: 'User with this email already exists' });
      }
      const hashedPassword = sha1(password);
      const newUser = {
        email,
        password: hashedPassword,
      };
      const user = await dbClient.users.insertOne(newUser);
      return response.status(201).json({ id: user.insertedId, email });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UsersController;
