"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { FormikValues, useFormik } from "formik";

import userService from "@services/user";
import CookieManager from "@utils/cookieManager";
import Form from "@components/FormElements/Form";
import { useNotification } from "@hooks/notification";
import { ContentHeader } from "@components/PageHeader";
// import userValidation from "@validations/user.validation";
import {
  Select as SelectField,
  FormField,
  FormInput,
  FormLabel,
  Checkbox,
} from "@components/FormElements";
import { stripeSupportedCountries } from "@utils/constants";
import { useQuery } from "@tanstack/react-query";
import Loading from "@components/ui/Loading";

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  location: "",
  phoneNumber: "",
  password: "",
  companyName: "",
};

const UserSettings = () => {
  const { openNotification } = useNotification();
  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => await userService.getUserEditInfo(),
  });
  const handleSubmit = async (values: FormikValues) => {
    try {
      // to do
    } catch (e: any) {
      return openNotification("error", "Login Error", e.data);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      email: data?.data.email || "",
      firstName: data?.data.firstName || "",
      lastName: data?.data.lastName || "",
      location: data?.data.location || "",
      phoneNumber: data?.data.phoneNumber || "",
      password: data?.data.password || "******",
      companyName: data?.data.companyName || "",
    },
    validate: async (val) => {
      // const res = await userValidation.login(val);
      // return res.isValid ? {} : res.errors;
    },
    enableReinitialize: true,
  });

  if (isLoading) {
    return <Loading description="Loading user data..." />;
  }

  console.log(formik.values);
  return (
    <>
      <ContentHeader showBtn={true} pageTitle="User Settings" />

      <section className="setting-page">
        <div className="setting-page_content">
          <Form className="form">
            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Personal details</h2>
                <hr className="titleBar-sm" />
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.firstName,
                    touched: !!formik.touched.firstName,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="firstName"
                    label="First name"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="text"
                    name="firstName"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("firstName");
                      formik.handleChange(e);
                    }}
                    value={formik.values.firstName}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: formik.errors.lastName,
                    touched: !!formik.touched.lastName,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="lastName"
                    label="Last name"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("lastName");
                      formik.handleChange(e);
                    }}
                    value={formik.values.lastName}
                  />
                </FormField>
              </div>
              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.email,
                    touched: !!formik.touched.email,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="email"
                    label="Email"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="email"
                    name="email"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("email");
                      formik.handleChange(e);
                    }}
                    value={formik.values.email}
                  />
                </FormField>
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.phoneNumber,
                    touched: !!formik.touched.phoneNumber,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="phoneNumber"
                    label="phone"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="text"
                    name="phoneNumber"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("email");
                      formik.handleChange(e);
                    }}
                    value={formik.values.phoneNumber}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: formik.errors.location,
                    touched: !!formik.touched.location,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="location"
                    label="Location"
                  />
                  <SelectField
                    value={formik.values.location}
                    name="location"
                    placeholder="Select your location"
                    className="form-input_dropdown"
                    onChange={(name: string, value: any) => {
                      formik.setFieldTouched(name);
                      formik.setFieldValue(name, value);
                    }}
                    options={stripeSupportedCountries}
                  />
                </FormField>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Notifications</h2>
                <hr className="titleBar-sm" />
              </div>

              <div className="form-fields">
                <div className="form-field">
                  <Checkbox name="emailNotification" label="Email" />
                </div>

                <div className="form-field">
                  <Checkbox name="smsNotifications" label="SMS" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Password management</h2>
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
                    htmlFor="oldPassword"
                    label="Current password"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="password"
                    name="password"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("password");
                      formik.handleChange(e);
                    }}
                    value={formik.values.password}
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
                    htmlFor="newPassword"
                    label="New password"
                  />
                  <FormInput
                    required
                    disabled={false}
                    type="password"
                    name="newPassword"
                    className="form-input"
                    onChange={(e) => {}}
                    value={""}
                  />
                </FormField>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn" type="reset">
                Cancel
              </button>
              <button className="btn btn-outline" type="submit">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default UserSettings;
