import supertest from 'supertest';
import faker from 'faker';

import '../../src/setup.js';
import app from '../../src/app.js';

import { clearUsers } from '../utils/clearUsers.js';
import { createUser } from '../factories/userFactory.js';

const request = supertest(app);

describe('POST /user/register', () => {
  it('should return status 400 when sending invalid body', async () => {
    const result = await request.post('/user/register');

    expect(result.status).toEqual(400);
  });

  it('should return status 201 when successfully creates an user', async () => {
    await clearUsers();

    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = await request.post('/user/register').send(body);

    expect(result.status).toEqual(201);
  });

  it('should return status 409 when email is already taken', async () => {
    await clearUsers();

    const { name, email, password } = await createUser();

    const body = {
      name,
      email,
      password,
    };

    const result = await request.post('/user/register').send(body);

    expect(result.status).toEqual(409);
  });
});

describe('POST /user/login', () => {
  it('should return status 400 when sending invalid body', async () => {
    const result = await request.post('/user/login');

    expect(result.status).toEqual(400);
  });

  it('should return status 404 when the email is not registered', async () => {
    await clearUsers();

    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const result = await request.post('/user/login').send(body);

    expect(result.status).toEqual(404);
  });

  it('should return status 401 when password does not match', async () => {
    const { email } = await createUser();

    const body = {
      email,
      password: faker.internet.password(),
    };

    const result = await request.post('/user/login').send(body);

    expect(result.status).toEqual(401);
  });

  it('should return status 200 when password match', async () => {
    const { email, password } = await createUser();

    const body = {
      email,
      password,
    };

    const result = await request.post('/user/login').send(body);

    expect(result.status).toEqual(200);
  });

  it('should return an object when successfully logging in', async () => {
    const { email, password } = await createUser();

    const body = {
      email,
      password,
    };

    const result = await request.post('/user/login').send(body);

    expect(typeof result.body).toBe('object');
  });

  it('should return an token when successfully logging in', async () => {
    const { email, password } = await createUser();

    const body = {
      email,
      password,
    };

    const result = await request.post('/user/login').send(body);

    expect(result.body).toHaveProperty('token');
  });

  it('should return the token as an string', async () => {
    const { email, password } = await createUser();

    const body = {
      email,
      password,
    };

    const result = await request.post('/user/login').send(body);

    expect(typeof result.body.token).toBe('string');
  });
});
