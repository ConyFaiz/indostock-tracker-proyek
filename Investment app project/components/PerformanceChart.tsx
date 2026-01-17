
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { PERFORMANCE_CHART_DATA } from '../constants';

const PerformanceChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={PERFORMANCE_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#1f2937" strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
          dy={10}
        />
        <YAxis hide />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
          itemStyle={{ color: '#3b82f6' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#3b82f6" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorValue)" 
          animationDuration={2000}
        />
        {/* Mock dot on last data point to match design */}
        <ReferenceDot 
          x="30 MAY" 
          y={150} 
          r={5} 
          fill="#3b82f6" 
          stroke="#ffffff" 
          strokeWidth={2} 
        />
        {/* Mock dot highlight */}
         <ReferenceDot 
          x="25 MAY" 
          y={165} 
          r={4} 
          fill="#ffffff" 
          stroke="#3b82f6" 
          strokeWidth={2} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
