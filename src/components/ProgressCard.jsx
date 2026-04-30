import React from 'react';

const ProgressCard = ({ title, value, max, icon: Icon, colorClass }) => {
  const percentage = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="type-label text-slate-500">{title}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      <div>
        <span className="type-metric text-white">{value}</span>
        <span className="text-slate-500 text-sm ml-1">/ {max}</span>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">{Math.round(percentage)}% সম্পূর্ণ</span>
        </div>
        <div className="progress-bar h-2">
          <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
