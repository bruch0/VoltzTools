import connection from '../database/database.js';

const registerUserSession = async ({ userId }) => {
  const date = new Date();

  await connection.query(
    'INSERT INTO sessions (user_id, date) VALUES ($1, $2)',
    [userId, date]
  );

  return;
};

export { registerUserSession };
