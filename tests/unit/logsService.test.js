import * as logsRepository from '../../src/repositories/logsRepository.js';
import * as logsService from '../../src/services/logsService.js';

describe('logsService - get the logs', () => {
  it('should return an array', async () => {
    jest.spyOn(logsRepository, 'getLogs').mockImplementationOnce(() => []);
    const result = await logsService.getLogs();

    await expect(Array.isArray(result)).toBe(true);
  });
});
