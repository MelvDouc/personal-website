export default class InvalidQueryParamsError extends Error {
  constructor(propertyName: string, value: unknown) {
    super(`Invalid value <${value}> for property <${propertyName}>`);
  }
}