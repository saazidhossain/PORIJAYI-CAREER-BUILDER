import React from 'react';

const ProgressCard = ({ title, value, max, icon: Icon, color }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-lg`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="mb-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-slate-400 text-sm">/ {max}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;
