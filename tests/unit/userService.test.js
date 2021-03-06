import faker from 'faker';
import * as bcrypt from 'bcrypt';

import * as userRepository from '../../src/repositories/userRepository.js';
import * as sessionRepository from '../../src/repositories/sessionRepository.js';
import * as userService from '../../src/services/userService.js';
import BodyValidation from '../../src/errors/bodyValidation.js';
import EmailAlreadyTaken from '../../src/errors/emailAlreadyTaken.js';
import InexistentUser from '../../src/errors/inexistentUser.js';
import IncorrectPassword from '../../src/errors/incorrectPassword.js';

describe('userService - createUser - joi validations', () => {
  jest.spyOn(userRepository, 'newUser').mockImplementation(() => true);
  jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(() => 'hashedPassword');

  it('should throw an error when empty body is sent', async () => {
    const promise = userService.newUser({});

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when body has no name property', async () => {
    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when body has no email property', async () => {
    const body = {
      name: faker.name.findName(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when body has no password property', async () => {
    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when name property has less than 3 characters', async () => {
    const body = {
      name: faker.datatype.string(2),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when name property has more than 30 characters', async () => {
    const body = {
      name: faker.datatype.string(31),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when email property is not a valid email', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.datatype.string(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when password property has less than 8 characters', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.datatype.string(7),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });

  it('should throw an error when password property has more than 50 characters', async () => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.datatype.string(51),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(BodyValidation);
  });
});

describe('userService - createUser - email validation', () => {
  jest.spyOn(userRepository, 'newUser').mockImplementationOnce(() => true);
  jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(() => 'hashedPassword');

  it('should throw an error when email is already taken', async () => {
    jest
      .spyOn(userRepository, 'checkEmailAvailability')
      .mockImplementationOnce(() => false);

    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.newUser(body);

    await expect(promise).rejects.toThrow(EmailAlreadyTaken);
  });

  it('should throw nothing when the email is available', async () => {
    jest
      .spyOn(userRepository, 'checkEmailAvailability')
      .mockImplementation(() => true);

    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = await userService.newUser(body);

    await expect(promise).toBe(undefined);
  });
});

describe('userService - login ', () => {
  jest
    .spyOn(sessionRepository, 'registerUserSession')
    .mockImplementationOnce(() => true);

  it('should throw an error when email is not found', async () => {
    jest
      .spyOn(userRepository, 'findUser')
      .mockImplementationOnce(() => undefined);

    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.login(body);

    await expect(promise).rejects.toThrow(InexistentUser);
  });

  it('should throw an error when password does not match', async () => {
    jest.spyOn(userRepository, 'findUser').mockImplementationOnce(() => {
      return {
        id: faker.datatype.number(),
        password: faker.internet.password(),
      };
    });

    jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => false);

    const body = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const promise = userService.login(body);

    await expect(promise).rejects.toThrow(IncorrectPassword);
  });
});
