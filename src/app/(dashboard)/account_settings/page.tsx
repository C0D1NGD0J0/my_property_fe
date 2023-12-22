"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormikValues, useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import userService from "@services/user";
import { Loading, Alert } from "@components/UI";
import { useAuthStore } from "@store/auth.store";
import { useNotification } from "@hooks/useNotification";
import { ContentHeader } from "@components/PageHeader";
import userValidation from "@validations/user.validation";
import {
  Form,
  Select as SelectField,
  FormField,
  FormInput,
  FormLabel,
  Checkbox,
} from "@components/FormElements";
import { DatePicker } from "antd";
import { objectToFormData } from "@utils/helperFN";
import dayjs from "dayjs";

const ClientSettings = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore((state) => state);
  const { openNotification } = useNotification();
  const { data, isSuccess } = useQuery({
    queryKey: ["clientDetails", { id: user?.id }],
    queryFn: async () =>
      await userService.getClientAccountInfo(user?.cid || ""),
    enabled: !!user?.cid,
  });

  useEffect(() => {
    if (isLoggedIn && user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, []);

  const clientInfo = data?.data.clientInfo;

  const mutation = useMutation({
    mutationFn: async ({
      cid,
      formData,
    }: {
      cid: string;
      formData: FormData;
    }) => {
      return await userService.updateClientInfo(cid, formData);
    },
    onSuccess(data) {
      queryClient.setQueryData(
        ["clientDetails", { id: user?.id }],
        data.clientInfo,
      );
    },
  });

  const handleSubmit = async (values: FormikValues) => {
    try {
      const res = await mutation.mutateAsync({
        cid: user?.cid || "",
        formData: objectToFormData(values),
      });

      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["clientDetails", { id: user?.id }],
        });
      }
    } catch (e: unknown) {
      const err = e as Error & { data: any };
      console.log(err);
      return openNotification("error", "Update error", err.data);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      contactInfo: {
        email: clientInfo?.enterpriseProfile.contactInfo?.email || "",
        address: clientInfo?.enterpriseProfile.contactInfo?.address || "",
        phoneNumber:
          clientInfo?.enterpriseProfile.contactInfo?.phoneNumber || "",
        contactPerson:
          clientInfo?.enterpriseProfile.contactInfo?.contactPerson || "",
      },
      companyName: clientInfo?.enterpriseProfile.companyName || "",
      legalEntityName: clientInfo?.enterpriseProfile.legalEntityName || "",
      identification: {
        idType: clientInfo?.enterpriseProfile.identification?.idType || "",
        idNumber: clientInfo?.enterpriseProfile.identification?.idNumber || "",
        authority:
          clientInfo?.enterpriseProfile.identification?.authority || "",
        issueDate:
          clientInfo?.enterpriseProfile.identification?.issueDate || "",
        expiryDate:
          clientInfo?.enterpriseProfile.identification?.expiryDate || "",
        issuingState:
          clientInfo?.enterpriseProfile.identification?.issuingState || "",
      },
      businessRegistrationNumber:
        clientInfo?.enterpriseProfile.businessRegistrationNumber || "",
    },
    validate: async (val) => {
      const res = await userValidation.editClient(val);
      return res.isValid ? {} : res.errors;
    },
    enableReinitialize: true,
  });

  if (!isSuccess) {
    return <Loading description="Loading user data..." />;
  }

  return (
    <>
      <ContentHeader showBtn={false} pageTitle="Client Settings" />

      <section className="setting-page">
        <div className="setting-page_content">
          {!clientInfo?.enterpriseProfile ? (
            <Alert
              duration={5000}
              type="error"
              message="Please provide missing details."
            />
          ) : null}

          <Form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Business details</h2>
                <hr className="titleBar-sm" />
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.legalEntityName,
                    touched: !!formik.touched.legalEntityName,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="legalEntityName"
                    label="Legal business name"
                  />
                  <FormInput
                    required={clientInfo?.accountType?.isEnterpriseAccount}
                    disabled={formik.isSubmitting}
                    type="text"
                    name="legalEntityName"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("legalEntityName");
                      formik.handleChange(e);
                    }}
                    value={formik.values.legalEntityName}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: formik.errors.companyName,
                    touched: !!formik.touched.companyName,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="companyName"
                    label="Company name"
                  />
                  <FormInput
                    required={clientInfo?.accountType?.isEnterpriseAccount}
                    disabled={formik.isSubmitting}
                    type="text"
                    name="companyName"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("companyName");
                      formik.handleChange(e);
                    }}
                    value={formik.values.companyName}
                  />
                </FormField>
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.businessRegistrationNumber,
                    touched: !!formik.touched.businessRegistrationNumber,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="businessRegistrationNumber"
                    label="Business registration number"
                  />
                  <FormInput
                    required={clientInfo?.accountType?.isEnterpriseAccount}
                    disabled={formik.isSubmitting}
                    type="text"
                    name="businessRegistrationNumber"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("businessRegistrationNumber");
                      formik.handleChange(e);
                    }}
                    value={formik.values.businessRegistrationNumber}
                  />
                </FormField>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Identification</h2>
                <hr className="titleBar-sm" />
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.identification?.idType,
                    touched: !!formik.touched.identification?.idType,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="identification-idType"
                    label="ID type"
                  />
                  <SelectField
                    value={formik.values.identification?.idType}
                    name="identification.idType"
                    placeholder="Select ID type"
                    className="form-input_select"
                    onChange={(name: string, value: any) => {
                      formik.setFieldTouched(name);
                      formik.setFieldValue(name, value);
                    }}
                    options={[
                      { label: "Passport", value: "passport" },
                      { label: "Drivers license", value: "drivers-license" },
                      {
                        value: "business-license",
                        label: "Business license",
                      },
                    ]}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: formik.errors.identification?.idNumber,
                    touched: !!formik.touched.identification?.idNumber,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="identification?.idNumber"
                    label="ID number"
                  />
                  <FormInput
                    required
                    disabled={formik.isSubmitting}
                    type="text"
                    placeholder="Enter ID number"
                    name="identification.idNumber"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("identification.idNumber");
                      formik.handleChange(e);
                    }}
                    value={formik.values.identification?.idNumber}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: formik.errors.identification?.authority,
                    touched: !!formik.touched.identification?.authority,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="identification?.authority"
                    label="Issuing authroity"
                  />
                  <FormInput
                    required
                    disabled={formik.isSubmitting}
                    type="text"
                    placeholder="Enter issuing department"
                    name="identification.authority"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("identification.authority");
                      formik.handleChange(e);
                    }}
                    value={formik.values.identification?.authority}
                  />
                </FormField>
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.identification?.issueDate,
                    touched: !!formik.touched.identification?.issueDate,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="identification-issueDate"
                    label="Issue date"
                  />
                  <DatePicker
                    className="form-input"
                    value={dayjs(formik.values.identification?.issueDate)}
                    name="identification.issueDate"
                    onChange={(dateObj, dateString) => {
                      formik.setFieldTouched(
                        formik.values.identification.issueDate,
                      );
                      formik.setFieldValue(
                        "identification.issueDate",
                        dateObj?.toJSON(),
                      );
                    }}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: formik.errors.identification?.issuingState,
                    touched: !!formik.touched.identification?.issuingState,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="identification?.issuingState"
                    label="Issue State"
                  />
                  <FormInput
                    required
                    disabled={formik.isSubmitting}
                    type="text"
                    placeholder="Enter issue state"
                    name="identification.issuingState"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("identification.issuingState");
                      formik.handleChange(e);
                    }}
                    value={formik.values.identification.issuingState}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: formik.errors.identification?.expiryDate,
                    touched: !!formik.touched.identification?.expiryDate,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="identification-expiryDate"
                    label="Issue date"
                  />
                  <DatePicker
                    className="form-input"
                    value={dayjs(formik.values.identification?.expiryDate)}
                    placeholder="Enter expiry date"
                    name="identification.expiryDate"
                    onChange={(dateObj, dateString) => {
                      formik.setFieldTouched(
                        formik.values.identification.expiryDate,
                      );
                      formik.setFieldValue(
                        "identification.expiryDate",
                        dateObj?.toJSON(),
                      );
                    }}
                  />
                </FormField>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section_header">
                <h2 className="title">Contact details</h2>
                <hr className="titleBar-sm" />
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.contactInfo?.contactPerson,
                    touched: !!formik.touched.contactInfo?.contactPerson,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="contactInfo.contactPerson"
                    label="Fullname"
                  />
                  <FormInput
                    required={clientInfo?.accountType?.isEnterpriseAccount}
                    disabled={formik.isSubmitting}
                    type="text"
                    name="contactInfo.contactPerson"
                    placeholder="Enter company contact fullname"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("contactInfo.contactPerson");
                      formik.handleChange(e);
                    }}
                    value={formik.values.contactInfo.contactPerson}
                  />
                </FormField>

                <FormField
                  error={{
                    msg: formik.errors.contactInfo?.phoneNumber,
                    touched: !!formik.touched.contactInfo?.phoneNumber,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="contactInfo-phoneNumber"
                    label="Phone number"
                  />
                  <FormInput
                    required={clientInfo?.accountType?.isEnterpriseAccount}
                    disabled={formik.isSubmitting}
                    type="text"
                    name="contactInfo.phoneNumber"
                    placeholder="Enter phone number"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("contactInfo.phoneNumber");
                      formik.handleChange(e);
                    }}
                    value={formik.values.contactInfo.phoneNumber}
                  />
                </FormField>
              </div>
              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.contactInfo?.address,
                    touched: !!formik.touched.contactInfo?.address,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="contactInfo-address"
                    label="Business address"
                  />
                  <FormInput
                    disabled={formik.isSubmitting}
                    type="text"
                    name="contactInfo.address"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("contactInfo.address");
                      formik.handleChange(e);
                    }}
                    value={formik.values.contactInfo?.address}
                  />
                </FormField>
              </div>

              <div className="form-fields">
                <FormField
                  error={{
                    msg: formik.errors.contactInfo?.email,
                    touched: !!formik.touched.contactInfo?.email,
                  }}
                >
                  <FormLabel
                    className="form-label"
                    htmlFor="contactInfo.email"
                    label="Business email"
                  />
                  <FormInput
                    required={clientInfo?.accountType?.isEnterpriseAccount}
                    disabled={formik.isSubmitting}
                    type="email"
                    name="contactInfo.email"
                    className="form-input"
                    onChange={(e) => {
                      formik.setFieldTouched("contactInfo.email");
                      formik.handleChange(e);
                    }}
                    value={formik.values.contactInfo.email}
                  />
                </FormField>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn" type="reset">
                Cancel
              </button>
              <button className="btn btn-outline" type="submit">
                {formik.isSubmitting ? "processing...." : "Submit"}
              </button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default ClientSettings;
