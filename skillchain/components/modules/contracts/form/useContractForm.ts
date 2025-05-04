"use client";
import { useState } from 'react';
import { z } from 'zod';

// Validation schemas for each step
export const serviceSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description is required'),
  deliveryTime: z.number().min(1, 'Delivery time must be greater than 0'),
});

export const milestoneSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  deliveryDate: z.string().min(1, 'Delivery date is required'),
});

export const termsSchema = z.object({
  revisions: z.number().min(0),
  cancellationPolicy: z.string().min(1, 'Cancellation policy is required'),
  additionalTerms: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val, 'You must accept the terms'),
});

export function useContractForm() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<any>({});
  const [milestones, setMilestones] = useState<any[]>([]);
  const [terms, setTerms] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  // Step validation
  const validateStep = () => {
    try {
      if (step === 0) serviceSchema.parse(service);
      if (step === 1) {
        if (milestones.length === 0) {
          setErrors({ _global: 'You must add at least one milestone.' });
          return false;
        }
        const milestoneErrors: any = {};
        milestones.forEach((m, idx) => {
          try {
            milestoneSchema.parse(m);
          } catch (e: any) {
            milestoneErrors[idx] = e.formErrors?.fieldErrors || {};
          }
        });
        if (Object.keys(milestoneErrors).length > 0) {
          setErrors(milestoneErrors);
          return false;
        }
      }
      if (step === 2) termsSchema.parse(terms);
      setErrors({});
      return true;
    } catch (e: any) {
      setErrors(e.formErrors?.fieldErrors || {});
      return false;
    }
  };

  return {
    step, setStep,
    service, setService,
    milestones, setMilestones,
    terms, setTerms,
    errors, setErrors,
    validateStep,
  };
} 