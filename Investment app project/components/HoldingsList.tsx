
import React from 'react';
import { Holding } from '../types';

interface Props {
  holdings: Holding[];
  formatCurrency: (val: number) => string;
}

const HoldingsList: React.FC<Props> = ({ holdings, formatCurrency }) => {
  return (
    <div className="space-y-4">
      {holdings.map((h) => (
        <div key={h.id} className="bg-[#1e293b] rounded-2xl p-4 flex items-center justify-between border border-transparent hover:border-slate-700 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0d0f14] flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-800 group-hover:bg-slate-800 transition-colors">
              {h.ticker}
            </div>
            <div>
              <h4 className="font-bold text-[15px]">{h.name}</h4>
              <p className="text-slate-400 text-xs font-medium">
                {h.lots.toLocaleString('id-ID')} Shares
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-bold text-[16px] mb-0.5">
              {h.currentPrice.toLocaleString('id-ID')}
            </p>
            <span className={`text-xs font-bold flex items-center justify-end gap-1 ${h.dailyGainPercentage >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              <span className="mb-0.5">{h.dailyGainPercentage >= 0 ? '↗' : '↘'}</span>
              {h.dailyGainPercentage >= 0 ? '+' : ''}{h.dailyGainPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoldingsList;
