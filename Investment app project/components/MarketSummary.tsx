
import React from 'react';
import { MarketIndex } from '../types';

interface Props {
  indices: MarketIndex[];
}

const MarketSummary: React.FC<Props> = ({ indices }) => {
  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
      {indices.map((idx, i) => (
        <div key={i} className="flex-shrink-0 bg-[#1e293b] rounded-full px-5 py-2.5 flex items-center gap-2 border border-slate-800/50">
          <span className="text-xs font-bold uppercase tracking-wide text-white">{idx.name}</span>
          <span className={`text-xs font-bold ${idx.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {idx.value} ({idx.change})
          </span>
        </div>
      ))}
    </div>
  );
};

export default MarketSummary;
