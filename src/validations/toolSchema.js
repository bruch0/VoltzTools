import joi from 'joi';

const createTool = joi.object({
  title: joi.string().required().min(3).max(30).required(),
  description: joi.string().min(10).max(255).required(),
  link: joi.string().uri().required(),
  tags: joi.array().min(1).required(),
});

export { createTool };
