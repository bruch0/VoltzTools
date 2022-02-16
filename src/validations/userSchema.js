import joi from 'joi';

const createUser = joi.object({
  name: joi.string().required().min(3).max(30).required(),
  email: joi.string().required().email().required(),
  password: joi.string().required().min(8).max(50).required(),
});

const login = joi.object({
  email: joi.string().required().email().required(),
  password: joi.string().required().min(8).max(50).required(),
});

export { createUser, login };
