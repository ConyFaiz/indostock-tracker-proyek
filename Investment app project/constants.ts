
import { Holding, MarketIndex, ChartData } from './types';

export const INITIAL_HOLDINGS: Holding[] = [
  {
    id: '1',
    ticker: 'BBCA',
    name: 'Bank Central Asia',
    lots: 12.4,
    shares: 1240,
    purchasePrice: 9100,
    currentPrice: 10250,
    dailyGainPercentage: 12.5,
  },
  {
    id: '2',
    ticker: 'TLKM',
    name: 'Telkom Indonesia',
    lots: 50,
    shares: 5000,
    purchasePrice: 3950,
    currentPrice: 3850,
    dailyGainPercentage: -2.1,
  },
  {
    id: '3',
    ticker: 'ASII',
    name: 'Astra International',
    lots: 8,
    shares: 800,
    purchasePrice: 4900,
    currentPrice: 5125,
    dailyGainPercentage: 4.3,
  },
  {
    id: '4',
    ticker: 'GOTO',
    name: 'GoTo Gojek Tokopedia',
    lots: 500,
    shares: 50000,
    purchasePrice: 84,
    currentPrice: 84,
    dailyGainPercentage: 0.0,
  }
];

export const MARKET_INDICES: MarketIndex[] = [
  { name: 'IHSG', value: '7.234,12', change: '+0.45%', isPositive: true },
  { name: 'LQ45', value: '952,40', change: '-0.12%', isPositive: false },
  { name: 'USD/IDR', value: '15.742', change: '+0.02%', isPositive: true },
];

export const PERFORMANCE_CHART_DATA: ChartData[] = [
  { date: '1 MAY', value: 120 },
  { date: '5 MAY', value: 135 },
  { date: '10 MAY', value: 155 },
  { date: '15 MAY', value: 145 },
  { date: '20 MAY', value: 130 },
  { date: '25 MAY', value: 165 },
  { date: '30 MAY', value: 150 },
];
