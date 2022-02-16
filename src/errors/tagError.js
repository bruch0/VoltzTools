class TagError extends Error {
  constructor() {
    super(
      'Houve um problema ao registrar as tags, então a ferramenta não foi registrada, tente novamente'
    );
    this.name = 'tagError';
  }
}

export default TagError;
