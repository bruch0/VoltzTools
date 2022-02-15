import faker from 'faker';
import { hashSync } from 'bcrypt';

import connection from '../../src/database/database';

const createUser = async () => {
  const password = faker.internet.password();
  const hashPassword = hashSync(password, 10);

  const user = await connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [faker.name.findName(), faker.internet.email(), hashPassword]
  );

  const { name, email } = user.rows[0];

  return { name, email, password };
};

export { createUser };
