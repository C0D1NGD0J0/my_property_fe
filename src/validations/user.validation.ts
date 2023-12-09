import { z } from "zod";
import { IEditClient, IEditUser } from "@interfaces/user.interface";

class UserValidation {
  editUser = async (userData: IEditUser) => {
    const userSchema = z.object({
      email: z.string().email(),
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      location: z.string().optional(),
      phoneNumber: z.string().min(1, "Phone number is required"),
      password: z.string().min(6, "Password is required"),
      companyName: z.string().optional(),
      newPassword: z.string().optional(),
      notifications: z.object({
        sms: z.boolean(),
        email: z.boolean(),
      }),
    });
    const result = userSchema.safeParse(userData);

    if (result.success) {
      // Data is valid, proceed with signup logic
      return { isValid: true };
    } else {
      // Data is invalid, handle errors
      const errors = this.parseZodError(result.error.issues);
      return { isValid: false, errors };
    }
  };

  editClient = async (clientData: IEditClient) => {
    const clientSchema = z.object({
      contactInfo: z.object({
        email: z.string().email(),
        address: z.string().optional(),
        phoneNumber: z.string().optional(),
        contactPerson: z.string().optional(),
      }),
      companyName: z.string().min(1, "Company name is required"),
      legalEntityName: z.string().min(1, "Legal entity name is required"),
      identification: z.object({
        idType: z.string().min(1, "ID type is required"),
        idNumber: z.string().min(1, "ID number is required"),
        authority: z.string().min(1, "Authority is required"),
        issueDate: z.string().min(1, "Issue date is required"),
        expiryDate: z.string().min(1, "Expiry date is required"),
        issuingState: z.string().min(1, "Issuing state is required"),
      }),
      businessRegistrationNumber: z
        .string()
        .min(1, "Business registration number is required"),
    });

    const result = clientSchema.safeParse(clientData);

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

export default new UserValidation();
