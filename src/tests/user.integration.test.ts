import { TestServer } from "./testSetup";
import userRoutes from '../routes/user.routes';
import User from  '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Role from '../models/role.model';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const server = new TestServer();
server.app.use('/users', userRoutes);

describe('User API Tests GET Requests', () => {
    
    let token: string;
    

    beforeAll(async()=>{
        await server.start();
        const adminRole = await Role.create({
            role: 'ADMIN'
        })
        const hash = await bcrypt.hash('admin1234', 10);
        const user = await User.create({
            username: "admin",
            firstname: "testUser",
            lastname: "testUser",
            email: "testUser@myapp.gr",
            password: hash,
            roles: [adminRole._id]
        });
        const populatedUser = await User.findById(user._id).populate('roles');
        if (!populatedUser){
            return console.log('No user found')
        }
        const payload = {
            username: populatedUser.username,
            email: populatedUser.email,
            roles: populatedUser.roles
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
    });
})


describe('User API Tests POST Requests', () => {
    
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

    test('POST /users -> Creates a new user', async()=> {
        const result = (await server.request.post('/users').set('Authorization', `Bearer ${token}`)
        .send({username: "newuser", password:'123456'}));

    expect(result.status).toBe(201);
    expect(result.body.username).toBe('newuser');
    })

    test('POST /users -> Creates a new user with wrong password', async()=> {
        const result = (await server.request.post('/users').set('Authorization', `Bearer ${token}`)
        .send({username: "newuser", password:'12'}));

    expect(result.status).toBe(400);
    })

    test('POST /users -> Creates a new user with wrong username', async()=> {
        const result = (await server.request.post('/users').set('Authorization', `Bearer ${token}`)
        .send({username: "ne", password:'12000000'}));

    expect(result.status).toBe(400);
    })
})