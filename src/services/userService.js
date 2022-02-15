import translate from '@vitalets/google-translate-api';
import bodyValidation from '../errors/bodyValidation.js';
import { hashSync, compareSync } from 'bcrypt';

import * as userRepository from '../repositories/userRepository.js';

import * as userSchema from '../validations/userSchema.js';
import EmailAlreadyTaken from '../errors/emailAlreadyTaken.js';

const newUser = async ({ name, email, password }) => {
  const validation = userSchema.createUser.validate({ name, email, password });

  if (validation.error) {
    await translate(validation.error.details[0].message, {
      from: 'en',
      to: 'pt',
    }).then((res) => {
      throw new bodyValidation(res.text);
    });
  }

  const available = await userRepository.checkEmailAvailability({ email });
  if (!available) throw new EmailAlreadyTaken();

  const hashPassword = hashSync(password, 12);

  await userRepository.newUser({ name, email, hashPassword });

  return 1;
};

export { newUser };