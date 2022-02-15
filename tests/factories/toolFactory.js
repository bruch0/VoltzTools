import faker from 'faker';

import connection from '../../src/database/database';

const createTool = async () => {
  const tool = await connection.query(
    'INSERT INTO tools (title, link, description) VALUES ($1, $2, $3) RETURNING *',
    [faker.company.companyName(), faker.internet.url(), faker.lorem.words()]
  );

  const id = tool.rows[0].id;

  await connection.query(
    'INSERT INTO tool_tags (tool_id, tag) VALUES ($1, $2) RETURNING *',
    [id, faker.lorem.words(1)]
  );

  return id;
};

export { createTool };
