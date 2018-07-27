module.exports = class extends Error {
  constructor(message, originalError) {
    super(message);

    this.originalError = originalError;
  }
};
