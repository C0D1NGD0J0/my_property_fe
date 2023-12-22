import React, { useState } from "react";
import { Steps, Button } from "antd";

const { Step } = Steps;

interface StepType {
  title: string;
  content: React.ReactNode;
}

interface MultiStepWrapperProps {
  steps: StepType[];
  displayFooter?: boolean;
  displayStepsBar?: boolean;
}

const MultiStepWrapper: React.FC<MultiStepWrapperProps> = ({
  steps,
  displayFooter = true,
  displayStepsBar = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      {displayStepsBar ? (
        <Steps size="small" current={currentStep}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
      ) : null}

      <div className="steps-content">{steps[currentStep].content}</div>

      {steps.length && displayFooter ? (
        <div className="steps-action">
          {currentStep < totalSteps - 1 && (
            <Button type="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {currentStep === totalSteps - 1 && (
            <Button
              type="primary"
              onClick={() => alert("Processing complete!")}
            >
              Done
            </Button>
          )}
          {currentStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={prevStep}>
              Previous
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MultiStepWrapper;
