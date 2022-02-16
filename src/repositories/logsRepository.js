import connection from '../database/database.js';

const registerUserAction = async ({ userId, toolId, action }) => {
  const date = new Date();

  await connection.query(
    'INSERT INTO logs (user_id, tool_id, action, date) VALUES ($1, $2, $3, $4)',
    [userId, toolId, action, date]
  );

  return;
};

export { registerUserAction };
