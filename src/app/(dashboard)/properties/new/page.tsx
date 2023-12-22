"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormikValues, useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Loading, Alert } from "@components/UI";
import { useAuthStore } from "@store/auth.store";
import { useNotification } from "@hooks/useNotification";
import { ContentHeader } from "@components/PageHeader";
import {
  Form,
  Select,
  FormField,
  FormInput,
  FormLabel,
} from "@components/FormElements";
import { DatePicker } from "antd";
import { objectToFormData } from "@utils/helperFN";
import dayjs from "dayjs";
import { IProperty } from "@interfaces/property.interface";

const initialValues: IProperty = {
  title: "",
  description: "",
  propertyType: "",
  status: "vacant",
  managedBy: "",
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
  category: "residential",
  address: "",
  managementFees: {
    amount: 0,
    currency: "USD",
  },
  photos: [],
  totalUnits: 0,
};

const AddProperty = () => {
  const { user, isLoggedIn } = useAuthStore((state) => state);
  const { openNotification } = useNotification();

  const handleSubmit = async () => {
    return "";
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: initialValues,
    validate: async (values) => {
      // const res = await propertyValidation.newProperty(values);
      // return res.isValid ? {} : res.errors;
      return {}; // Return an empty object for now
    },
  });

  return (
    <>
      <ContentHeader showBtn={false} pageTitle="Add Property" />
      <div className="add-property-page">
        <Form
          className="form add-property"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <div className="form-section">
            <div className="form-section_header">
              <h2 className="title">Property details</h2>
              <hr className="titleBar-sm" />
            </div>

            <div className="form-fields">
              <FormField
                error={{
                  msg: "",
                  touched: false,
                }}
              >
                <FormLabel
                  className="form-label"
                  htmlFor="title"
                  label="Title"
                />
                <FormInput
                  required={false}
                  type="text"
                  name="Property Title"
                  className="form-input"
                  onChange={(e) => {
                    formik.setFieldTouched("legalEntityName");
                    formik.handleChange(e);
                  }}
                  value={formik.values.title}
                  disabled={formik.isSubmitting}
                />
              </FormField>
            </div>
            <div className="form-fields">
              <FormField
                error={{
                  msg: "",
                  touched: false,
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
                  onChange={(e) => {
                    formik.setFieldTouched("address");
                    formik.handleChange(e);
                  }}
                  value={formik.values.address}
                  disabled={formik.isSubmitting}
                />
              </FormField>
            </div>
            <div className="form-fields">
              <FormField
                error={{
                  msg: "",
                  touched: false,
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
                  onChange={(name: string, value: any) => {
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

              <FormField
                error={{
                  msg: "",
                  touched: false,
                }}
              >
                <FormLabel
                  className="form-label"
                  htmlFor="category"
                  label="Property type"
                />
                <Select
                  value={formik.values.category}
                  name="category"
                  placeholder="Select property type"
                  className="form-input_select"
                  onChange={(name: string, value: any) => {
                    formik.setFieldTouched(name);
                    formik.setFieldValue(name, value);
                  }}
                  options={[
                    { label: "residential", value: "residential" },
                    { label: "commercial", value: "commercial" },
                    { label: "other", value: "other" },
                  ]}
                />
              </FormField>
            </div>
            <div className="form-fields">
              <FormField
                error={{
                  msg: "",
                  touched: false,
                }}
              >
                <FormLabel
                  className="form-label"
                  htmlFor="propertyType"
                  label="Property type"
                />
                <Select
                  value={formik.values.propertyType}
                  name="propertyType"
                  placeholder="Select property type"
                  className="form-input_select"
                  onChange={(name: string, value: any) => {
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

              <FormField
                error={{
                  msg: "",
                  touched: false,
                }}
              >
                <FormLabel
                  className="form-label"
                  htmlFor="status"
                  label="Status"
                />
                <Select
                  value={formik.values.propertyType}
                  name="status"
                  placeholder="Select status"
                  className="form-input_select"
                  onChange={(name: string, value: any) => {
                    formik.setFieldTouched(name);
                    formik.setFieldValue(name, value);
                  }}
                  options={[
                    { label: "vacant", value: "vacant" },
                    { label: "occupied", value: "occupied" },
                    { label: "unavailable", value: "unavailable" },
                  ]}
                />
              </FormField>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProperty;
