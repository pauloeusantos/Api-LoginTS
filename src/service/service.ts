import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import User from '../model/model';
import MongoConnection from '../db/mongo-connection';

class UserService {
    private static async getCollection() {
        const client: MongoClient = await MongoConnection.getInstance();
        return client.db('db').collection('users');
    }

    public static async register(user: User) {
        const collection = await this.getCollection();
        const hashedPassword = await bcrypt.hash(user.senha, 10);
        const newUser = { ...user, senha: hashedPassword };
        const result = await collection.insertOne(newUser);
        return { id: result.insertedId, ...newUser };
    }

    public static async login(email: string, senha: string) {
        const collection = await this.getCollection();
        const user = await collection.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user._id }, '', { expiresIn: '1h' });
        return token;
    }
}

export default UserService;