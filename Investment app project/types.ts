
export interface Holding {
  id: string;
  ticker: string;
  name: string;
  lots: number;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  dailyGainPercentage: number;
}

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface ChartData {
  date: string;
  value: number;
}
