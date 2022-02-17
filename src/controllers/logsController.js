import * as logsService from '../services/logsService.js';

const getLogs = async (req, res, next) => {
  try {
    const logs = await logsService.getLogs();

    return res.status(200).send(logs);
  } catch (error) {
    next(error);
  }
};

const getLogsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.sendStatus(400);

    const logs = await logsService.getLogsByUserId({ userId });

    return res.status(200).send(logs);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getLogs, getLogsByUserId };
