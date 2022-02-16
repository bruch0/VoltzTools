import connection from '../database/database.js';

const newUser = async ({ name, email, hashPassword }) => {
  await connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
    [name, email, hashPassword]
  );

  return;
};

const checkEmailAvailability = async ({ email }) => {
  const user = await connection.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  return Boolean(!user.rows.length);
};

const findUser = async ({ email }) => {
  const user = await connection.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  return user.rows[0];
};

export { newUser, checkEmailAvailability, findUser };
