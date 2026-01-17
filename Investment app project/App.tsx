
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Bell, Menu, Info, LayoutGrid, Bookmark, Newspaper, User } from 'lucide-react';
import { INITIAL_HOLDINGS, MARKET_INDICES } from './constants';
import { Holding } from './types';
import PerformanceChart from './components/PerformanceChart';
import HoldingsList from './components/HoldingsList';
import AddStockModal from './components/AddStockModal';
import MarketSummary from './components/MarketSummary';

const STORAGE_KEY = 'investoport_holdings';

const App: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHoldings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse holdings", e);
        setHoldings(INITIAL_HOLDINGS);
      }
    } else {
      setHoldings(INITIAL_HOLDINGS);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever holdings change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
    }
  }, [holdings, isLoaded]);

  // Automatic calculations for Total Portfolio Value
  const totalPortfolioValue = useMemo(() => {
    return holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  }, [holdings]);

  // Automatic calculations for Total Daily/Overall Gain
  const totalPurchaseValue = useMemo(() => {
    return holdings.reduce((sum, h) => sum + (h.shares * h.purchasePrice), 0);
  }, [holdings]);

  const totalDailyGain = useMemo(() => {
    return totalPortfolioValue - totalPurchaseValue;
  }, [totalPortfolioValue, totalPurchaseValue]);

  const dailyGainPercent = useMemo(() => {
    if (totalPurchaseValue === 0) return 0;
    return (totalDailyGain / totalPurchaseValue) * 100;
  }, [totalDailyGain, totalPurchaseValue]);

  const handleAddStock = (newStock: Omit<Holding, 'id' | 'currentPrice' | 'dailyGainPercentage'>) => {
    const id = Date.now().toString();
    // Simulate a current market price for the newly added stock (usually slightly different from purchase)
    const mockCurrentPrice = newStock.purchasePrice * (1 + (Math.random() * 0.04 - 0.02)); 
    const dailyGain = ((mockCurrentPrice - newStock.purchasePrice) / newStock.purchasePrice) * 100;

    const stock: Holding = {
      ...newStock,
      id,
      currentPrice: Math.round(mockCurrentPrice),
      dailyGainPercentage: parseFloat(dailyGain.toFixed(2)),
    };

    setHoldings(prev => [stock, ...prev]);
    setIsModalOpen(false);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('Rp', 'Rp ');
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-white pb-32 md:pb-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-2xl mx-auto px-4 pt-8">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#1e293b] text-blue-400 cursor-pointer hover:bg-slate-700 transition-colors">
              <Menu size={20} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Halo,</p>
              <h1 className="text-lg font-bold leading-tight">Muhammad Cony Faiz Darain</h1>
              <p className="text-slate-500 text-[10px] font-semibold mt-0.5 tracking-wide">
                NIM: C030325073 | Teknik Informatika 1E
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full bg-[#1e293b] hover:bg-slate-700 transition-colors">
              <Bell size={20} className="text-slate-300" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0d0f14]"></span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700">
              <img src="https://picsum.photos/id/64/100/100" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Market Summary */}
        <MarketSummary indices={MARKET_INDICES} />

        {/* Portfolio Overview Card */}
        <section className="bg-[#1e293b] rounded-3xl p-6 mb-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <div className="w-8 h-6 border-2 border-white rounded"></div>
            </div>
          </div>
          
          <div className="relative z-10">
            <p className="text-slate-400 text-sm mb-1 font-medium">Total Portfolio Value</p>
            <h2 className="text-3xl font-bold mb-4 tracking-tight">{formatCurrency(totalPortfolioValue)}</h2>
            
            <div className="flex items-end justify-between">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Gain / Loss</p>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${totalDailyGain >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {totalDailyGain >= 0 ? '+' : ''}{formatCurrency(totalDailyGain)}
                  </span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${totalDailyGain >= 0 ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>
                    ({dailyGainPercent >= 0 ? '+' : ''}{dailyGainPercent.toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 transition-all active:scale-95"
              >
                <Plus size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </section>

        {/* Performance Chart Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Performance</h3>
            <Info size={18} className="text-slate-500 cursor-pointer" />
          </div>
          
          <div className="bg-[#111827] rounded-2xl p-4 border border-slate-800/50">
            <div className="flex gap-2 mb-6 bg-[#1f2937] p-1 rounded-xl w-fit">
              {['1D', '1W', '1M', '1Y', 'ALL'].map((tab) => (
                <button 
                  key={tab}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === '1M' ? 'bg-[#374151] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="h-64 w-full">
              <PerformanceChart />
            </div>
          </div>
        </section>

        {/* Holdings Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">My Holdings</h3>
            <button className="text-blue-500 text-sm font-semibold hover:text-blue-400">View All</button>
          </div>
          <HoldingsList holdings={holdings} formatCurrency={formatCurrency} />
        </section>

        {/* Footer */}
        <footer className="text-center pb-12 opacity-40 mt-8 border-t border-white/5 pt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            © 2026 zev.dzn | Built for Portfolio Purposes
          </p>
        </footer>

      </div>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0d0f14]/80 backdrop-blur-xl border-t border-white/5 py-4 px-8 flex justify-between items-center z-40">
        <NavItem icon={<LayoutGrid size={22} />} label="Dashboard" active />
        <NavItem icon={<Bookmark size={22} />} label="Watchlist" />
        
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-14 h-14 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 border-4 border-[#0d0f14] active:scale-90 transition-transform"
          >
            <Plus size={28} className="text-white" strokeWidth={3} />
          </button>
        </div>

        <NavItem icon={<Newspaper size={22} />} label="News" />
        <NavItem icon={<User size={22} />} label="Profile" />
      </nav>

      {/* Add Stock Modal */}
      {isModalOpen && (
        <AddStockModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddStock}
        />
      )}
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default App;
