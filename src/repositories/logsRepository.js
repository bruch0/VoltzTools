import connection from '../database/database.js';

const registerUserAction = async ({ userId, toolId, action }) => {
  const date = new Date();

  await connection.query(
    'INSERT INTO logs (user_id, tool_id, action, date) VALUES ($1, $2, $3, $4)',
    [userId, toolId, action, date]
  );

  return;
};

const getLogs = async () => {
  const logs = await connection.query(
    `SELECT 
		logs.action as action,
		logs.tool_id as "toolId",
		logs.date as date,
		logs.user_id as "userId",
		users.name as name,
		tools.title as "toolName"
			FROM logs
				JOIN users ON logs.user_id = users.id
				JOIN tools ON logs.tool_id = tools.id`
  );

  return logs.rows;
};

const getLogsByUserId = async ({ userId }) => {
  const logs = await connection.query(
    `SELECT 
		logs.action as action,
		logs.tool_id as "toolId",
		logs.date as date,
		users.name as user,
		tools.title as "toolName"
			FROM logs
				JOIN users ON logs.user_id = users.id
				JOIN tools ON logs.tool_id = tools.id
					WHERE logs.user_id = $1`,
    [userId]
  );

  return logs.rows;
};

export { registerUserAction, getLogs, getLogsByUserId };
