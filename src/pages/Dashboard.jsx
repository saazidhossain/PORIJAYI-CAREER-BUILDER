import React from 'react';
import { TrendingUp, Clock, Target, BookOpen, Trophy, Zap, Flame, ArrowUpRight } from 'lucide-react';
import useStore from '../store/store';
import TaskOverview from '../components/TaskOverview';

const StatCard = ({ label, value, icon: Icon, iconClass, change }) => (
  <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 group hover:shadow-card-hover transition-all duration-300">
    <div className="flex items-center justify-between">
      <p className="type-label text-slate-500">{label}</p>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass}`}>
        <Icon size={18} className="text-white" />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <span className="type-metric text-white">{value}</span>
      {change && (
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mb-1">
          <ArrowUpRight size={13} />
          {change}
        </span>
      )}
    </div>
  </div>
);

const TipCard = ({ color, title, text }) => {
  const colorMap = {
    blue:   { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  title: '#93c5fd', text: '#bfdbfe' },
    green:  { bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  title: '#6ee7b7', text: '#a7f3d0' },
    violet: { bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)',  title: '#c4b5fd', text: '#ddd6fe' },
    amber:  { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  title: '#fcd34d', text: '#fde68a' },
  };
  const c = colorMap[color] || colorMap.blue;
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <p className="text-sm font-semibold mb-1" style={{ color: c.title }}>{title}</p>
      <p className="text-xs leading-relaxed" style={{ color: c.text }}>{text}</p>
    </div>
  );
};

const Dashboard = () => {
  const { userProgress, roadmapTasks } = useStore();

  const tasksCompleted  = roadmapTasks.filter((t) => t.status === 'completed').length;
  const tasksInProgress = roadmapTasks.filter((t) => t.status === 'in-progress').length;
  const overallProgress = roadmapTasks.length > 0
    ? Math.round((tasksCompleted / roadmapTasks.length) * 100)
    : 0;

  const stats = [
    { label: 'শিখা ঘন্টা',    value: userProgress.totalHoursLearned, icon: Clock,    iconClass: 'stat-icon-blue',   change: null },
    { label: 'দক্ষতা পয়েন্ট', value: userProgress.skillPoints,      icon: Zap,     iconClass: 'stat-icon-amber',  change: null },
    { label: 'সম্পূর্ণ কোর্স', value: userProgress.completedCourses, icon: BookOpen, iconClass: 'stat-icon-green',  change: null },
    { label: 'লেভেল',          value: userProgress.currentLevel,     icon: Trophy,  iconClass: 'stat-icon-violet', change: null },
  ];

  return (
    <div className="space-y-8 max-w-7xl">

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30,58,138,0.6) 0%, rgba(91,33,182,0.4) 50%, rgba(6,78,59,0.3) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
        }}
      >
        {/* Decorative glow blobs */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', transform: 'translateY(30%)' }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <p className="type-label text-blue-300/70 mb-2">ব্যক্তিগত AI সিস্টেম</p>
              <h1 className="type-display text-white mb-2">
                স্বাগতম, শিক্ষার্থী! <span className="animate-float inline-block">👋</span>
              </h1>
              <p className="text-slate-400 text-base">আপনার Personal AI সিস্টেম তৈরির যাত্রা অব্যাহত রাখুন</p>
            </div>
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Flame size={22} className="text-amber-400" style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.6))' }} />
              <div>
                <p className="text-lg font-bold text-white tabular-nums">0</p>
                <p className="text-xs text-slate-400">দিনের ধারা</p>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="max-w-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">সামগ্রিক অগ্রগতি</span>
              <span className="text-sm font-bold text-white tabular-nums">{overallProgress}%</span>
            </div>
            <div className="progress-bar h-3">
              <div className="progress-bar-fill" style={{ width: `${overallProgress}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">{tasksCompleted} of {roadmapTasks.length} কাজ সম্পূর্ণ</p>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Main content row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Task Summary */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="type-h2 text-white">কাজের সারাংশ</h2>
            <TrendingUp size={18} className="text-slate-500" />
          </div>

          {/* Quick counters */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'মোট কাজ',  value: roadmapTasks.length, colorClass: 'text-blue-400',    bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.15)' },
              { label: 'সম্পূর্ণ', value: tasksCompleted,     colorClass: 'text-emerald-400', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.15)' },
              { label: 'চলমান',    value: tasksInProgress,    colorClass: 'text-amber-400',   bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.15)' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl py-4 text-center"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}
              >
                <p className={`text-3xl font-black tabular-nums mb-1 ${item.colorClass}`}>{item.value}</p>
                <p className="text-xs text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>

          <TaskOverview tasks={roadmapTasks.slice(0, 3)} />
        </div>

        {/* Quick Tips */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="type-h3 text-white mb-5 flex items-center gap-2">
            <span>দ্রুত টিপস</span>
            <span className="text-lg">💡</span>
          </h3>
          <div className="space-y-3">
            <TipCard
              color="blue"
              title="প্রথম পদক্ষেপ"
              text="Python ইনস্টল করে শুরু করুন এবং Virtual Environment তৈরি করুন"
            />
            <TipCard
              color="green"
              title="নিয়মিত শিখুন"
              text="প্রতিদিন ২–৩ ঘন্টা সময় বরাদ্দ করুন শেখার জন্য"
            />
            <TipCard
              color="violet"
              title="ট্র্যাক করুন"
              text="প্রতিটি মাইলস্টোন ট্র্যাক করুন এবং প্রগতি দেখুন"
            />
            <TipCard
              color="amber"
              title="কমিউনিটি"
              text="সমস্যায় পড়লে ফোরাম ও Discord-এ সাহায্য নিন"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
