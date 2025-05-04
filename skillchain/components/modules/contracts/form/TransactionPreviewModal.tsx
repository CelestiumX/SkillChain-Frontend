"use client";

import React from 'react';

interface TransactionPreviewModalProps {
  open: boolean;
  onClose: () => void;
  service: any;
  milestones: any[];
  terms: any;
  totalXlm: number;
  totalUsdc: number | null;
}

const TransactionPreviewModal: React.FC<TransactionPreviewModalProps> = ({ open, onClose, service, milestones, terms, totalXlm, totalUsdc }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button className="absolute top-2 right-2 btn btn-sm btn-ghost" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-4">Previsualización de la Transacción</h2>
        <div className="mb-4">
          <b>Servicio:</b> {service.title} <br />
          <b>Descripción:</b> {service.description}
        </div>
        <div className="mb-4">
          <b>Hitos:</b>
          {milestones.map((m, idx) => (
            <div key={idx} className="text-sm">
              {m.title}: {m.amount} {m.currency} ({m.description})
            </div>
          ))}
        </div>
        <div className="mb-4">
          <b>Total:</b> {totalXlm} XLM {totalUsdc !== null && <span>(≈ {totalUsdc} USDC)</span>}
        </div>
        <div className="mb-4">
          <b>Revisiones:</b> {terms.revisions} <br />
          <b>Política de cancelación:</b> {terms.cancellationPolicy}
        </div>
        <button className="btn btn-primary w-full mt-2" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default TransactionPreviewModal; 