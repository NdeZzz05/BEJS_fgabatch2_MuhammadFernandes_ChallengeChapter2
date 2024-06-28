class ValidationError extends Error {
  constructor(param, message) {
    super(message);
    this.param = param;
  }
}
export default ValidationError;
