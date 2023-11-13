import { stripeSupportedCountries } from "@utils/constants";
import { phoneRegex } from "@utils/helperFN";
import { z } from "zod";

const validCountryNames = stripeSupportedCountries.map(
  (country) => country.value,
) as [string, ...string[]];

export const SignupValidationSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(20, "First name must be at most 20 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(30, "Last name must be at most 30 characters"),
    companyName: z
      .string()
      .min(5, "Company name must be at least 5 characters")
      .optional()
      .or(z.literal("")),
    email: z.string().email("Please enter a valid email"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits")
      .regex(phoneRegex, "Invalid phone number/format provided")
      .optional(),
    location: z.string(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be at most 15 characters"),
    cpassword: z.string(),
    accountType: z.object({
      planId: z.string(),
      name: z.enum(["Individual", "Enterprise"]),
      isEnterpriseAccount: z.boolean(),
    }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords do not match",
    path: ["cpassword"],
  })
  .refine(
    (data) => {
      if (data.accountType.isEnterpriseAccount) {
        return !!data.companyName; // Validate companyName only if isEnterpriseAccount is true
      }
      return true;
    },
    {
      message: "Company name is required for enterprise accounts",
      path: ["companyName"],
    },
  )
  .refine((data) => validCountryNames.includes(data.location), {
    message: "Invalid location. Must be one of the supported countries.",
    path: ["location"],
  });

export type TSignupData = z.infer<typeof SignupValidationSchema>;
