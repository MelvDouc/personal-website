export default class InvalidQueryParamsError extends Error {
  constructor(propertyName: string, value: unknown) {
    super(`Invalid value <${value}> for property <${propertyName}>`);
  }

  public toString(): string {
    return this.message;
  }
}