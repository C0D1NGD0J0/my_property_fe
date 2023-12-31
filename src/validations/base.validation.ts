import { ZodIssue } from "zod";

class BaseValidation {
  protected parseZodError(errors: ZodIssue[]): { [key: string]: string } {
    const parsedErrors: { [key: string]: string } = {};

    errors.forEach((issue) => {
      // Create a readable string from the path array.
      const key = this.formatPath(issue.path);
      const message = issue.message;
      parsedErrors[key] = message;
    });

    return parsedErrors;
  }

  // Convert the path array into a string. Customize this method as needed.
  private formatPath(pathArray: (string | number)[]): string {
    return pathArray.map(String).join("."); // This is the same as before, but you can customize it here.
  }
}

export default BaseValidation;
