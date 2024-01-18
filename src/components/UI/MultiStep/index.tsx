import React, { useState, useCallback, useEffect } from "react";
import { Steps } from "antd";
import { Button } from "@components/FormElements";

const { Step } = Steps;

interface StepType {
  title: string;
  hidden: boolean;
  hasError: boolean;
  content: React.ReactNode;
}

interface MultiStepWrapperProps {
  steps: StepType[];
  displayStepsBar: boolean;
  initialStep?: number;
  onComplete?: () => void;
  onStepChange?: (currentStep: number) => void;
  customFooter?: (stepControls: {
    isLastStep: boolean;
    isFirstStep: boolean;
    nextStep: () => void;
    prevStep: () => void;
  }) => React.ReactNode;
}

const MultiStepWrapper: React.FC<MultiStepWrapperProps> = ({
  steps,
  displayStepsBar,
  initialStep = 0,
  onStepChange,
  customFooter,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onStepChange?.(next);
    }
  }, [currentStep, steps.length, onStepChange]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onStepChange?.(prev);
    }
  }, [currentStep, onStepChange]);

  const DefaultFooter = () => (
    <div className="steps-action">
      {currentStep > 0 && (
        <Button
          label="Back"
          onClick={prevStep}
          className="btn btn-outline-ghost"
        />
      )}
      {currentStep < steps.length - 1 && (
        <Button label="Next" onClick={nextStep} className="btn btn-outline" />
      )}
      {currentStep === steps.length - 1 && (
        <Button
          label="Submit"
          onClick={onComplete}
          className="btn btn-outline"
        />
      )}
    </div>
  );

  return (
    <div className="steps">
      {displayStepsBar ? (
        <div className="steps-header">
          <Steps
            size="small"
            current={currentStep}
            progressDot
            onChange={(newStep) => {
              setCurrentStep(newStep);
              if (onStepChange) {
                onStepChange(newStep);
              }
            }}
          >
            {steps.map((step, index) => {
              const { hasError } = step;
              if (!step.hidden) {
                return (
                  <Step
                    key={index}
                    title={
                      <span className={hasError ? "step-error" : ""}>
                        {step.title}
                      </span>
                    }
                  />
                );
              }
            })}
          </Steps>
        </div>
      ) : null}

      <div className="steps-content">{steps[currentStep].content}</div>

      {customFooter ? (
        customFooter({
          isLastStep: currentStep === steps.length - 1,
          isFirstStep: currentStep === 0,
          nextStep,
          prevStep,
        })
      ) : (
        <DefaultFooter />
      )}
    </div>
  );
};

export default React.memo(MultiStepWrapper);
