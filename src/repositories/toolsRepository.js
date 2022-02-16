import connection from '../database/database.js';
import TagError from '../errors/tagError.js';

const getAllTools = async () => {
  const tools = await connection.query(
    'SELECT * FROM tools JOIN tool_tags ON tools.id = tool_tags.tool_id'
  );

  return tools.rows;
};

const getToolById = async ({ id }) => {
  const tool = await connection.query(
    'SELECT * FROM tools JOIN tool_tags ON tools.id = tool_tags.tool_id WHERE tools.id = $1',
    [id]
  );

  return tool.rows;
};

const createTool = async ({ title, link, description, tags }) => {
  const tool = await connection.query(
    'INSERT INTO tools (title, link, description) VALUES ($1, $2, $3) RETURNING *',
    [title, link, description]
  );

  const toolId = tool.rows[0].id;

  try {
    await connection.query('BEGIN');

    tags.forEach(async (tag) => {
      await connection.query(
        'INSERT INTO tool_tags (tool_id, tag) VALUES ($1, $2);',
        [toolId, tag]
      );

      await connection.query('COMMIT');
    });
  } catch (error) {
    await connection.query('ROLLBACK');
    throw new TagError();
  }

  return tool.rows;
};

export { getAllTools, getToolById, createTool };
