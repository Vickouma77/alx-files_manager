#!/usr/bin/node

import dbClient from '../utils/db';
import sha1 from 'sha1';

class UsersController {
    static async postNew(request, response) {
        const { email, password } = request.body;

        // Check if email and password are provided
        if (!email) return response.status(400).json({ error: 'Missing email' });
        if (!password) return response.status(400).json({ error: 'Missing password' });

        try {
            // Check if a user with the same email already exists in the database
            const userExists = await dbClient.users.findOne({ email });

            if (userExists) {
                return response.status(400).json({ error: 'User with this email already exists' });
            }

            // Hash the password
            const hashedPassword = sha1(password);

            // Create a new user
            const newUser = {
                email,
                password: hashedPassword,
            };

            // Insert the new user into the database
            const user = await dbClient.users.insertOne(newUser);

            // Respond with the user's ID and email
            return response.status(201).json({ id: user.insertedId, email });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = UsersController;
