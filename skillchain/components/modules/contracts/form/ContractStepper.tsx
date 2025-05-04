"use client";
import React from 'react';
import ServiceStep from './ServiceStep';
import MilestonesStep from './MilestonesStep';
import TermsStep from './TermsStep';
import ConfirmationStep from './ConfirmationStep';
import { useContractForm } from './useContractForm';
import { AnimatePresence, motion } from 'framer-motion';

const steps = [
  { label: 'Service', component: ServiceStep },
  { label: 'Milestones', component: MilestonesStep },
  { label: 'Terms', component: TermsStep },
  { label: 'Confirmation', component: ConfirmationStep },
];

const StepIcon = ({ status }: { status: 'active' | 'completed' | 'inactive' }) => {
  if (status === 'completed') {
    return (
      <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#2ec4ff] bg-[#2ec4ff] text-white">
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    );
  }
  if (status === 'active') {
    return (
      <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#2ec4ff] bg-[#10182a]">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="8" strokeDasharray="6,1" stroke="#2ec4ff" strokeWidth="2" fill="none" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#10182a]">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="8" strokeDasharray="6,1" stroke="#3a4663" strokeWidth="2" fill="none" />
      </svg>
    </span>
  );
};

const ContractStepper = () => {
  const form = useContractForm();
  const { step, setStep, validateStep } = form;

  const nextStep = () => {
    if (step < steps.length - 1) {
      if (validateStep()) setStep(step + 1);
    }
  };
  const prevStep = () => setStep(Math.max(step - 1, 0));

  const StepComponent = steps[step].component;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a1020] py-10">
      <h1 className="text-4xl font-bold text-[#2ec4ff] mb-2 text-center">Create Service Contract</h1>
      <p className="text-[#b0b8d1] text-lg mb-8 text-center">Define the terms of your service agreement on the Stellar blockchain</p>
      <div className="flex flex-col justify-center mb-12 w-full max-w-3xl pb-8 sm:pb-0 overflow-x-auto sm:overflow-visible">
        <div className="flex w-full items-center max-w-3xl mx-auto">
          {steps.map((stepObj, idx) => {
            const status = idx < step ? 'completed' : idx === step ? 'active' : 'inactive';
            return (
              <React.Fragment key={stepObj.label}>
                <div className="relative flex items-center justify-center z-10 min-w-[40px] w-10 h-10">
                  <StepIcon status={status as any} />
                  <span className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs sm:text-base text-center ${idx <= step ? 'text-[#2ec4ff] font-semibold' : 'text-[#b0b8d1]'}`}>{stepObj.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-transparent flex items-center -ml-5 -mr-5 z-0">
                    <div className={`w-full h-1 ${idx < step ? 'bg-[#2ec4ff]' : 'bg-[#0a1020]'}`}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <MilestonesStep
                milestones={form.milestones}
                setMilestones={form.setMilestones}
                errors={form.errors}
                setErrors={form.setErrors}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {step !== 1 && (
              <StepComponent {...form} onNext={nextStep} onPrev={prevStep} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContractStepper; 