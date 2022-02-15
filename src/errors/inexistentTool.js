class InexistentTool extends Error {
  constructor() {
    super('Essa ferramenta não existe');
    this.name = 'inexistentTool';
  }
}

export default InexistentTool;
