"use client";
import React, { useEffect } from "react";
import { FormikValues, useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  Select,
  FormField,
  FormInput,
  FormLabel,
  Button,
  Toggle,
} from "@components/FormElements";
import DynamicList from "@components/UI/List";
import { IProperty } from "@interfaces/property.interface";
import { MultiStepWrapper } from "@components/UI";
import { Loading, Alert } from "@components/UI";
import { useAuthStore } from "@store/auth.store";
import { useNotification } from "@hooks/useNotification";
import { ContentHeader } from "@components/PageHeader";
import TextEditor from "@components/TextEditor";
import PropertyValidation from "@validations/property.validation";
import propertyService from "@services/property";
import { formatErrors, objectToFormData } from "@utils/helperFN";

const initialValues: IProperty = {
  title: "Beautiful Family Home",
  description: {
    text: "A spacious and modern family home located in a serene neighborhood.",
    html: "",
  },
  propertyType: "singleFamily",
  status: "vacant",
  managedBy: "",
  propertySize: 3500,
  features: {
    floors: 2,
    bedroom: 5,
    bathroom: 3,
    maxCapacity: 10,
    availableParking: 4,
  },
  extras: {
    has_tv: true,
    has_kitchen: true,
    has_ac: true,
    has_heating: true,
    has_internet: true,
    has_gym: false,
    has_parking: true,
    has_swimmingpool: true,
    has_laundry: true,
    petsAllowed: true,
  },
  category: "residential",
  address: "1234 Maple Street, Anytown, USA",
  fees: {
    includeTax: true,
    taxAmount: 7.5,
    rentalAmount: 2500.0,
    managementFees: 150.0,
    currency: "USD",
  },
  photos: [],
  totalUnits: 0,
};
const propertyValidation = new PropertyValidation();

const AddProperty = () => {
  const { user, isLoggedIn } = useAuthStore((state) => state);
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
    onSuccess(data) {
      console.log(data, "----onSuccess-----");
      // queryClient.setQueryData(
      //   ["newProperty", { id: data?.id }],
      //   data.clientInfo,
      // );
    },
  });

  const handleSubmit = async (values: FormikValues) => {
    try {
      console.log(values, "------REzzz-----");
      const res = await mutation.mutateAsync({
        cid: user?.cid || "",
        formData: objectToFormData(values),
      });

      console.log(res, "------RES-----");
      // if (res.success) {
      //   queryClient.invalidateQueries({
      //     queryKey: ["clientDetails", { id: user?.id }],
      //   });
      // }
    } catch (e: unknown) {
      const err = e as Error & { data: any };
      console.log(err, "-----ERR-----");
      return openNotification("error", "Error", err.data);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: initialValues,
    validate: async (values) => {
      const res = propertyValidation.newProperty(values);
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

  const steps = [
    {
      hidden: false,
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
                onChange={formik.handleChange}
                value={formik.values.title}
                disabled={formik.isSubmitting}
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
                onChange={formik.handleChange}
                value={formik.values.address}
                disabled={formik.isSubmitting}
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
                placeholder="Select property type"
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
                placeholder="Select property category"
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
                value={formik.values.features.floors}
                disabled={formik.isSubmitting}
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
                value={formik.values.features.bedroom}
                disabled={formik.isSubmitting}
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
                required={false}
                type="number"
                name="features.bathroom"
                className="form-input"
                onChange={formik.handleChange}
                value={formik.values.features.bathroom}
                disabled={formik.isSubmitting}
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
                disabled={formik.isSubmitting}
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
                value={formik.values.totalUnits}
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
                value={formik.values.features.availableParking}
              />
            </FormField>
          </div>
        </div>
      ),
    },

    {
      hidden: false,
      title: "Financial",
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
  }) => (
    <div className="steps-action">
      {!isFirstStep && (
        <Button
          label="Back"
          onClick={prevStep}
          className="btn btn-outline-ghost"
        />
      )}
      {!isLastStep && (
        <Button label="Next" onClick={nextStep} className="btn btn-outline" />
      )}
      {isLastStep && (
        <Button
          type="submit"
          className="btn btn-outline"
          disabled={formik.isSubmitting}
          label={formik.isSubmitting ? "processing...." : "Submit"}
        />
      )}
    </div>
  );

  return (
    <>
      <ContentHeader showBtn={false} pageTitle="Add Property" />
      <div className="add-property">
        <div className="add-property_content">
          <Form
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
