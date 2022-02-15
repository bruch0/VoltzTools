import * as toolRepository from '../repositories/toolsRepository.js';

import InexistentTool from '../errors/inexistentTool.js';

const getAllTools = async () => {
  const tools = await toolRepository.getAllTools();

  return tools;
};

const getToolById = async ({ id }) => {
  const tool = await toolRepository.getToolById({ id });

  if (!tool.length) throw new InexistentTool();

  return tool;
};

export { getAllTools, getToolById };
