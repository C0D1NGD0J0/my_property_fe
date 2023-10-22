import { IInitialValues } from "@interfaces/user.interface";
import {
  SignupValidationSchema,
  TSignupData,
} from "@validations/schema/auth.schema";

class AuthValidation {
  signup = async (signupData: IInitialValues) => {
    const result = SignupValidationSchema.safeParse(signupData);

    if (result.success) {
      // Data is valid, proceed with signup logic
      return { isValid: true };
    } else {
      // Data is invalid, handle errors
      const errors = this.parseZodError(result.error.issues);
      return { isValid: false, errors };
    }
  };

  // Private TSignupData to parse Zod error issues
  private parseZodError(errors: Array<any>): { [key: string]: string } {
    const parsedErrors: { [key: string]: string } = {};

    errors.forEach((issue) => {
      const key = issue.path[0];
      const message = issue.message;
      parsedErrors[key] = message;
    });

    return parsedErrors;
  }
}

export default new AuthValidation();
