const inexistentRoute = (req, res) => {
  return res.status(404).send('Rota inexistente');
};

export default inexistentRoute;
