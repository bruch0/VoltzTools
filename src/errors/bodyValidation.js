class BodyValidation extends Error {
  constructor(message) {
    super(message);
    this.name = 'bodyValidation';
  }
}

export default BodyValidation;
