"use client";
import React, { useState } from "react";
import { Button, Result } from "antd";
import { useFormik, FormikProps, FormikValues } from "formik";
import Link from "next/link";
import useSWR from "swr";

import authService from "@services/auth";
import { SWR_KEY } from "@utils/constants";
import Loading from "@components/ui/Loading";
import UserInfo from "@app/(auth)/signup/UserInfo";
import { useNotification } from "@hooks/useNotification";
import authValidation from "@validations/auth.validation";
import { IInitialValues } from "@interfaces/user.interface";
import PlanSelection from "@app/(auth)/signup/PlanSelectionStep";

const steps = [
  {
    title: "Account Type",
    content: (props: any) => <PlanSelection {...props} />,
  },
  {
    title: "Account Details",
    content: (props: any) => <UserInfo {...props} />,
  },
];

const initialValues: IInitialValues = {
  email: "",
  firstName: "",
  lastName: "",
  location: "",
  phoneNumber: "",
  password: "",
  cpassword: "",
  companyName: "",
  accountType: null,
};

export default function Signup() {
  const { openNotification } = useNotification();
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { data, error, isLoading } = useSWR(
    SWR_KEY.getSignupPlans,
    authService.getUserPlans,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values: FormikValues) => {
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
      if (res.success) {
        setIsSuccess(true);
        formik.resetForm();
        setCurrentStep(0);
      }
      return;
    } catch (e: any) {
      return openNotification("error", "Signup Error", e.data);
    }
  };

  const renderButton = (
    currentStep: number,
    formik: FormikProps<IInitialValues>,
  ) => {
    return (
      <>
        {currentStep > 0 && (
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => prevStep()}
            disabled={formik.isSubmitting}
          >
            Previous
          </Button>
        )}
        {currentStep == 1 && formik.values.accountType ? (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              formik.isSubmitting ||
              isLoading ||
              !formik.values.firstName ||
              (!formik.values.lastName && !formik.values.email)
            }
          >
            Submit
          </Button>
        ) : (
          <Button
            disabled={isLoading || !formik.values.accountType}
            type="primary"
            onClick={() => nextStep()}
          >
            Next
          </Button>
        )}
      </>
    );
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate: async (val) => {
      const res = await authValidation.signup(val);
      return res.isValid ? {} : res.errors;
    },
  });

  return (
    <>
      {isSuccess ? (
        <Result
          status="success"
          title="Success, next step involves you checking your inbox for your verification mail."
          extra={[
            <Button
              type="primary"
              key="close"
              onClick={() => setIsSuccess(false)}
            >
              <Link href="/signup">Close</Link>
            </Button>,
          ]}
        />
      ) : (
        <>
          <div className="auth-page_content-header">
            {currentStep === 0 ? (
              <>
                <h2 className="header-title">Select Account Plan</h2>
                <hr className="titleBar-sm center" />
              </>
            ) : (
              <>
                <h2 className="header-title">Sign Up</h2>
                <hr className="titleBar-sm center" />
                <p className="header-subtitle">
                  Alredy have an account?
                  <Link href="/login">
                    <strong>Login</strong>
                  </Link>
                </p>
              </>
            )}
          </div>

          <div className="auth-page_content-body">
            <form
              onSubmit={formik.handleSubmit}
              className="auth-form"
              autoComplete="false"
            >
              {isLoading ? (
                <Loading />
              ) : (
                steps[currentStep].content({
                  errors: formik.errors,
                  touched: formik.touched,
                  formValues: formik.values,
                  handleChange: formik.handleChange,
                  setFieldValue: formik.setFieldValue,
                  setFieldTouched: formik.setFieldTouched,
                  ...(currentStep === 0 ? { plans: data?.plans } : null),
                })
              )}
              <div className="auth-page_content-footer">
                {renderButton(currentStep, formik)}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
