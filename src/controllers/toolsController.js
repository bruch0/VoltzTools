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
    const { toolId } = req.params;

    if (isNaN(toolId)) return res.status(400).send('Insira um id válido');

    const tool = await toolsService.getToolById({ toolId });

    return res.send(tool);
  } catch (error) {
    if ((error.name = 'inexistentTool'))
      return res.status(404).send(error.message);

    next(error);
  }
};

const createTool = async (req, res, next) => {
  try {
    const { title, link, description, tags } = req.body;
    const { userId } = req.locals;

    if (!title || !link || !description || !tags || !Array.isArray(tags))
      return res.status(400).send('Insira um corpo válido');

    await toolsService.createTool({ title, link, description, tags, userId });

    return res.status(201).send({ title, link, description, tags });
  } catch (error) {
    if (error.name === 'bodyValidation')
      return res.status(400).send(error.message);

    if (error.name === 'tagError') return res.status(500).send(error.message);

    next(error);
  }
};

const deleteTool = async (req, res, next) => {
  try {
    const { toolId } = req.params;
    const { userId } = req.locals;

    await toolsService.deleteTool({ toolId, userId });

    return res.status(200).send({});
  } catch (error) {
    if (error.name === 'inexistentTool')
      return res.status(404).send(error.message);

    next(error);
  }
};

export { getAllTools, getToolById, createTool, deleteTool };
