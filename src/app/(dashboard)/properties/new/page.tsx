"use client";
import React, { useCallback, useState } from "react";
import { FormikValues, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  Button,
  Select,
  TextEditor,
  Toggle,
  FileInput,
} from "@components/FormElements";
import DynamicList from "@components/UI/List";
import { IProperty } from "@interfaces/property.interface";
import { ImageGallery, MultiStepWrapper } from "@components/UI";
import { useAuthStore } from "@store/auth.store";
import { useNotification } from "@hooks/useNotification";
import { ContentHeader } from "@components/PageHeader";
import PropertyValidation from "@validations/property.validation";
import propertyService from "@services/property";
import { objectToFormData } from "@utils/helperFN";
import { FileWithPreview } from "@interfaces/utils.interface";

const initialValues: IProperty = {
  title: "",
  description: {
    text: "",
    html: "",
  },
  propertyType: "",
  status: "",
  managedBy: "",
  propertySize: 0, // size in square feet or square meters
  features: {
    floors: 0,
    bedroom: 0,
    bathroom: 0,
    maxCapacity: 0,
    availableParking: 0,
  },
  extras: {
    has_tv: false,
    has_kitchen: false,
    has_ac: false,
    has_heating: false,
    has_internet: false,
    has_gym: false,
    has_parking: false,
    has_swimmingpool: false,
    has_laundry: false,
    petsAllowed: false,
  },
  category: "",
  address: "",
  fees: {
    includeTax: false,
    taxAmount: 0.0,
    rentalAmount: 0.0,
    managementFees: 0.0,
    currency: "USD",
  },
  photos: [],
  totalUnits: 0,
};

const propertyValidation = new PropertyValidation();

