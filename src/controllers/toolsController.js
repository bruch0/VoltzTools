import * as toolsService from '../services/toolsService.js';

const getAllTools = async (req, res, next) => {
  try {
    const tools = await toolsService.getAllTools();

    return res.send(tools);
  } catch (error) {
    next(error);
  }
};

const getToolById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) return res.status(400).send('Insira um id válido');

    const tool = await toolsService.getToolById({ id });

    return res.send(tool);
  } catch (error) {
    if ((error.name = 'inexistentTool'))
      return res.status(404).send(error.message);

    next(error);
  }
};

export { getAllTools, getToolById };
