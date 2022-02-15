import * as toolsService from '../services/toolsService.js';

const getAllTools = async (req, res) => {
  const tools = await toolsService.getAllTools();

  return res.send(tools);
};

export { getAllTools };
