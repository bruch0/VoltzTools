import * as logsRepository from '../repositories/logsRepository.js';

const getLogs = async () => {
  const logs = await logsRepository.getLogs();

  logs.forEach((log) => {
    log.user = { name: log.name, id: log.userId };
    log.tool = { name: log.toolName, id: log.toolId };

    delete log.name;
    delete log.userId;
    delete log.toolName;
    delete log.toolId;
  });

  return logs;
};

const getLogsByUserId = async ({ userId }) => {
  const logs = await logsRepository.getLogsByUserId({ userId });

  logs.forEach((log) => {
    log.tool = { name: log.toolName, id: log.toolId };

    delete log.toolName;
    delete log.toolId;
  });

  return logs;
};

export { getLogs, getLogsByUserId };