const AddProperty = () => {
  const MAX_IMAGES = 6;
  const router = useRouter();
  const [filesWithPreviews, setFilesWithPreviews] = useState<FileWithPreview[]>(
    [],
  );
  const { user } = useAuthStore((state) => state);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const { openNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: async ({
      cid,
      formData,
    }: {
      cid: string;
      formData: FormData;
    }) => {
      return await propertyService.addProperty(cid, formData);
    },
  });

  const handleSubmit = async (values: FormikValues) => {
    try {
      const editedValues = {
        ...values,
        photos: values.photos.map(
          (f: { file: File; previewUrl?: string }) => f.file,
        ),
      };

      const res = await mutation.mutateAsync({
        cid: user?.cid || "",
        formData: objectToFormData(editedValues),
      });
      if (res.success) {
        openNotification("success", "New property listing added.", res.msg);
        router.push("/properties");
        formik.resetForm();
      }
    } catch (e: unknown) {
      const err = e as Error & { data: any };
      return openNotification("error", "Error", err.data);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: initialValues,
    validate: async (values) => {
      const res = propertyValidation.newProperty(values);
      const stepFields = {
        description: [
          "title",
          "address",
          "managedBy",
          "propertyType",
          "category",
          "status",
          "description",
        ],
        features: [
          "features.floors",
          "features.bedroom",
          "features.bathroom",
          "features.maxCapacity",
          "propertySize",
          "totalUnits",
          "extras.has_parking",
          "features.availableParking",
        ],
        financial: [
          "fees.rentalAmount",
          "fees.managementFees",
          "fees.currency",
          "fees.includeTax",
          "fees.taxAmount",
        ],
        amenities: Object.keys(formik.values.extras).map(
          (extraKey) => `extras.${extraKey}`,
        ),
        gallery: ["photos"],
        // Add more steps as needed
      };

      const newStepErrors: string[] = [];

      Object.entries(stepFields).forEach(([stepName, fields]) => {
        // Check if any of the fields for this step have an error
        const hasError = fields.some((field) => {
          if (res.errors) {
            return Object.keys(res?.errors).includes(field);
          }
        });

        if (hasError) {
          newStepErrors.push(stepName);
        }
      });

      // Update the stepErrors state
      setStepErrors(newStepErrors);
      return res.isValid ? {} : res.errors;
    },
  });

  const convertToLabeledArray = (obj: IProperty["extras"]) => {
    const entries = Object.entries(obj);
    return entries.map(([key, value], index) => {
      // Alternating position assignment
      if (key !== "has_parking") {
        const position: "left" | "right" = index % 2 === 0 ? "left" : "right";
        return {
          position,
          content: (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>
                {key
                  .replace(/has_/g, " ")
                  .replace(/^\w|\s\w/g, (m) => m.toUpperCase())}
              </span>
              <Toggle
                onChange={(bool) => {
                  formik.setFieldValue(`extras.${[key]}`, bool);
                }}
                initialState={Boolean(value)}
              />
            </div>
          ),
        };
      }

      const position: "left" | "right" = index % 2 === 0 ? "left" : "right";
      return {
        position,
        content: null,
      };
    });
  };

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFileObjects = Array.from(fileList).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFilesWithPreviews((prevFiles) => {
      // Combine the current files with the new files
      const combinedFiles = [...prevFiles, ...newFileObjects];

      // If the total number of files exceeds the maximum, trim the array
      const updatedFiles =
        combinedFiles.length > MAX_IMAGES
          ? combinedFiles.slice(0, MAX_IMAGES)
          : combinedFiles;

      // Update Formik's photos field with the new list of files
      formik.setFieldValue("photos", updatedFiles);
      return updatedFiles;
    });
  };

  const handleFileDeletion = useCallback(
    (fileToDelete: FileWithPreview) => {
      // Remove the file from filesWithPreviews state
      const updatedFilesWithPreviews = filesWithPreviews.filter(
        (file) => file.previewUrl !== fileToDelete.previewUrl,
      );
      setFilesWithPreviews(updatedFilesWithPreviews);

      // Update Formik's photos field value
      const updatedFileList = updatedFilesWithPreviews.map((f) => f.file);
      formik.setFieldValue("photos", updatedFileList);
    },
    [filesWithPreviews, formik],
  );

  const steps = [
    {
      hidden: false,
      hasError: stepErrors.includes("Description".toLowerCase()),
      title: "Description",
      content: (
        <div className="form-section">
          {/* Section 1: Property Information */}
          <div className="form-fields">
            {/* Property Name */}
            <FormField
              error={{
                msg: formik.errors.title,
                touched: !!formik.touched.title,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="title"
                label="Property name"
              />
              <FormInput
                required
                type="text"
                name="title"
                className="form-input"
                value={formik.values.title}
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                placeholder="Enter property name/title"
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* Property Address */}
            <FormField
              error={{
                msg: formik.errors.address,
                touched: !!formik.touched.address,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="address"
                label="Property address"
              />
              <FormInput
                required
                type="text"
                name="address"
                className="form-input"
                value={formik.values.address}
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                placeholder="Enter property address"
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* managedBy */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.managedBy,
                touched: formik.touched.managedBy,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="managedBy"
                label="Managed by:"
              />
              <Select
                value={formik.values.managedBy}
                name="managedBy"
                placeholder="Managed by"
                className="form-input_select"
                onChange={(name, value) => {
                  formik.setFieldTouched(name);
                  formik.setFieldValue(name, value);
                }}
                options={[{ label: user?.fullname || "", value: user?.id }]}
              />
            </FormField>

            {/* Building Type */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.propertyType,
                touched: !!formik.touched.propertyType,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="propertyType"
                label="Building type"
              />
              <Select
                value={formik.values.propertyType}
                name="propertyType"
                placeholder="Building type"
                className="form-input_select"
                onChange={(name, value) => {
                  formik.setFieldTouched(name);
                  formik.setFieldValue(name, value);
                }}
                options={[
                  { label: "Family home", value: "singleFamily" },
                  { label: "Mixed units", value: "multiUnits" },
                  { label: "Office units", value: "officeUnits" },
                  {
                    label: "Apartments",
                    value: "apartments",
                  },
                  { label: "Others", value: "others" },
                ]}
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* Property Category */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.category,
                touched: !!formik.touched.category,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="category"
                label="Property category"
              />
              <Select
                value={formik.values.category}
                name="category"
                placeholder="Property category"
                className="form-input_select"
                onChange={(name, value) => {
                  formik.setFieldTouched(name);
                  formik.setFieldValue(name, value);
                }}
                options={[
                  { label: "Residential", value: "residential" },
                  { label: "Commercial", value: "commercial" },
                  { label: "Other", value: "other" },
                ]}
              />
            </FormField>

            {/* Property Status */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.status,
                touched: !!formik.touched.status,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="status"
                label="Occupancy status"
              />
              <Select
                value={formik.values.status}
                name="status"
                placeholder="Select status"
                className="form-input_select"
                onChange={(name, value) => {
                  formik.setFieldTouched(name);
                  formik.setFieldValue(name, value);
                }}
                options={[
                  { label: "Vacant", value: "vacant" },
                  { label: "Occupied", value: "occupied" },
                  { label: "Unavailable", value: "unavailable" },
                ]}
              />
            </FormField>
          </div>

          <div className="form-fields">
            <FormField
              error={{
                msg: formik.errors.description,
                touched: !!formik.touched.description,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="description"
                label="Property description"
              />
              <TextEditor
                value={formik.values.description?.html}
                onChange={(content: any, _, __, editor: any) => {
                  formik.setFieldValue("description.html", content);
                  formik.setFieldValue("description.text", editor.getText());
                }}
                placeholder="Enter property description"
                disabled={formik.isSubmitting}
              />
            </FormField>
          </div>
        </div>
      ),
    },

    {
      hidden: false,
      title: "Features",
      hasError: stepErrors.includes("Features".toLowerCase()),
      content: (
        <div className="form-section">
          {/* Section 2: Property Features */}
          <div className="form-fields">
            {/* Number of Floors */}
            <FormField
              error={{
                msg: formik.errors.features?.floors,
                touched: !!formik.touched.features?.floors,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="features.floors"
                label="Levels"
              />
              <FormInput
                required
                type="number"
                name="features.floors"
                className="form-input"
                onChange={formik.handleChange}
                disabled={
                  formik.isSubmitting ||
                  formik.values.propertyType !== "singleFamily"
                }
                placeholder="Building floors"
                value={formik.values.features.floors}
              />
            </FormField>

            {/* Total Bedrooms */}
            <FormField
              error={{
                msg: formik.errors.features?.bedroom,
                touched: formik.touched.features?.bedroom,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="features.bedroom"
                label="Total bedrooms"
              />
              <FormInput
                required={false}
                type="number"
                name="features.bedroom"
                className="form-input"
                onChange={formik.handleChange}
                disabled={
                  formik.isSubmitting ||
                  formik.values.propertyType !== "singleFamily"
                }
                placeholder="Total bedrooms"
                value={formik.values.features.bedroom}
              />
            </FormField>

            {/* Total Bathrooms */}
            <FormField
              error={{
                msg: formik.errors.features?.bathroom,
                touched: formik.touched.features?.bathroom,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="features.bathroom"
                label="Total bathrooms"
              />
              <FormInput
                type="number"
                required={false}
                className="form-input"
                name="features.bathroom"
                onChange={formik.handleChange}
                disabled={
                  formik.isSubmitting ||
                  formik.values.propertyType !== "singleFamily"
                }
                placeholder="Total bathrooms"
                value={formik.values.features.bathroom}
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* Building Capacity */}
            <FormField
              error={{
                msg: formik.errors.features?.maxCapacity,
                touched: !!formik.touched.features?.maxCapacity,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="features.maxCapacity"
                label="Building capacity"
              />
              <FormInput
                required
                type="number"
                name="features.maxCapacity"
                className="form-input"
                onChange={formik.handleChange}
                value={formik.values.features.maxCapacity}
                disabled={
                  formik.isSubmitting ||
                  formik.values.propertyType !== "singleFamily"
                }
              />
            </FormField>

            {/* Total Living Space */}
            <FormField
              error={{
                msg: formik.errors.propertySize,
                touched: !!formik.touched.propertySize,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="propertySize"
                label="Total living space (sqm)"
              />
              <FormInput
                required
                type="number"
                name="propertySize"
                className="form-input"
                onChange={formik.handleChange}
                disabled={formik.isSubmitting}
                value={formik.values.propertySize}
              />
            </FormField>

            {/* Total Apartment Units */}
            <FormField
              error={{
                msg: formik.errors.totalUnits,
                touched: !!formik.touched.totalUnits,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="totalUnits"
                label="Total apartment units"
              />
              <FormInput
                required={formik.values.propertyType !== "singleFamily"}
                type="number"
                name="totalUnits"
                className="form-input"
                onChange={formik.handleChange}
                value={
                  formik.values.propertyType !== "singleFamily"
                    ? formik.values.totalUnits
                    : 0
                }
                disabled={
                  formik.isSubmitting ||
                  formik.values.propertyType == "singleFamily"
                }
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* Available Parking */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.extras?.has_parking,
                touched: formik.touched.extras?.has_parking,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="extras.has_parking"
                label="Parking available"
              />
              <Toggle
                onChange={(e) => {
                  formik.setFieldTouched("extras.has_parking");
                  formik.setFieldValue("extras.has_parking", e);
                }}
                initialState={formik.values.extras.has_parking}
              />
            </FormField>

            <FormField
              error={{
                msg: formik.errors.features?.availableParking,
                touched: !!formik.touched.features?.availableParking,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="features.availableParking"
                label="Vehicle parking"
              />
              <FormInput
                required
                type="number"
                className="form-input"
                onChange={formik.handleChange}
                name="features.availableParking"
                disabled={
                  formik.isSubmitting || !formik.values.extras.has_parking
                }
                value={
                  formik.values.extras.has_parking
                    ? formik.values.features.availableParking
                    : 0
                }
              />
            </FormField>
          </div>
        </div>
      ),
    },

    {
      hidden: false,
      title: "Financial",
      hasError: stepErrors.includes("Financial".toLowerCase()),
      content: (
        <div className="form-section">
          {/* Section 3: Finances */}
          <div className="form-fields">
            {/* Rental Fee */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.fees?.rentalAmount,
                touched: formik.touched.fees?.rentalAmount,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="fees.rentalAmount"
                label="Rental fee"
              />
              <FormInput
                required={false}
                type="number"
                name="fees.rentalAmount"
                className="form-input"
                onChange={formik.handleChange}
                value={formik.values.fees.rentalAmount}
                disabled={formik.isSubmitting}
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* Management Fees */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.fees?.managementFees,
                touched: formik.touched.fees?.managementFees,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="fees.managementFees"
                label="Management fees"
              />
              <FormInput
                required={false}
                type="number"
                name="fees.managementFees"
                className="form-input"
                onChange={formik.handleChange}
                value={formik.values.fees.managementFees}
                disabled={formik.isSubmitting}
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* Currency */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.fees?.currency,
                touched: formik.touched.fees?.currency,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="fees.currency"
                label="Currency"
              />
              <Select
                value={formik.values.fees.currency}
                name="fees.currency"
                placeholder="Select currency"
                className="form-input_select"
                onChange={(name, value) => {
                  formik.setFieldTouched(name);
                  formik.setFieldValue(name, value);
                }}
                options={[
                  { label: "USD", value: "usd" },
                  { label: "GBN", value: "gbn" },
                  { label: "Euro", value: "euro" },
                ]}
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* Include Tax */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.fees?.includeTax,
                touched: formik.touched.fees?.includeTax,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="fees.includeTax"
                label="Include Tax/VAT"
              />
              <Toggle
                onChange={(e) => {
                  formik.setFieldTouched("fees.includeTax");
                  formik.setFieldValue("fees.includeTax", e);
                }}
                initialState={formik.values.fees.includeTax}
              />
            </FormField>
          </div>

          <div className="form-fields">
            {/* Tax Percent */}
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.fees?.taxAmount,
                touched: formik.touched.fees?.taxAmount,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="fees.taxAmount"
                label="Tax percent"
              />
              <FormInput
                required={false}
                type="number"
                name="fees.taxAmount"
                className="form-input"
                onChange={formik.handleChange}
                value={formik.values.fees.taxAmount}
                disabled={formik.isSubmitting || !formik.values.fees.includeTax}
              />
            </FormField>
          </div>
        </div>
      ),
    },

    {
      hidden: false,
      title: "Amenities",
      hasError: stepErrors.includes("Amenities".toLowerCase()),
      content: (
        <div className="form-section">
          {/* Section 4: Amenities */}
          <div className="form-fields">
            <DynamicList
              items={convertToLabeledArray(formik.values.extras)}
              listMode="single"
            />
          </div>
        </div>
      ),
    },

    {
      hidden: false,
      title: "Gallery",
      hasError: stepErrors.includes("Gallery".toLowerCase()),
      content: (
        <div className="form-section">
          <div className="form-fields">
            <FormField
              className="form-field_inline"
              error={{
                msg: formik.errors.photos,
                touched: !!formik.touched.photos,
              }}
            >
              <FormLabel
                className="form-label"
                htmlFor="photos"
                label="Property images"
              />
              <FileInput
                id="file-input"
                name="photos"
                onChange={handleFilesSelected}
                multiple
                disabled={filesWithPreviews.length === MAX_IMAGES}
                accept="image/*"
              />
            </FormField>
          </div>

          <ImageGallery
            maxImages={MAX_IMAGES}
            initialImages={filesWithPreviews}
            onFileDelete={handleFileDeletion}
          />
        </div>
      ),
    },
  ];

  const customFooter = ({
    isLastStep,
    isFirstStep,
    nextStep,
    prevStep,
  }: {
    isLastStep: any;
    isFirstStep: any;
    nextStep: any;
    prevStep: any;
  }) => {
    return (
      <div className="steps-action">
        {!isFirstStep && (
          <Button
            label="Back"
            onClick={prevStep}
            disabled={formik.isSubmitting}
            className="btn btn-outline-ghost btn-md"
          />
        )}
        {!isLastStep && (
          <Button
            label="Next"
            onClick={nextStep}
            disabled={formik.isSubmitting}
            className="btn btn-outline btn-md"
          />
        )}
        {isLastStep && (
          <Button
            type="submit"
            className="btn btn-outline btn-md"
            disabled={formik.isSubmitting || stepErrors.length > 0}
            label={formik.isSubmitting ? "Processing...." : "Submit"}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <ContentHeader showBtn={false} pageTitle="Add Property" />
      <div className="add-property">
        <div className="add-property_content">
          <Form
            encType="multipart/form-data"
            id="add-property-form"
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <MultiStepWrapper
              steps={steps}
              displayStepsBar
              customFooter={customFooter}
            />
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddProperty;
