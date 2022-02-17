import supertest from 'supertest';
import faker from 'faker';

import '../../src/setup.js';
import app from '../../src/app.js';

import { createToken } from '../factories/tokenFactory.js';

const request = supertest(app);

describe('GET /logs', () => {
  it('should return status 401 when authorization header is not sent', async () => {
    const result = await request.get('/logs');

    expect(result.status).toEqual(401);
  });

  it('should return status 401 when authorization header is invalid', async () => {
    const result = await request
      .get('/logs')
      .set('authorization', faker.datatype.string());

    expect(result.status).toEqual(401);
  });

  it('should return status 200 when successfully gets the logs', async () => {
    const token = await createToken();

    const result = await request
      .get('/logs')
      .set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(200);
  });

  it('should return an array with the logs', async () => {
    const token = await createToken();

    const result = await request
      .get('/logs')
      .set('authorization', `Bearer ${token}`);

    expect(Array.isArray(result.body)).toBe(true);
  });
});
