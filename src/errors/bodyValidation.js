class bodyValidation extends Error {
  constructor(message) {
    super(message);
    this.name = 'bodyValidation';
  }
}

export default bodyValidation;
