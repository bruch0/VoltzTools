import * as logsService from '../services/logsService.js';

const getLogs = async (req, res, next) => {
  try {
    const logs = await logsService.getLogs();

    return res.status(200).send(logs);
  } catch (error) {
    next(error);
  }
};

export { getLogs };
