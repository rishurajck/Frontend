import React, { useState } from "react";
import styles from "./Onboarding.module.css";
import Step1 from "../OnboardingSteps/Step1";
import Step2 from "../OnboardingSteps/Step2";
import Step3 from "../OnboardingSteps/Step3";

function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className={styles.onboarding}>
      {step === 1 && <Step1 onNext={() => setStep(2)} />}
      {step === 2 && (
        <Step2
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
          onCancel={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3 onBack={() => setStep(2)} onCancel={() => setStep(1)} />
      )}
    </div>
  );
}

export default Onboarding;
