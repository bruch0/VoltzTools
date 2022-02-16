import * as toolRepository from '../repositories/toolsRepository.js';

import * as toolSchema from '../validations/toolSchema.js';

import InexistentTool from '../errors/inexistentTool.js';
import BodyValidation from '../errors/bodyValidation.js';

const getAllTools = async () => {
  const tools = await toolRepository.getAllTools();

  return tools;
};

const getToolById = async ({ id }) => {
  const tool = await toolRepository.getToolById({ id });

  if (!tool.length) throw new InexistentTool();

  return tool;
};

const createTool = async ({ title, link, description, tags }) => {
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

  await toolRepository.createTool({ title, link, description, tags });

  return;
};

export { getAllTools, getToolById, createTool };
