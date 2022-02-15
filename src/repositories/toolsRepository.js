import connection from '../database/database.js';

const getAllTools = async () => {
  const tools = await connection.query(
    'SELECT * FROM tools JOIN tool_tags ON tools.id = tool_tags.tool_id'
  );

  return tools.rows;
};

export { getAllTools };
