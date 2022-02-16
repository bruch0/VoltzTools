import connection from '../database/database.js';
import TagError from '../errors/tagError.js';

const getAllTools = async () => {
  const tools = await connection.query('SELECT * from tools');

  const tags = await connection.query(
    'SELECT id, tool_id as "toolId", tag from tool_tags'
  );

  const hashMap = {};

  tags.rows.forEach((tagObj) => {
    const toolId = tagObj.toolId;
    const tag = tagObj.tag;

    hashMap[toolId] = hashMap[toolId] ? [...hashMap[toolId], tag] : [tag];
  });

  tools.rows.forEach((tool) => {
    const toolId = tool.id;
    tool.tags = hashMap[toolId];
  });

  return tools.rows;
};

const getToolById = async ({ toolId }) => {
  const tool = await connection.query('SELECT * FROM tools WHERE id = $1', [
    toolId,
  ]);
  tool.rows[0].tags = [];

  const tags = await connection.query(
    'SELECT * FROM tool_tags WHERE tool_id = $1',
    [toolId]
  );

  tags.rows.forEach((tagObj) => tool.rows[0].tags.push(tagObj.tag));

  return tool.rows;
};

const createTool = async ({ title, link, description, tags }) => {
  let toolId;

  try {
    await connection.query('BEGIN');

    const tool = await connection.query(
      'INSERT INTO tools (title, link, description) VALUES ($1, $2, $3) RETURNING *',
      [title, link, description]
    );

    await connection.query('COMMIT');

    toolId = tool.rows[0].id;

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

  return toolId;
};

const deleteTool = async ({ toolId }) => {
  await connection.query('DELETE FROM tools WHERE id = $1', [toolId]);
};

export { getAllTools, getToolById, createTool, deleteTool };
