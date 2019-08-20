import colors = require("colors/safe");
import { DecoderError } from "../validation/runDecoder";
export class ValidationError extends Error {
  errors: DecoderError[];
  constructor(err: { message: string; errors: DecoderError[] }) {
    super();
    this.name = "ValidationError";
    this.errors = err.errors;
  }
}

export const printError = (message: string, errorObj: any): void => {
  console.error(colors.red(`🚨 ${message} 🚨`));
  console.error(errorObj);
};
