import supertest from 'supertest';

import '../../src/setup.js';
import app from '../../src/app.js';

import { createTool } from '../factories/toolFactory.js';

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

    expect(Array.isArray(result.body)).toBe(true);
  });
});
