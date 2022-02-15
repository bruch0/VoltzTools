import joi from 'joi';

const createUser = joi.object({
  name: joi.string().required().min(3).max(30),
  email: joi.string().required().email(),
  password: joi.string().required().min(8).max(50),
});

export { createUser };
