import jwt from 'jsonwebtoken';

import { createUser } from './userFactory';

const createToken = async () => {
  const { userId } = await createUser();

  const jwtSecret = process.env.JWT_SECRET;
  const configurations = { expiresIn: 60 * 60 * 24 };
  const token = jwt.sign({ userId }, jwtSecret, configurations);

  return token;
};

export { createToken };
