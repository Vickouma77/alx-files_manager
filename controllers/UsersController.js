#!/usr/bin/node

import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) return response.status(400).json({ error: 'Missing email' });
    if (!password) return response.status(400).json({ error: 'Missing password' });
    const emailExists = await dbClient.users.findOne({ email });
    if (emailExists) return response.status(400).json({ error: 'Already exist' });
    const sha1Password = sha1(password);
    const user = await dbClient.users.insertOne({ email, password: sha1Password });
    const userDocument = await dbClient.users.findOne({ _id: user.insertedId });
    return response.status(201).json({ id: userDocument._id, email: userDocument.email });
  }

  static async getMe(request, response) {
    const token = request.header('X-Token');
    if (!token) return response.status(401).json({ error: 'Unauthorized' });
    const userDocument = await dbClient.users.findOne({ _id: ObjectId(token) });
    if (!userDocument) return response.status(401).json({ error: 'Unauthorized' });
    return response.status(200).json({ id: userDocument._id, email: userDocument.email });
  }
}

module.exports = UsersController;
