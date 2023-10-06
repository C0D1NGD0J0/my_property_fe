import { phoneRegex } from "@utils/helperFN";
import { z } from "zod";

export const SignupValidationSchema = z
  .object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(30),
    companyName: z.string().min(5).optional(),
    email: z.string().email("Please enter a vlaid email.."),
    phoneNumber: z
      .string()
      .min(10)
      .max(15)
      .regex(phoneRegex, "Invalid phone number/format provided")
      .optional(),
    location: z.string(),
    password: z.string().min(6).max(15),
    cpassword: z.string(),
    accountType: z.object({
      id: z.string(),
      name: z.string(),
      isEnterpriseAccount: z.boolean(),
    }),
  })
  .refine((data) => data.password === data.cpassword, {
    // Custom error message
    message: "Passwords do not match",
    // Custom path to indicate where the error occurred
    path: ["cpassword"],
  });

export type TSignupData = z.infer<typeof SignupValidationSchema>;
