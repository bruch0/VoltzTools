class EmailAlreadyTaken extends Error {
  constructor() {
    super('Esse email já está sendo usado');
    this.name = 'emailAlreadyTaken';
  }
}

export default EmailAlreadyTaken;
