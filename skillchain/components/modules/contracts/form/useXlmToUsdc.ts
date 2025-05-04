"use client";
import { useEffect, useState } from 'react';

export function useXlmToUsdc(xlmAmount: number) {
  const [usdc, setUsdc] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!xlmAmount || xlmAmount <= 0) {
      setUsdc(null);
      return;
    }
    const timeout = setTimeout(() => {
      setLoading(true);
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd')
        .then(res => res.json())
        .then(data => {
          const rate = data?.stellar?.usd || 0;
          setUsdc(Number((xlmAmount * rate).toFixed(2)));
        })
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timeout);
  }, [xlmAmount]);

  return { usdc, loading };
} 