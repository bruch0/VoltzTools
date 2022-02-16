class InexistentUser extends Error {
  constructor() {
    super('Não existe nenhum usuário com este email');
    this.name = 'inexistentUser';
  }
}

export default InexistentUser;
