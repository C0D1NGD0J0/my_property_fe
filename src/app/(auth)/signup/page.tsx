"use client";
import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import { Formik, FormikProps, FormikValues } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import useSWR from "swr";

import Loading from "./loading";
import authService from "@services/auth";
import { SWR_KEY } from "@utils/constants";
import UserInfo from "@app/(auth)/signup/UserInfo";
import PlanSelection from "@app/(auth)/signup/PlanSelectionStep";
import AccountVerification from "@app/(auth)/signup/AccountVerification";
import authValidation from "@validations/auth.validation";
import { IInitialValues } from "@interfaces/user.interface";
import { SignupValidationSchema } from "@validations/schema/auth.schema";

const steps = [
  {
    title: "Account Type",
    content: (props: any) => <PlanSelection {...props} />,
  },
  {
    title: "Account Details",
    content: (props: any) => <UserInfo {...props} />,
  },
  {
    title: "Activation",
    content: (props: any) => <AccountVerification {...props} />,
    description: "Enter account verification code sent to your mailbox.",
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
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const { data, error, isLoading } = useSWR(
    SWR_KEY.signupPlans,
    authService.getUserPlans,
  );

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values: FormikValues) => {
    console.log(values, "====VALUES");
  };

  const renderButton = (
    currentStep: number,
    formik: FormikProps<IInitialValues>,
  ) => {
    return (
      <>
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prevStep()}>
            Previous
          </Button>
        )}
        {currentStep == 1 && formik.values.accountType ? (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
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

        {currentStep === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <div className="auth-page_content-header">
        {steps[currentStep].description ? (
          <h2>{steps[currentStep].description}</h2>
        ) : (
          <>
            <h2>Sign Up</h2>
            <p>
              Alredy have an account?
              <Link href="/login">
                <strong>Login</strong>
              </Link>
            </p>
            <div className="steps-wrapper">
              <Steps
                progressDot
                size="small"
                current={currentStep}
                items={items}
              />
            </div>
          </>
        )}
      </div>

      <div className="auth-page_content-body">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validateSchema={toFormikValidationSchema(SignupValidationSchema)}
        >
          {(props) => {
            return (
              <form
                onSubmit={props.handleSubmit}
                className="auth-form"
                autoComplete="false"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  steps[currentStep].content({
                    errors: props.errors,
                    touched: props.touched,
                    formValues: props.values,
                    handleChange: props.handleChange,
                    setFieldValue: props.setFieldValue,
                    setFieldTouched: props.setFieldTouched,
                    ...(currentStep === 0 ? { plans: data.plans } : null),
                  })
                )}
                <div className="auth-page_content-footer">
                  {renderButton(currentStep, props)}
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
