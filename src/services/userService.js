import translate from '@vitalets/google-translate-api';
import BodyValidation from '../errors/bodyValidation.js';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

import * as userSchema from '../validations/userSchema.js';
import EmailAlreadyTaken from '../errors/emailAlreadyTaken.js';
import InexistentUser from '../errors/inexistentUser.js';
import IncorrectPassword from '../errors/incorrectPassword.js';

const newUser = async ({ name, email, password }) => {
  const validation = userSchema.createUser.validate({ name, email, password });

  if (validation.error) {
    const errorMessage = validation.error.details[0].message;

    await translate(errorMessage, { from: 'en', to: 'pt' }).then((res) => {
      throw new BodyValidation(res.text);
    });
  }

  const available = await userRepository.checkEmailAvailability({ email });
  if (!available) throw new EmailAlreadyTaken();

  const hashPassword = hashSync(password, 12);

  await userRepository.newUser({ name, email, hashPassword });

  return;
};

const login = async ({ email, password }) => {
  const validation = userSchema.login.validate({ email, password });

  if (validation.error) {
    const errorMessage = validation.error.details[0].message;

    await translate(errorMessage, { from: 'en', to: 'pt' }).then((res) => {
      throw new BodyValidation(res.text);
    });
  }

  const user = await userRepository.findUser({ email });
  if (!user) throw new InexistentUser();

  const dbPassword = user.password;
  const passwordMatch = compareSync(password, dbPassword);
  if (!passwordMatch) throw new IncorrectPassword();

  const userId = user.id;
  await sessionRepository.registerUserSession({ userId });

  const jwtSecret = process.env.JWT_SECRET;
  const configurations = { expiresIn: 60 * 60 * 24 };
  const token = jwt.sign({}, jwtSecret, configurations);

  return token;
};

export { newUser, login };
