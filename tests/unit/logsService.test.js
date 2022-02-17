import faker from 'faker';

import * as logsRepository from '../../src/repositories/logsRepository.js';
import * as logsService from '../../src/services/logsService.js';

describe('logsService - get the logs', () => {
  it('should return an array', async () => {
    jest.spyOn(logsRepository, 'getLogs').mockImplementationOnce(() => []);
    const result = await logsService.getLogs();

    await expect(Array.isArray(result)).toBe(true);
  });
});

describe('logsService - get logs by userId', () => {
  it('should return an array with the logs', async () => {
    const randomId = faker.datatype.number();

    jest
      .spyOn(logsRepository, 'getLogsByUserId')
      .mockImplementationOnce(() => []);

    const result = await logsRepository.getLogsByUserId({ randomId });

    await expect(Array.isArray(result)).toBe(true);
  });
});
