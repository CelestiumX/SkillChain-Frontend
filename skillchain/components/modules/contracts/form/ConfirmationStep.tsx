"use client";

import React, { useState } from 'react';
import { useXlmToUsdc } from './useXlmToUsdc';

interface ConfirmationStepProps {
  service: any;
  milestones: any[];
  terms: any;
  onPrev?: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ service, milestones, terms, onPrev }) => {
  const [wallet, setWallet] = useState('');
  const [accept, setAccept] = useState(false);
  const totalXlm = milestones.reduce((acc, m) => m.currency === 'XLM' ? acc + Number(m.amount || 0) : acc, 0);
  const { usdc: totalUsdc } = useXlmToUsdc(totalXlm);

  return (
    <div className="w-full max-w-4xl bg-[#10182a] rounded-2xl p-8 shadow-xl border border-[#2ec4ff]">
      <h2 className="text-2xl font-bold text-[#2ec4ff] mb-1">Contract Confirmation</h2>
      <p className="text-[#b0b8d1] mb-8">Review and confirm your contract details before submitting to the blockchain.</p>
      {/* Service Summary */}
      <div className="border border-[#2ec4ff] rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-[#2ec4ff] mb-4">Service Summary</h3>
        <div className="flex flex-wrap gap-8 mb-2">
          <div className="flex-1 min-w-[180px]">
            <span className="text-[#b0b8d1]">Title:</span>
            <span className="block font-bold text-white">{service.title}</span>
          </div>
          <div className="flex-1 min-w-[180px]">
            <span className="text-[#b0b8d1]">Category:</span>
            <span className="block font-bold text-white">{service.category}</span>
          </div>
        </div>
        <div className="mb-2">
          <span className="text-[#b0b8d1]">Description:</span>
          <span className="block font-bold text-white">{service.description}</span>
        </div>
        <div className="mb-2">
          <span className="text-[#b0b8d1]">Delivery Time:</span>
          <span className="block font-bold text-white">{service.deliveryTime} days</span>
        </div>
      </div>
      {/* Milestones and Payments */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-[#2ec4ff] mb-4">Milestones and Payments</h3>
        {milestones.map((m, idx) => (
          <div key={idx} className="flex justify-between items-center border border-[#2ec4ff] rounded-lg bg-[#0a1020] p-4 mb-4">
            <div>
              <span className="font-bold text-white">{m.title}</span>
              <div className="text-[#b0b8d1] text-sm">{m.description}</div>
              <div className="text-[#b0b8d1] text-xs mt-1">Delivery date: {m.deliveryDate}</div>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#2ec4ff] text-lg">{m.amount} {m.currency}</span>
            </div>
          </div>
        ))}
        <div className="border border-[#2ec4ff] rounded-lg p-4 flex justify-between items-center bg-[#181f36]">
          <span className="font-bold text-white">Total:</span>
          <span className="font-bold text-[#2ec4ff] text-lg">{totalXlm.toFixed(2)} XLM {totalUsdc !== null && <span className="text-[#b0b8d1] text-base ml-2">≈ {totalUsdc} USDC</span>}</span>
        </div>
      </div>
      {/* Terms */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-[#2ec4ff] mb-4">Terms</h3>
        <div className="flex flex-wrap gap-8">
          <div className="flex-1 min-w-[180px]">
            <span className="text-[#b0b8d1]">Revisions:</span>
            <span className="block font-bold text-white">{terms.revisions}</span>
          </div>
          <div className="flex-1 min-w-[180px]">
            <span className="text-[#b0b8d1]">Cancellation Policy:</span>
            <span className="block font-bold text-white">{terms.cancellationPolicy}</span>
          </div>
        </div>
      </div>
      {/* Wallet Address */}
      <div className="mb-4">
        <label className="block text-white text-sm mb-1 font-semibold">Stellar Wallet Address</label>
        <input
          type="text"
          value={wallet}
          onChange={e => setWallet(e.target.value)}
          className="w-full bg-[#181f36] border border-[#22304a] rounded-lg px-4 py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff]"
          placeholder="G..."
        />
        <span className="text-[#b0b8d1] text-xs">Your Stellar wallet address to sign the contract.</span>
      </div>
      {/* Accept Checkbox */}
      <div className="mb-8 flex items-center gap-3 p-4 border border-[#22304a] rounded-lg bg-[#181f36]">
        <input
          type="checkbox"
          checked={accept}
          onChange={e => setAccept(e.target.checked)}
          className="w-5 h-5 accent-[#2ec4ff]"
        />
        <div>
          <span className="text-white font-semibold">I confirm that I want to create this contract on the Stellar blockchain</span>
          <p className="text-[#b0b8d1] text-xs">By checking this box, you confirm that the contract details are correct and that you want to create this contract on the Stellar blockchain. This action cannot be undone.</p>
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
          className="bg-[#2ec4ff] hover:bg-[#1fa7d7] text-white font-semibold px-8 py-2 rounded-lg shadow transition-all flex items-center gap-2"
          disabled={!accept || !wallet}
        >
          Create Contract
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep; 