import { RefinementCtx, z } from "zod";
import { IProperty } from "@interfaces/property.interface";
import BaseValidation from "./base.validation";
import { formatErrors } from "@utils/helperFN";

interface CsvBulkInsertResult {
  successCount: number;
  failureCount: number;
  errors: Array<{ row: number; issues: z.ZodIssue[] }> | [];
}
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

  csvBulkInsert = (csvData: IProperty[]): CsvBulkInsertResult => {
    let successCount = 0;
    let failureCount = 0;
    let errors: any[] = [];

    csvData.forEach((propertyData, index) => {
      // propertyData = {
      //   ...propertyData,
      //   propertySize: parseInt(propertyData.propertySize, 10),
      //   features: {
      //     floors: parseInt(propertyData.features.floors, 10),
      //     bedroom: parseInt(propertyData.features.bedroom, 10),
      //     bathroom: parseInt(propertyData.features.bathroom, 10),
      //     maxCapacity: parseInt(propertyData.features.maxCapacity, 10),
      //     availableParking: parseInt(
      //       propertyData.features.availableParking,
      //       10
      //     ),
      //   },
      //   extras: {
      //     has_tv: propertyData.extras.has_tv === "true",
      //     has_kitchen: propertyData.extras.has_kitchen === "true",
      //     has_ac: propertyData.extras.has_ac === "true",
      //     has_heating: propertyData.extras.has_heating === "true",
      //     has_internet: propertyData.extras.has_internet === "true",
      //     has_gym: propertyData.extras.has_gym === "true",
      //     has_parking: propertyData.extras.has_parking === "true",
      //     has_swimmingpool: propertyData.extras.has_swimmingpool === "true",
      //     has_laundry: propertyData.extras.has_laundry === "true",
      //     petsAllowed: propertyData.extras.petsAllowed === "true",
      //   },
      //   fees: {
      //     currency: propertyData.fees_currency,
      //     includeTax: propertyData.fees_includeTax === "true",
      //     taxAmount: parseFloat(propertyData.fees_taxAmount),
      //     rentalAmount: parseFloat(propertyData.fees_rentalAmount),
      //     managementFees: parseFloat(propertyData.fees_managementFees),
      //   },
      //   totalUnits: parseInt(propertyData.totalUnits, 10),
      // };
      console.log(propertyData);
      const result = this.newProperty(propertyData); // Validate each property using your existing function
      if (result.isValid) {
        successCount++;
        // Here you would insert the valid property data into your database or another destination
      } else {
        failureCount++;
        errors.push({ row: index + 1, issues: result.errors });
      }
    });

    return { successCount, failureCount, errors };
  };
}

export default PropertyValidation;
