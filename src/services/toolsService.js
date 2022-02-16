import translate from '@vitalets/google-translate-api';

import * as toolRepository from '../repositories/toolsRepository.js';
import * as logsRepository from '../repositories/logsRepository.js';

import * as toolSchema from '../validations/toolSchema.js';

import InexistentTool from '../errors/inexistentTool.js';
import BodyValidation from '../errors/bodyValidation.js';

const getAllTools = async () => {
  const tools = await toolRepository.getAllTools();

  return tools;
};

const getToolById = async ({ toolId }) => {
  const tool = await toolRepository.getToolById({ toolId });

  if (!tool.length) throw new InexistentTool();

  return tool;
};

const createTool = async ({ title, link, description, tags, userId }) => {
  const validation = toolSchema.createTool.validate({
    title,
    link,
    description,
    tags,
  });

  if (validation.error) {
    const errorMessage = validation.error.details[0].message;

    await translate(errorMessage, { from: 'en', to: 'pt' }).then((res) => {
      throw new BodyValidation(res.text);
    });
  }

  const toolId = await toolRepository.createTool({
    title,
    link,
    description,
    tags,
  });

  await logsRepository.registerUserAction({ userId, toolId, action: 'Create' });

  return;
};

const deleteTool = async ({ toolId, userId }) => {
  const tool = await toolRepository.getToolById({ toolId });
  if (!tool) throw new InexistentTool();

  await toolRepository.deleteTool({ toolId });

  await logsRepository.registerUserAction({ userId, toolId, action: 'Delete' });

  return;
};

export { getAllTools, getToolById, createTool, deleteTool };
