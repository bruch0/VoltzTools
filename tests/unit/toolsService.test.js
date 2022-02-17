import faker from 'faker';

import * as toolsRepository from '../../src/repositories/toolsRepository.js';
import * as logsRepository from '../../src/repositories/logsRepository.js';
import * as toolsService from '../../src/services/toolsService.js';

import InexistentTool from '../../src/errors/inexistentTool.js';
import BodyValidation from '../../src/errors/bodyValidation.js';

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

describe('toolService - create a new tool', () => {
  jest
    .spyOn(logsRepository, 'registerUserAction')
    .mockImplementation(() => true);

  it('should throw an error when empty body is sent', async () => {
    const promise = toolsService.createTool({});

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when body has no title property', async () => {
    const body = {
      link: faker.internet.url(),
      description: faker.lorem.words(),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when title has less than 3 characters', async () => {
    const body = {
      title: faker.datatype.string(2),
      link: faker.internet.url(),
      description: faker.lorem.words(),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when title has more than 30 characters', async () => {
    const body = {
      title: faker.datatype.string(31),
      link: faker.internet.url(),
      description: faker.lorem.words(),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when body has no link property', async () => {
    const body = {
      title: faker.company.companyName(),
      description: faker.lorem.words(),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when link is not a valid url', async () => {
    const body = {
      title: faker.company.companyName(),
      link: faker.datatype.string(),
      description: faker.lorem.words(),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when body has no description property', async () => {
    const body = {
      title: faker.company.companyName(),
      link: faker.internet.url(),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when description has less than 10 characters', async () => {
    const body = {
      title: faker.company.companyName(),
      link: faker.internet.url(),
      description: faker.datatype.string(9),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when description has more than 255 characters', async () => {
    const body = {
      title: faker.company.companyName(),
      link: faker.internet.url(),
      description: faker.datatype.string(256),
      tags: faker.datatype.array(faker.datatype.number(10)),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when body has no tags property', async () => {
    const body = {
      title: faker.company.companyName(),
      link: faker.internet.url(),
      description: faker.lorem.words(),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when tag is not an array', async () => {
    const body = {
      title: faker.company.companyName(),
      link: faker.internet.url(),
      description: faker.datatype.string(256),
      tags: faker.datatype.string(),
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when tag is an empty array', async () => {
    const body = {
      title: faker.company.companyName(),
      link: faker.internet.url(),
      description: faker.lorem.words(),
      tags: [],
    };

    const promise = toolsService.createTool(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });
});

describe('toolService - delete a tool', () => {
  jest
    .spyOn(logsRepository, 'registerUserAction')
    .mockImplementation(() => true);

  it('should throw an error when the id is not found', async () => {
    const id = faker.datatype.number();
    jest
      .spyOn(toolsRepository, 'getToolById')
      .mockImplementationOnce(() => false);

    const promise = toolsService.deleteTool({ id });

    await expect(promise).rejects.toThrow(InexistentTool);
  });

  it('should return undefined when the tool exists', async () => {
    const id = faker.datatype.number();
    jest
      .spyOn(toolsRepository, 'getToolById')
      .mockImplementationOnce(() => [faker.datatype.number()]);

    jest
      .spyOn(toolsRepository, 'deleteTool')
      .mockImplementationOnce(() => true);

    const result = await toolsService.deleteTool({ id });

    await expect(result).toBe(undefined);
  });
});
