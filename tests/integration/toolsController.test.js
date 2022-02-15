import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';

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
