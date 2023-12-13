"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Result } from "antd";
import { useFormik, FormikValues } from "formik";
import { useSearchParams, useParams } from "next/navigation";

import authService from "@services/auth";
import { Loading } from "@components/UI";
import { useNotification } from "@hooks/useNotification";
import authValidation from "@validations/auth.validation";
import FormField from "@components/FormElements/FormField";
import FormInput from "@components/FormElements/FormInput";
import FormLabel from "@components/FormElements/FormLabel";
import { IVerificationInitValues } from "@interfaces/user.interface";

export default function AccountActivation() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { openNotification } = useNotification();
  const searchParams = useSearchParams();
  const token = searchParams.get("t");
  const params = useParams();

  useEffect(() => {
    if (token) {
      formik.setFieldValue("accountCode", token);
      setIsLoading(false);
    }
  }, [token]);

  const handleSubmit = async (values: FormikValues) => {
    try {
      const cid = params.cid as string;
      const res = await authService.validateToken(
        cid,
        values as IVerificationInitValues,
      );
      setIsSuccess(true);
      formik.setSubmitting(false);
    } catch (e: unknown) {
      const error = e as Error & { data: any };
      if (
        params.cid &&
        token &&
        (error.data.includes("expired") || error.data.includes("Invalid"))
      ) {
        return openNotification(
          "open",
          "Account verification Error",
          error.data,
          {
            btnText: "Resend activation token email",
            onClose: async () => {
              try {
                await authService.resendActivationLink(
                  params.cid as string,
                  token,
                );
                formik.setSubmitting(false);
              } catch (e) {
                return openNotification(
                  "error",
                  "Activation Error",
                  error.data,
                );
              }
            },
          },
        );
      }

      return openNotification(
        "error",
        "Account verification Error",
        error.data,
      );
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { accountCode: "" },
    validate: async (val) => {
      const res = await authValidation.accountValidationToken(val);
      return res.isValid ? {} : res.errors;
    },
  });

  if (!token) {
    return <Loading description="Broken url..." />;
  }

  return (
    <>
      {isSuccess ? (
        <Result
          status="success"
          title="Contratulation, account has now been activated. Please login to proceed."
          extra={[
            <Button type="primary" key="close">
              <Link href="/login">Login</Link>
            </Button>,
          ]}
        />
      ) : (
        <>
          <div className="auth-page_content-header">
            <h2 className="header-title">Enter account verification code.</h2>
            <hr className="titleBar-sm" />
            <small>check your inbox.</small>
            <br />
          </div>

          <div className="auth-page_content-body">
            <form
              autoComplete="false"
              className="auth-form"
              onSubmit={formik.handleSubmit}
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
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
                      disabled={
                        formik.isSubmitting || !formik.values.accountCode
                      }
                    >
                      Confirm Account
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
}
