import jwt from 'jsonwebtoken';

const authJWT = async (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.sendStatus(401);

  const token = header.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);

    const { userId } = decoded;
    req.locals = { userId };

    next();
  });
};

export default authJWT;
