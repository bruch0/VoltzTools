import * as toolRepository from '../repositories/toolsRepository.js';

const getAllTools = async () => {
  const tools = await toolRepository.getAllTools();

  return tools;
};

export { getAllTools };
