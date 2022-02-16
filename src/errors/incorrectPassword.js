class IncorrectPassword extends Error {
  constructor() {
    super('Senha incorreta');
    this.name = 'incorrectPassword';
  }
}

export default IncorrectPassword;
