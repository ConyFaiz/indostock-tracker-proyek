
import React, { useState, useEffect } from 'react';
import { X, Search, ChevronDown, Calendar, ArrowRight } from 'lucide-react';
import { Holding } from '../types';

interface Props {
  onClose: () => void;
  onSubmit: (stock: Omit<Holding, 'id' | 'currentPrice' | 'dailyGainPercentage'>) => void;
}

const AddStockModal: React.FC<Props> = ({ onClose, onSubmit }) => {
  const [ticker, setTicker] = useState('');
  const [lots, setLots] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState('2023-10-27');

  const shares = lots * 100;
  const totalInvestment = shares * price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker || lots <= 0 || price <= 0) return;

    onSubmit({
      ticker: ticker.toUpperCase(),
      name: ticker.toUpperCase() + ' Corporation', // Placeholder
      lots,
      shares,
      purchasePrice: price,
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('Rp', 'Rp ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4">
      <div 
        className="bg-[#111827] w-full max-w-md rounded-t-3xl md:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
      >
        {/* Header Section */}
        <div className="p-6 relative">
          <div className="w-10 h-1 rounded-full bg-slate-700 mx-auto mb-6 md:hidden"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
          
          <h3 className="text-xl font-bold text-center">Add New Stock</h3>
          
          <button className="absolute top-8 right-8 text-blue-500 text-sm font-semibold hover:text-blue-400">
            Help
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Stock Information</label>
            <p className="text-xs text-slate-400 mb-2">Stock Ticker</p>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-500" />
              </div>
              <input 
                type="text"
                placeholder="Search IDX (e.g. BBCA, TLKM)"
                className="w-full bg-[#1e293b] border border-slate-800 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-semibold placeholder:text-slate-600"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-slate-500" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-slate-400 mb-2">Quantity</p>
            <div className="relative">
              <input 
                type="number"
                placeholder="0"
                className="w-full bg-[#1e293b] border border-slate-800 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-semibold"
                value={lots || ''}
                onChange={(e) => setLots(Number(e.target.value))}
                required
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-[10px] font-black tracking-widest text-slate-500 pointer-events-none uppercase">Lots</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-slate-400 mb-2">Purchase Price</p>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-xs font-bold text-slate-500 pointer-events-none uppercase">IDR</span>
              <input 
                type="number"
                placeholder="Price per share"
                className="w-full bg-[#1e293b] border border-slate-800 rounded-xl py-3.5 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-semibold"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-slate-400 mb-2">Transaction Date</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Calendar size={18} className="text-slate-500" />
              </div>
              <input 
                type="date"
                className="w-full bg-[#1e293b] border border-slate-800 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-semibold text-slate-300"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Calendar size={18} className="text-slate-500" />
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b]/50 p-4 rounded-xl flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Total Estimated Investment</span>
            <span className="text-sm font-bold">{formatCurrency(totalInvestment)}</span>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all active:scale-95 group"
          >
            Add to Portfolio
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            type="button"
            onClick={onClose}
            className="w-full text-slate-500 font-bold py-2 hover:text-slate-400 transition-colors text-sm"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal;
