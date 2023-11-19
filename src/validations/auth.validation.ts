import { z } from "zod";
import { IInitialValues } from "@interfaces/user.interface";
import { SignupValidationSchema } from "@validations/schema/auth.schema";

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

  login = async (data: { email: string; password: string }) => {
    const schema = z.object({
      password: z.string().max(21, "Password too long."),
      email: z.string().email("Please provide a valid email address."),
    });

    const result = schema.safeParse(data);
    if (!result.success) {
      const errors = this.parseZodError(result.error.issues);
      return { isValid: false, errors };
    }

    // Data is valid, proceed with logic
    return { isValid: true };
  };

  accountValidationToken = async (tokenData: { accountCode: string }) => {
    const schema = z.object({
      accountCode: z.string().length(64, "Invalid token provided."),
    });

    const result = schema.safeParse(tokenData);
    if (!result.success) {
      const errors = this.parseZodError(result.error.issues);
      return { isValid: false, errors };
    }

    // Data is valid, proceed with logic
    return { isValid: true };
  };

  forgotPassword = async (data: { email: string }) => {
    const schema = z.object({
      email: z.string().email("Please provide a valid email address."),
    });

    const result = schema.safeParse(data);
    if (!result.success) {
      const errors = this.parseZodError(result.error.issues);
      return { isValid: false, errors };
    }

    // Data is valid, proceed with logic
    return { isValid: true };
  };

  resetPassword = async (data: { password: string; cpassword: string }) => {
    const schema = z
      .object({
        password: z
          .string()
          .min(7, "Password too short (minimum 7 characters)")
          .max(20, "Password too long.")
          .refine(
            (pwd) => {
              return (
                /[A-Z]/.test(pwd) &&
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pwd)
              );
            },
            {
              message:
                "Password must contain at least one uppercase letter and one special character.",
            },
          ),
        cpassword: z
          .string()
          .min(7, "Password too short (minimum 7 characters)"),
      })
      .refine((data) => data.password === data.cpassword, {
        message: "Passwords do not match",
        path: ["cpassword"],
      });

    const result = schema.safeParse(data);
    if (!result.success) {
      const errors = this.parseZodError(result.error.issues);
      return { isValid: false, errors };
    }

    // Data is valid, proceed with logic
    return { isValid: true };
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
