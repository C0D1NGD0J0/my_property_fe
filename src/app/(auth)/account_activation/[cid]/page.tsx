"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { useFormik, FormikValues, FormikHelpers } from "formik";
import Link from "next/link";

// import Loading from "../../signup/loading";
import authService from "@services/auth";
import FormField from "@components/ui/FormElements/FormField";
import FormInput from "@components/ui/FormElements/FormInput";
import FormLabel from "@components/ui/FormElements/FormLabel";

export default function Signup() {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (
    values: FormikValues,
    help: FormikHelpers<{ accountCode: string }>,
  ) => {
    try {
      const fd = new FormData();
      for (let key in values) {
        if (values.hasOwnProperty(key)) {
          if (key === "accountType") {
            fd.append(key, JSON.stringify(values[key]));
          } else {
            fd.append(key, values[key]);
          }
        }
      }

      const res = await authService.signup(fd);
    } catch (ers) {
      console.log(help);
    }
    // setCookie('signUpStep', 2, {path: '/'});
  };

  const formik = useFormik({
    initialValues: { accountCode: "" },
    onSubmit: handleSubmit,
    validate: async (val) => {
      // const res = await authValidation.accountToken(val);
      // return res.isValid ? {} : res.errors;
    },
  });

  return (
    <>
      <div className="auth-page_content-header">
        <h2>Enter account verification code.</h2>
        <small>check your inbox.</small>
        <br />
      </div>

      <div className="auth-page_content-body">
        <form
          autoComplete="false"
          className="auth-form"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-fields">
            <FormField
              error={{
                msg: formik.errors.accountCode,
                touched: !!formik.touched.accountCode,
              }}
            >
              <FormInput
                required
                type="text"
                name="accountCode"
                className="form-input"
                onChange={(e) => {
                  formik.setFieldTouched("accountCode");
                  formik.handleChange(e);
                }}
                value={formik.values.accountCode}
              />
              <FormLabel
                className="form-label"
                htmlFor="accountCode"
                label="Account verification code"
              />
            </FormField>
          </div>
          <div className="auth-page_content-footer">
            <Button
              type="primary"
              htmlType="submit"
              disabled={formik.isSubmitting || !formik.values.accountCode}
            >
              Confirm Account
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
