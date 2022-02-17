import supertest from 'supertest';
import faker from 'faker';

import '../../src/setup.js';
import app from '../../src/app.js';

import { createTool } from '../factories/toolFactory.js';
import { createToken } from '../factories/tokenFactory.js';

const request = supertest(app);

describe('GET /tools', () => {
  it('should return status 200 when requesting all the tools', async () => {
    const result = await request.get('/tools');

    expect(result.status).toEqual(200);
  });

  it('should return an array when requesting all the tools', async () => {
    const result = await request.get('/tools');

    expect(Array.isArray(result.body)).toBe(true);
  });
});

describe('GET /tools/:toolId', () => {
  it('should return status 404 when the tool does not exist', async () => {
    const result = await request.get('/tools/0');

    expect(result.status).toEqual(404);
  });

  it('should return status 200 when the tool exist', async () => {
    const id = await createTool();
    const result = await request.get(`/tools/${id}`);

    expect(result.status).toEqual(200);
  });

  it('should return an array when requesting an existing tool', async () => {
    const id = await createTool();
    const result = await request.get(`/tools/${id}`);

    expect(typeof result.body).toBe('object');
  });
});

describe('POST /tools', () => {
  it('should return status 401 when authorization header is not sent', async () => {
    const result = await request.post('/tools');

    expect(result.status).toEqual(401);
  });

  it('should return status 401 when authorization header is invalid', async () => {
    const result = await request
      .post('/tools')
      .set('authorization', faker.datatype.string());

    expect(result.status).toEqual(401);
  });

  it('should return status 400 when sending invalid body, but authorization is ok', async () => {
    const token = await createToken();
    const result = await request
      .post('/tools')
      .set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(400);
  });

  it('should return status 201 when successfully creates a tool', async () => {
    const token = await createToken();

    const body = {
      title: faker.company.companyName(),
      link: faker.internet.url(),
      description: faker.lorem.words(),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const result = await request
      .post('/tools')
      .set('authorization', `Bearer ${token}`)
      .send(body);

    expect(result.status).toEqual(201);
  });
});

describe('DELETE /tools/:toolId', () => {
  it('should return status 401 when authorization header is not sent', async () => {
    const randomId = faker.datatype.number();

    const result = await request.delete(`/tools/${randomId}`);

    expect(result.status).toEqual(401);
  });

  it('should return status 401 when authorization header is invalid', async () => {
    const randomId = faker.datatype.number();

    const result = await request
      .delete(`/tools/${randomId}`)
      .set('authorization', faker.datatype.string());

    expect(result.status).toEqual(401);
  });

  it('should return status 404 when the tool does not exist', async () => {
    const randomId = faker.datatype.number();
    const token = await createToken();

    const result = await request
      .delete(`/tools/${randomId}`)
      .set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(404);
  });

  it('should return status 200 when successfully deletes a tool', async () => {
    const toolId = await createTool();

    const token = await createToken();

    const result = await request
      .delete(`/tools/${toolId}`)
      .set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(200);
  });
});
