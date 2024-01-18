import { RefinementCtx, z } from "zod";
import { IProperty } from "@interfaces/property.interface";
import BaseValidation from "./base.validation";
import { formatErrors } from "@utils/helperFN";

class PropertyValidation extends BaseValidation {
  newProperty = (propertyData: IProperty) => {
    const MAX_FILE_SIZE = 5000000;
    const ACCEPTED_IMAGE_TYPES = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    const fileSchema = z.object({
      file: z.instanceof(File).optional(),
      previewUrl: z.string().optional(),
    });

    const propertySchema = z
      .object({
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
        photos: z.array(fileSchema),
        category: z.enum(["residential", "commercial", "others"]),
        address: z.string().min(1, "Address is required"),
        fees: z.object({
          currency: z.string().min(1, "Currency is required"),
          includeTax: z.boolean(),
          taxAmount: z.number().nonnegative(),
          rentalAmount: z.union([z.number().nonnegative(), z.string().min(1)]),
          managementFees: z.union([
            z.number().nonnegative(),
            z.string().min(1),
          ]),
        }),
        totalUnits: z.number().nonnegative(),
      })
      .superRefine((data, ctx: RefinementCtx) => {
        if (data.propertyType === "singleFamily") {
          // Validate features only for singleFamily
          if (data.features.bedroom === 0 || data.features.bathroom === 0) {
            ctx.addIssue({
              path: ["features"],
              message:
                "Bedrooms and bathrooms must be provided for a single family home",
              code: "custom",
            });
          }
        }
        // Validate totalUnits for other property types
        if (data.totalUnits === 0) {
          ctx.addIssue({
            path: ["totalUnits"],
            code: "custom",
            message:
              "Total units must be provided based on selected property type.",
          });
        }

        if (data.photos.length) {
          for (let item of data.photos) {
            if (item?.file && item.file?.size > MAX_FILE_SIZE) {
              ctx.addIssue({
                path: ["photos"],
                code: "custom",
                message: `Max image size is 5MB (${item.file.name})`,
              });
            }
            if (item?.file && !ACCEPTED_IMAGE_TYPES.includes(item.file.type)) {
              return ctx.addIssue({
                path: ["photos"],
                code: "custom",
                message: `"Only .jpg, .jpeg, .png, and .webp formats are supported." (${item.file.name})`,
              });
            }
          }
        }
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
