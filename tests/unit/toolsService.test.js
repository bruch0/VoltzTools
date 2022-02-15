import faker from 'faker';

import * as toolsRepository from '../../src/repositories/toolsRepository.js';
import * as toolsService from '../../src/services/toolsService.js';
import InexistentTool from '../../src/errors/inexistentTool.js';

describe('toolService - get tool by id', () => {
  it('should throw an error when the id is not found', async () => {
    const id = faker.datatype.number();
    jest.spyOn(toolsRepository, 'getToolById').mockImplementationOnce(() => []);

    const promise = toolsService.getToolById({ id });

    await expect(promise).rejects.toThrow(InexistentTool);
  });

  it('should return an array the id is found', async () => {
    const id = faker.datatype.number();
    jest
      .spyOn(toolsRepository, 'getToolById')
      .mockImplementationOnce(() => [faker.datatype.number()]);

    const result = await toolsService.getToolById({ id });

    await expect(Array.isArray(result)).toBe(true);
  });
});
