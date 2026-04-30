import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Calendar, Target, Zap, ArrowUpRight, Award } from 'lucide-react';

const tooltipStyle = {
  contentStyle: {
    backgroundColor: 'rgba(10,22,40,0.97)',
    border: '1px solid rgba(59,130,246,0.25)',
    borderRadius: '12px',
    color: '#f8fafc',
    fontSize: '13px',
    padding: '10px 14px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  },
  labelStyle: { color: '#94a3b8', marginBottom: 4 },
  cursor: { fill: 'rgba(255,255,255,0.03)' },
};

const weeklyProgress = [
  { day: 'সোম', hours: 2,   tasks: 1 },
  { day: 'মঙ্গল', hours: 3,  tasks: 2 },
  { day: 'বুধ', hours: 2.5, tasks: 1 },
  { day: 'বৃহ', hours: 4,   tasks: 3 },
  { day: 'শুক্র', hours: 3.5, tasks: 2 },
  { day: 'শনি', hours: 5,   tasks: 4 },
  { day: 'রবি', hours: 2,   tasks: 1 },
];

const skillDistribution = [
  { name: 'Python',   value: 35, color: '#3b82f6' },
  { name: 'AI/ML',    value: 25, color: '#8b5cf6' },
  { name: 'Backend',  value: 20, color: '#10b981' },
  { name: 'Frontend', value: 15, color: '#f59e0b' },
  { name: 'Database', value: 5,  color: '#06b6d4' },
];

const learningTrend = [
  { month: 'জানু',  hours: 20 },
  { month: 'ফেব',   hours: 35 },
  { month: 'মার্চ', hours: 45 },
  { month: 'এপ্রিল', hours: 52 },
];

const statsData = [
  { icon: Zap,       label: 'মোট দক্ষতা পয়েন্ট', value: '450', change: '+15%', iconClass: 'stat-icon-amber' },
  { icon: Calendar,  label: 'স্ট্রিক (দিন)',       value: '12',  change: '+3',   iconClass: 'stat-icon-blue' },
  { icon: Target,    label: 'সম্পূর্ণ লক্ষ্য',     value: '8/15', change: '53%', iconClass: 'stat-icon-violet' },
  { icon: TrendingUp,label: 'সামগ্রিক অগ্রগতি',    value: '58%',  change: '+8%', iconClass: 'stat-icon-green' },
];

const achievements = [
  { emoji: '🎓', name: 'প্রথম কোর্স',    desc: 'প্রথম কোর্স সম্পূর্ণ করুন',      locked: false },
  { emoji: '🔥', name: '৭ দিন স্ট্রিক',  desc: '৭ দিন ধারাবাহিক শিক্ষা',        locked: false },
  { emoji: '⭐', name: '১০০ ঘন্টা',      desc: '১০০ ঘন্টা শিক্ষা সম্পূর্ণ করুন', locked: true },
  { emoji: '🚀', name: 'দ্রুত শিক্ষার্থী', desc: 'সপ্তাহে ২০+ ঘন্টা শিক্ষা',       locked: true },
];

const Analytics = () => (
  <div className="space-y-8 max-w-7xl">

    {/* ── Header ─────────────────────────────────────────── */}
    <div
      className="relative rounded-3xl p-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(14,116,144,0.4) 0%, rgba(30,64,175,0.4) 50%, rgba(76,29,149,0.35) 100%)',
        border: '1px solid rgba(6,182,212,0.2)',
      }}
    >
      <div className="relative">
        <p className="type-label text-cyan-300/70 mb-2">পরিসংখ্যান</p>
        <h1 className="type-h1 text-white mb-2">বিশ্লেষণ ও পরিসংখ্যান</h1>
        <p className="text-slate-400">আপনার শিক্ষার অগ্রগতি এবং কর্মক্ষমতা ট্র্যাক করুন</p>
      </div>
    </div>

    {/* ── Stats Cards ──────────────────────────────────────── */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map(({ icon: Icon, label, value, change, iconClass }) => (
        <div key={label} className="glass-card rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="type-label text-slate-500">{label}</p>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconClass}`}>
              <Icon size={16} className="text-white" />
            </div>
          </div>
          <p className="text-2xl font-black text-white tabular-nums">{value}</p>
          <p className="text-xs flex items-center gap-1 text-emerald-400 font-semibold">
            <ArrowUpRight size={12} />{change} এই মাসে
          </p>
        </div>
      ))}
    </div>

    {/* ── Charts row ───────────────────────────────────────── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Weekly progress bar chart */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="type-h3 text-white mb-6">সাপ্তাহিক অগ্রগতি</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weeklyProgress} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="day" stroke="#475569" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8', paddingTop: '12px' }} />
            <Bar dataKey="hours" fill="url(#blueGrad)" name="শিক্ষা ঘন্টা" radius={[6,6,0,0]} />
            <Bar dataKey="tasks" fill="url(#violetGrad)" name="সম্পূর্ণ কাজ" radius={[6,6,0,0]} />
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="violetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Skill distribution pie */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="type-h3 text-white mb-6">দক্ষতা বিতরণ</h3>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="55%" height={220}>
            <PieChart>
              <Pie data={skillDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {skillDistribution.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} stroke="rgba(0,0,0,0)" />
                ))}
              </Pie>
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {skillDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}80` }} />
                <span className="text-sm text-slate-400 flex-1">{item.name}</span>
                <span className="text-sm font-semibold text-white tabular-nums">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* ── Learning trend line chart ─────────────────────────── */}
    <div className="glass-card rounded-2xl p-6">
      <h3 className="type-h3 text-white mb-6">শিক্ষা প্রবণতা</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={learningTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltipStyle} />
          <defs>
            <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 2 }}
            name="সাপ্তাহিক শিক্ষা ঘন্টা"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* ── Achievements ──────────────────────────────────────── */}
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="type-h3 text-white">অর্জন</h3>
        <Award size={18} className="text-amber-400" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((a) => (
          <div
            key={a.name}
            className="rounded-xl p-4 text-center transition-all duration-200"
            style={{
              background: a.locked ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
              border: a.locked ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(245,158,11,0.2)',
              opacity: a.locked ? 0.5 : 1,
            }}
          >
            <div className="text-3xl mb-2" style={{ filter: a.locked ? 'grayscale(100%)' : 'none' }}>{a.emoji}</div>
            <p className="text-sm font-semibold text-white mb-1">{a.name}</p>
            <p className="text-xs text-slate-500 leading-snug">{a.desc}</p>
            {a.locked && (
              <p className="text-xs text-slate-600 mt-1 font-medium">🔒 লক</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Analytics;
