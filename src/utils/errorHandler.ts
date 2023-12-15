import { AxiosError } from "axios";

interface ApiErrorObject {
  key: string;
  value: string;
}

type ApiErrorData = string | ApiErrorObject[];
export type ErrorResponse = {
  success: boolean;
  data: any;
};

type RequestErrorObj = {
  success: boolean;
  type: string;
  error: { data: ApiErrorData };
};
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
        const res = this.parseApiError(response.data);
        console.log(res, "----RES");
        return res;
      }
    } else if (error instanceof Error) {
      // Handle generic JavaScript Error
      return this.parseSystemError(error);
    }
  }

  private parseSystemError = (e: Error): ErrorResponse => {
    console.log(`System Error: ${e.name}`);
    return {
      success: false,
      data: e.message,
    };
  };

  private parseApiError = (
    errorObj: RequestErrorObj,
  ): ErrorResponse | undefined => {
    // Handle the error based on its type and data
    if (errorObj.type === "validationError") {
      const data = errorObj.error.data;

      const _data = Array.isArray(data) ? data : JSON.parse(data);
      if (Array.isArray(_data)) {
        if (typeof _data[0] === "string") {
          return {
            success: false,
            data: _data,
          };
        } else if (typeof _data[0] === "object") {
          const valuesArray = (_data as ApiErrorObject[]).flatMap((obj) =>
            Object.values(obj),
          );
          return {
            success: false,
            data: valuesArray,
          };
        }
      }
    }

    if (["serviceError", "authError"].includes(errorObj.type)) {
      const data = errorObj.error.data;
      return {
        success: false,
        data,
      };
    }
  };
}
