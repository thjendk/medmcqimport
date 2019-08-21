import colors = require("colors/safe");
export class ValidationError extends Error {
  error: any;
  constructor(err: { message: string; error: any }) {
    super();
    this.name = "ValidationError";
    this.error = err.error;
  }
}

interface CheckedFlow {
  ok: boolean;
  error: {
    kind: string;
    input: any;
    at: string;
    message: string;
  };
}

export const returnError = (checkedFlow: CheckedFlow) =>
  printError(
    `${(checkedFlow.error.input.title || "").toUpperCase()}: IS NOT VALID!`,
    {
      checkedFlow: {
        title: checkedFlow.error.input.title,
        activityId: checkedFlow.error.input.activityId
      },
      error: checkedFlow.error
    }
  );

export const printError = (message: string, errorObj: any): void => {
  console.error(colors.red(`🚨 ${message} 🚨`));
  console.error(errorObj);
};
