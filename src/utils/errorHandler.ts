import { AxiosError } from "axios";

interface ApiErrorObject {
  key: string;
  value: string;
}

type ApiErrorData = string | ApiErrorObject[];

export default class APIError extends Error {
  constructor() {
    super("Api Error: ");
  }

  init = (error: Error) => {
    return this.parseErrorObj(error);
  };

  private parseErrorObj(error: any) {
    if (error instanceof AxiosError) {
      // Handle Axios error
      const { response } = error;
      if (response && response.data) {
        return this.parseApiError(response.data);
      }
    } else if (error instanceof Error) {
      // Handle generic JavaScript Error
      return this.parseSystemError(error);
    }
  }

  private parseSystemError = (e: Error) => {
    console.log(`System Error: ${e.name}`);
    return {
      success: false,
      data: e.message,
    };
  };

  private parseApiError = (errorObj: {
    success: boolean;
    type: string;
    error: { data: ApiErrorData };
  }) => {
    // Handle the error based on its type and data
    if (errorObj.type === "validationError") {
      const data = errorObj.error.data;

      if (Array.isArray(data)) {
        const valuesArray = (data as ApiErrorObject[]).flatMap((obj) =>
          Object.values(obj),
        );
        const formattedString = valuesArray.join("\n");
        return {
          success: false,
          data: formattedString,
        };
      }
    }

    if (errorObj.type === "serviceError") {
      const data = errorObj.error.data;
      return {
        success: false,
        data,
      };
    }
  };
}
