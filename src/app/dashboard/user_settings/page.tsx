"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { FormikValues, useFormik } from "formik";

import userService from "@services/user";
import Form from "@components/FormElements/Form";
import { useNotification } from "@hooks/notification";
import { ContentHeader } from "@components/PageHeader";
import {
  Select as SelectField,
  FormField,
  FormInput,
  FormLabel,
  Checkbox,
} from "@components/FormElements";
import { stripeSupportedCountries } from "@utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@components/ui/Loading";
import userValidation from "@validations/user.validation";
import { IEditUser } from "@interfaces/user.interface";
import { useAuthStore } from "@store/auth.store";

const UserSettings = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user!);
  const [isEditMode, setEditMode] = useState(true);
  const { openNotification } = useNotification();
  const { data, isLoading } = useQuery({
    queryKey: ["userDetails", { id: user?.id }],
    queryFn: async () => await userService.getUserAccountInfo(user.cid),
    enabled: !!user,
  });
  const mutation = useMutation({
    mutationFn: async ({
      cid,
      formData,
    }: {
      cid: string;
      formData: IEditUser;
    }) => {
      return await userService.updateUserInfo(cid, formData);
    },
  });

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await mutation.mutateAsync({
        cid: user.cid,
        formData: values as IEditUser,
      });

      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["userDetails", { id: user.id }],
        });
        queryClient.invalidateQueries({
          queryKey: ["currentuser"],
        });
      }
    } catch (e: any) {
      return openNotification("error", "Update error", e.data);
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
      password: data?.data.password || "",
      companyName: data?.data.companyName || "",
      newPassword: "",
      notifications: {
        sms: !!data?.data?.notifications?.sms,
        email: !!data?.data?.notifications?.email,
      },
    },
    validate: async (val) => {
      const res = await userValidation.editUser(val);
      return res.isValid ? {} : res.errors;
    },
    enableReinitialize: true,
  });

  if (isLoading) {
    return <Loading description="Loading user data..." />;
  }

  return (
    <>
      <ContentHeader
        showBtn={true}
        pageTitle="User Settings"
        btnConfig={{
          onClick: () => setEditMode(!isEditMode),
          label: `${isEditMode ? "Disable edit mode" : "Enable edit mode"}`,
          icon: <i className="bx bx-pencil"></i>,
          className: "btn-outline-warning",
        }}
      />

      <section className="setting-page">
        <div className="setting-page_content">
          {formik.isSubmitting ? (
            <Loading description="Updating your information..." />
          ) : (
            <Form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
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
                      disabled={formik.isSubmitting || !isEditMode}
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
                      disabled={formik.isSubmitting || !isEditMode}
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
                      disabled={formik.isSubmitting || !isEditMode}
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
                      disabled={formik.isSubmitting || !isEditMode}
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
                    <Checkbox
                      label="Email"
                      checked={formik.values.notifications.email}
                      name="notifications.email"
                      onChange={(e) => {
                        formik.setFieldTouched("notifications.email");
                        formik.handleChange(e);
                      }}
                    />
                  </div>

                  <div className="form-field">
                    <Checkbox
                      label="SMS"
                      checked={formik.values.notifications.sms}
                      name="notifications.sms"
                      onChange={(e) => {
                        formik.setFieldTouched("notifications.sms");
                        formik.handleChange(e);
                      }}
                    />
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
                      msg: formik.errors.password,
                      touched: !!formik.touched.password,
                    }}
                  >
                    <FormLabel
                      className="form-label"
                      htmlFor="password"
                      label="Current password"
                    />
                    <FormInput
                      required
                      disabled={formik.isSubmitting || !isEditMode}
                      type="password"
                      name="password"
                      placeholder="Password required to updated your info."
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
                      msg: formik.errors.newPassword,
                      touched: !!formik.touched.newPassword,
                    }}
                  >
                    <FormLabel
                      className="form-label"
                      htmlFor="newPassword"
                      label="New password"
                    />
                    <FormInput
                      required={data?.data.email !== formik.values.email}
                      disabled={formik.isSubmitting || !isEditMode}
                      type="password"
                      name="newPassword"
                      placeholder="Leave blank, unless you want to update password"
                      className="form-input"
                      onChange={(e) => {
                        formik.setFieldTouched("newPassword");
                        formik.handleChange(e);
                      }}
                      value={formik.values.newPassword}
                    />
                  </FormField>
                </div>
              </div>

              {isEditMode ? (
                <div className="form-actions">
                  <button className="btn" type="reset">
                    Cancel
                  </button>
                  <button className="btn btn-outline" type="submit">
                    Submit
                  </button>
                </div>
              ) : null}
            </Form>
          )}
        </div>
      </section>
    </>
  );
};

export default UserSettings;
