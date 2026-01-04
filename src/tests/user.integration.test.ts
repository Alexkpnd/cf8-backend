import { TestServer } from "./testSetup";
import userRoutes from '../routes/user.routes';
import User from  '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const server = new TestServer();
server.app.use('/users', userRoutes);

describe('User API Tests', () => {
    
    let token: string;

    beforeAll(async()=>{
        await server.start();
        const hash = await bcrypt.hash('admin1234', 10);
        const user = await User.create({
            username: "admin",
            firstname: "testUser",
            lastname: "testUser",
            email: "testUser@myapp.gr",
            password: hash
        });
        const payload = {
            username: user.username,
            email: user.email,
            roles: user.roles
        }
        token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'})
    });
    afterAll(async() => {
        await server.stop();
    });

    test('GET /users -> returns list of users', async() => {
        const result = await server.request.get('/users').set('Authorization', `Bearer ${token}`)
        expect(result.status).toBe(201);
        expect(Array.isArray(result.body)).toBe(true);
    })
})