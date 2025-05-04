"use client";

import React from 'react';

interface ServiceStepProps {
  service: any;
  setService: (data: any) => void;
  errors: any;
  onNext?: () => void;
  onPrev?: () => void;
}

const categories = [
  { value: '', label: 'Select a category' },
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'writing', label: 'Writing' },
  { value: 'marketing', label: 'Marketing' },
];

const ServiceStep: React.FC<ServiceStepProps> = ({ service, setService, errors, onNext, onPrev }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: name === 'deliveryTime' ? Number(value) : value });
  };

  return (
    <div className="w-full max-w-4xl bg-[#10182a] rounded-2xl p-4 sm:p-8 shadow-xl border border-[#22304a] mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-[#2ec4ff] mb-1">Service Details</h2>
      <p className="text-[#b0b8d1] mb-4 sm:mb-8 text-sm sm:text-base">Define the service you'll offer in this contract.</p>
      {/* Service Title */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-[#b0b8d1] text-xs sm:text-sm mb-1 font-semibold">Service Title</label>
        <input
          type="text"
          name="title"
          value={service.title || ''}
          onChange={handleChange}
          className="w-full bg-transparent border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] text-sm sm:text-base"
          placeholder="E.g.: Professional Logo Design"
        />
        <span className="text-[#b0b8d1] text-xs">A clear and concise title that describes your service.</span>
        {errors.title && <span className="text-red-400 text-xs mt-1 block">{errors.title}</span>}
      </div>
      {/* Category */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-[#b0b8d1] text-xs sm:text-sm mb-1 font-semibold">Category</label>
        <select
          name="category"
          value={service.category || ''}
          onChange={handleChange}
          className="w-full bg-transparent border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] text-sm sm:text-base"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value} className="bg-[#10182a] text-white">{cat.label}</option>
          ))}
        </select>
        <span className="text-[#b0b8d1] text-xs">The category that best describes your service.</span>
        {errors.category && <span className="text-red-400 text-xs mt-1 block">{errors.category}</span>}
      </div>
      {/* Description */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-[#b0b8d1] text-xs sm:text-sm mb-1 font-semibold">Description</label>
        <textarea
          name="description"
          value={service.description || ''}
          onChange={handleChange}
          className="w-full bg-transparent border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] min-h-[60px] sm:min-h-[80px] text-sm sm:text-base"
          placeholder="Describe in detail the service you'll provide..."
        />
        <span className="text-[#b0b8d1] text-xs">Explain in detail what your service includes and what the client can expect.</span>
        {errors.description && <span className="text-red-400 text-xs mt-1 block">{errors.description}</span>}
      </div>
      {/* Delivery Time */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-[#b0b8d1] text-xs sm:text-sm mb-1 font-semibold">Delivery Time (days)</label>
        <input
          type="number"
          name="deliveryTime"
          value={service.deliveryTime || ''}
          onChange={handleChange}
          className="w-full bg-transparent border border-[#22304a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-[#b0b8d1] focus:outline-none focus:ring-2 focus:ring-[#2ec4ff] text-sm sm:text-base"
          min={1}
        />
        <span className="text-[#b0b8d1] text-xs">The estimated time to complete the entire service.</span>
        {errors.deliveryTime && <span className="text-red-400 text-xs mt-1 block">{errors.deliveryTime}</span>}
      </div>
      {/* Previous Button */}
      <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-0'>
        <div className="w-full sm:w-1/2 flex justify-start mt-4 sm:mt-8">
          <button
            type="button"
            className="border-2 border-[#2ec4ff] text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:bg-[#13204a] bg-transparent w-full sm:w-auto"
            onClick={onPrev}
          >
            <span className="text-lg">←</span> Previous
          </button>
        </div>
        {/* Next Button */}
        <div className="w-full sm:w-1/2 flex justify-end mt-4 sm:mt-8">
          <button
            type="button"
            className="bg-gradient-to-r from-[#2ec4ff] to-[#2196f3] text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:brightness-90 border-none shadow-none w-full sm:w-auto"
            onClick={onNext}
          >
            Next <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceStep; 