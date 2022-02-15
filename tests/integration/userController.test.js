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

    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await request.post('/user/register').send(body);

    const result = await request.post('/user/register').send(body);

    expect(result.status).toEqual(409);
  });
});
