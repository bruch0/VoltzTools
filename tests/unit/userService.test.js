import faker from 'faker';
import * as bcrypt from 'bcrypt';

import * as userRepository from '../../src/repositories/userRepository.js';
import * as userService from '../../src/services/userService.js';
import bodyValidation from '../../src/errors/bodyValidation.js';
import EmailAlreadyTaken from '../../src/errors/emailAlreadyTaken.js';

describe('userService - joi validations', () => {
  jest.spyOn(userRepository, 'newUser').mockImplementation(() => true);
  jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => 'hashedPassword');

  it('should throw an error when empty body is sent', async () => {
    const promise = userService.newUser({});

    await expect(promise).rejects.toThrow(bodyValidation);
  });

  it('should throw an error when body has no name property', async () => {
    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(bodyValidation);
  });

  it('should throw an error when body has no email property', async () => {
    const body = {
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(bodyValidation);
  });

  it('should throw an error when body has no password property', async () => {
    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(bodyValidation);
  });

  it('should throw an error when name property has less than 3 characters', async () => {
    const body = {
      name: faker.datatype.string(2),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(bodyValidation);
  });

  it('should throw an error when name property has more than 30 characters', async () => {
    const body = {
      name: faker.datatype.string(31),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(bodyValidation);
  });

  it('should throw an error when email property is not a valid email', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.datatype.string(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(bodyValidation);
  });

  it('should throw an error when password property has less than 8 characters', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.datatype.string(7),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(bodyValidation);
  });

  it('should throw an error when password property has more than 50 characters', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.datatype.string(51),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(bodyValidation);
  });
});
