"use client";
import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import Link from "next/link";
import useSWR from "swr";

import authService from "@services/auth";
import UserInfo from "@app/(auth)/signup/UserInfo";
import PlanSelection from "@app/(auth)/signup/PlanSelectionStep";
import AccountVerification from "@app/(auth)/signup/AccountVerification";
import Loading from "./loading";
import { SWR_KEY } from "@utils/constants";

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

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(0);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const { data, error, isLoading } = useSWR(
    SWR_KEY.signup,
    authService.getUserPlans,
  );

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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
        <form className="auth-form" autoComplete="false">
          {isLoading ? (
            <Loading />
          ) : (
            steps[currentStep].content({
              plans: data && data.plans,
              userInfo: null,
            })
          )}
        </form>
      </div>

      <div className="auth-page_content-footer">
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prevStep()}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 &&
          steps[currentStep].title !== "Account Type" && (
            <Button type="primary" onClick={() => nextStep()}>
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
      </div>
    </>
  );
}
