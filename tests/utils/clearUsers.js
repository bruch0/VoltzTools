import connection from '../../src/database/database';

const clearUsers = async () => {
  await connection.query('TRUNCATE users CASCADE');
};

export { clearUsers };
