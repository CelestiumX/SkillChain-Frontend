"use client";

import React from 'react';

interface TermsStepProps {
  terms: any;
  setTerms: (data: any) => void;
  errors: any;
  onNext?: () => void;
  onPrev?: () => void;
}

const cancellationPolicies = [
  { value: '', label: 'Select a policy' },
  { value: 'flexible', label: 'Flexible' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'strict', label: 'Strict' },
];

const TermsStep: React.FC<TermsStepProps> = ({ terms, setTerms, errors, onNext, onPrev }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setTerms({ ...terms, [name]: checked });
    } else {
      setTerms({
        ...terms,
        [name]: name === 'revisions' ? Number(value) : value,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl bg-[#10182a] rounded-2xl p-8 shadow-xl border border-[#2ec4ff]">
      <h2 className="text-2xl font-bold text-[#2ec4ff] mb-1">Terms and Conditions</h2>
      <p className="text-[#b0b8d1] mb-8">Define the terms of your service contract.</p>
      {/* Number of Revisions */}
      <div className="mb-6">
        <label className="block text-white text-sm mb-1 font-semibold">Number of Revisions</label>
        <input
          type="number"
          name="revisions"
          value={terms.revisions || 0}
          onChange={handleChange}
          className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-4 py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff]"
          min={0}
        />
        <span className="text-[#b0b8d1] text-xs">Number of revisions included in the service.</span>
        {errors.revisions && <span className="text-red-400 text-xs mt-1 block">{errors.revisions}</span>}
      </div>
      {/* Cancellation Policy */}
      <div className="mb-6">
        <label className="block text-white text-sm mb-1 font-semibold">Cancellation Policy</label>
        <select
          name="cancellationPolicy"
          value={terms.cancellationPolicy || ''}
          onChange={handleChange}
          className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#2ec4ff]"
        >
          {cancellationPolicies.map((policy) => (
            <option key={policy.value} value={policy.value} className="bg-[#181f36] text-white">{policy.label}</option>
          ))}
        </select>
        <span className="text-[#b0b8d1] text-xs">75% refund if canceled before the first milestone, 25% after.</span>
        {errors.cancellationPolicy && <span className="text-red-400 text-xs mt-1 block">{errors.cancellationPolicy}</span>}
      </div>
      {/* Additional Terms */}
      <div className="mb-6">
        <label className="block text-white text-sm mb-1 font-semibold">Additional Terms (Optional)</label>
        <textarea
          name="additionalTerms"
          value={terms.additionalTerms || ''}
          onChange={handleChange}
          className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-4 py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] min-h-[60px]"
          placeholder="Add any additional terms you want to include in the contract..."
        />
        <span className="text-[#b0b8d1] text-xs">You can specify any additional terms not covered by the fields above.</span>
        {errors.additionalTerms && <span className="text-red-400 text-xs mt-1 block">{errors.additionalTerms}</span>}
      </div>
      {/* Accept Terms Checkbox */}
      <div className="mb-8 flex items-center gap-3 p-4 border border-[#22304a] rounded-lg bg-[#181f36]">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={!!terms.acceptTerms}
          onChange={handleChange}
          className="w-5 h-5 accent-[#2ec4ff]"
        />
        <div>
          <span className="text-white font-semibold">I accept SkillChain's terms and conditions</span>
          <p className="text-[#b0b8d1] text-xs">By checking this box, you confirm that you have read and accept SkillChain's terms and conditions for service contracts.</p>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="border border-[#2ec4ff] text-[#2ec4ff] font-semibold px-8 py-2 rounded-lg bg-transparent hover:bg-[#0a1020] transition-all"
          onClick={onPrev}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="bg-gradient-to-r from-[#2ec4ff] to-[#2196f3] text-black font-semibold px-8 py-2 rounded-lg flex items-center gap-2 transition-all hover:brightness-90 border-none shadow-none"
          onClick={onNext}
        >
          Next <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default TermsStep; 