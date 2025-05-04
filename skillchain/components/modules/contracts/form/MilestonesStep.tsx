"use client";

import React, { useEffect, useState } from 'react';

interface MilestonesStepProps {
  milestones: any[];
  setMilestones: (data: any[]) => void;
  errors: any;
  setErrors: (errors: any) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const MilestonesStep: React.FC<MilestonesStepProps> = ({ milestones, setMilestones, errors, setErrors, onNext, onPrev }) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errors._global) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setErrors({ ...errors, _global: undefined });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errors._global, setErrors]);

  const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = milestones.map((m, i) =>
      i === idx ? { ...m, [name]: name === 'amount' ? Number(value) : value } : m
    );
    setMilestones(updated);
  };

  const handleDateChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = milestones.map((m, i) =>
      i === idx ? { ...m, [name]: value } : m
    );
    setMilestones(updated);
  };

  const addMilestone = () => setMilestones([...milestones, { title: '', description: '', amount: '', currency: 'XLM', deliveryDate: '' }]);
  const removeMilestone = (idx: number) => setMilestones(milestones.filter((_, i) => i !== idx));

  return (
    <div className="w-full max-w-4xl bg-[#10182a] rounded-2xl p-4 sm:p-8 shadow-xl border border-[#2ec4ff] mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-[#2ec4ff] mb-1">Project Milestones</h2>
      <p className="text-[#b0b8d1] mb-4 sm:mb-8 text-sm sm:text-base">Define the milestones and payments for your contract.</p>
      {showError && errors._global && (
        <div className="mb-4 p-2 sm:p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-400 text-xs sm:text-base">{errors._global}</p>
        </div>
      )}
      {milestones.map((milestone, idx) => (
        <div key={idx} className="mb-6 sm:mb-8 border border-[#2ec4ff] rounded-xl bg-[#0a1020] p-4 sm:p-6">
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <h3 className="font-semibold text-[#2ec4ff] text-sm sm:text-base">Milestone {idx + 1}</h3>
            <button type="button" className="text-red-400 hover:text-red-600 font-bold text-lg" onClick={() => removeMilestone(idx)} title="Remove milestone">×</button>
          </div>
          <div className="mb-2 sm:mb-4">
            <label className="block text-white text-xs sm:text-sm mb-1 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={milestone.title}
              onChange={e => handleChange(idx, e)}
              className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] text-sm sm:text-base"
              placeholder="First delivery"
            />
            {errors?.[idx]?.title && <span className="text-red-400 text-xs mt-1 block">{errors[idx].title}</span>}
          </div>
          <div className="mb-2 sm:mb-4">
            <label className="block text-white text-xs sm:text-sm mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={milestone.description}
              onChange={e => handleChange(idx, e)}
              className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] min-h-[40px] sm:min-h-[60px] text-sm sm:text-base"
              placeholder="Will include a first idea of what will be the ending design"
            />
            {errors?.[idx]?.description && <span className="text-red-400 text-xs mt-1 block">{errors[idx].description}</span>}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2">
            <div className="flex-1">
              <label className="block text-white text-xs sm:text-sm mb-1 font-semibold">Amount</label>
              <input
                type="number"
                name="amount"
                value={milestone.amount}
                onChange={e => handleChange(idx, e)}
                className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] text-sm sm:text-base"
                min={0}
                placeholder="011"
              />
              {errors?.[idx]?.amount && <span className="text-red-400 text-xs mt-1 block">{errors[idx].amount}</span>}
            </div>
            <div className="flex-1">
              <label className="block text-white text-xs sm:text-sm mb-1 font-semibold">Currency</label>
              <select
                name="currency"
                value={milestone.currency}
                onChange={e => handleChange(idx, e)}
                className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] text-sm sm:text-base"
              >
                <option value="XLM" className="bg-[#181f36] text-white">XLM</option>
                <option value="USDC" className="bg-[#181f36] text-white">USDC</option>
              </select>
              {errors?.[idx]?.currency && <span className="text-red-400 text-xs mt-1 block">{errors[idx].currency}</span>}
            </div>
            <div className="flex-1">
              <label className="block text-white text-xs sm:text-sm mb-1 font-semibold">Delivery Date</label>
              <input
                type="date"
                name="deliveryDate"
                value={milestone.deliveryDate}
                onChange={e => handleDateChange(idx, e)}
                className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] text-sm sm:text-base"
              />
              {errors?.[idx]?.deliveryDate && <span className="text-red-400 text-xs mt-1 block">{errors[idx].deliveryDate}</span>}
            </div>
          </div>
        </div>
      ))}
      {/* Add Milestone Button */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <button
          type="button"
          className="w-full border-2 border-dashed border-[#2ec4ff] text-[#2ec4ff] font-semibold py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0a1020] transition-all text-sm sm:text-base"
          onClick={addMilestone}
        >
          + Add Milestone
        </button>
      </div>
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-2 sm:mt-4">
        <button
          type="button"
          className="border border-[#2ec4ff] text-[#2ec4ff] font-semibold px-4 py-2 rounded-lg bg-transparent hover:bg-[#0a1020] transition-all w-full sm:w-auto"
          onClick={onPrev}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="bg-gradient-to-r from-[#2ec4ff] to-[#2196f3] text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:brightness-90 border-none shadow-none w-full sm:w-auto"
          onClick={onNext}
        >
          Next <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default MilestonesStep; 