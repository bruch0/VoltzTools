import * as userService from '../services/userService.js';

const newUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).send('Corpo inválido');

    await userService.newUser({ name, email, password });

    return res.sendStatus(201);
  } catch (error) {
    if (error.name === 'bodyValidation')
      return res.status(400).send(error.message);

    if (error.name === 'emailAlreadyTaken')
      return res.status(409).send(error.message);

    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Corpo inválido');

    const token = await userService.login({ email, password });

    return res.send(token);
  } catch (error) {
    if (error.name === 'bodyValidation')
      return res.status(400).send(error.message);

    if (error.name === 'inexistentUser')
      return res.status(404).send(error.message);

    if (error.name === 'incorrectPassword')
      return res.status(401).send(error.message);

    next(error);
  }
};

export { newUser, login };
