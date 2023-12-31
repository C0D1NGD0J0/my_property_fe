import { z } from "zod";
import { IProperty } from "@interfaces/property.interface";
import BaseValidation from "./base.validation";
import { formatErrors } from "@utils/helperFN";

class PropertyValidation extends BaseValidation {
  newProperty = (propertyData: IProperty) => {
    const propertySchema = z.object({
      title: z.string().min(1, "Title is required"),
      description: z
        .object({
          text: z.string().optional(),
          html: z.string().optional(),
        })
        .optional(),
      propertyType: z.enum([
        "singleFamily",
        "multiUnits",
        "apartments",
        "officeUnits",
        "hotel",
        "others",
      ]),
      status: z.enum([
        "vacant",
        "occupied",
        "partially-occupied",
        "unavailable",
      ]),
      managedBy: z.string().min(1, "Manager is required"),
      propertySize: z.number().min(1, "Property size is required"),
      features: z.object({
        floors: z.number().nonnegative(),
        bedroom: z.number().nonnegative(),
        bathroom: z.number().nonnegative(),
        maxCapacity: z.number().nonnegative(),
        availableParking: z.number().nonnegative(),
      }),
      extras: z.object({
        has_tv: z.boolean(),
        has_kitchen: z.boolean(),
        has_ac: z.boolean(),
        has_heating: z.boolean(),
        has_internet: z.boolean(),
        has_gym: z.boolean(),
        has_parking: z.boolean(),
        has_swimmingpool: z.boolean(),
        has_laundry: z.boolean(),
        petsAllowed: z.boolean(),
      }),
      category: z.enum(["residential", "commercial", "others"]),
      address: z.string().min(1, "Address is required"),
      fees: z.object({
        currency: z.string().min(1, "Currency is required"),
        includeTax: z.boolean(),
        taxAmount: z.number().nonnegative(),
        rentalAmount: z.union([z.number().nonnegative(), z.string().min(1)]),
        managementFees: z.union([z.number().nonnegative(), z.string().min(1)]),
      }),
      photos: z.array(z.any()).optional(),
      totalUnits: z.number().nonnegative(),
    });

    const result = propertySchema.safeParse(propertyData);
    if (result.success) {
      // Data is valid, return or proceed with logic
      return { isValid: true };
    } else {
      // Data is invalid, handle errors
      const errors = this.parseZodError(result.error.issues);
      // const formattedError = formatErrors({ isValid: false, errors });
      return { isValid: false, errors };
    }
  };
}

export default PropertyValidation;
