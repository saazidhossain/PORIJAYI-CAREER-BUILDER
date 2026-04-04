import React from 'react';
import { TrendingUp, Clock, Target, BookOpen, Trophy, Zap } from 'lucide-react';
import useStore from '../store/store';
import ProgressCard from '../components/ProgressCard';
import TaskOverview from '../components/TaskOverview';

const Dashboard = () => {
  const { userProgress, roadmapTasks } = useStore();

  const stats = [
    {
      label: 'শিখা ঘন্টা',
      value: userProgress.totalHoursLearned,
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'দক্ষতা পয়েন্ট',
      value: userProgress.skillPoints,
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      label: 'সম্পূর্ণ কোর্স',
      value: userProgress.completedCourses,
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'লেভেল',
      value: userProgress.currentLevel,
      icon: Trophy,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const tasksCompleted = roadmapTasks.filter(t => t.status === 'completed').length;
  const tasksInProgress = roadmapTasks.filter(t => t.status === 'in-progress').length;
  const overallProgress = Math.round((tasksCompleted / roadmapTasks.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-2">স্বাগতম, শিক্ষার্থী! 👋</h1>
        <p className="text-slate-400 text-lg">আপনার Personal AI সিস্টেম তৈরির যাত্রা অব্যাহত রাখুন</p>
        <div className="mt-6 flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300">সামগ্রিক অগ্রগতি</span>
              <span className="text-white font-bold">{overallProgress}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Summary */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">কাজের সারাংশ</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{roadmapTasks.length}</div>
              <p className="text-slate-400 text-sm mt-2">মোট কাজ</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{tasksCompleted}</div>
              <p className="text-slate-400 text-sm mt-2">সম্পূর্ণ</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400">{tasksInProgress}</div>
              <p className="text-slate-400 text-sm mt-2">চলমান</p>
            </div>
          </div>
          <TaskOverview tasks={roadmapTasks.slice(0, 3)} />
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">দ্রুত টিপস 💡</h3>
          <div className="space-y-4">
            <div className="bg-blue-900 bg-opacity-30 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-200 font-semibold">প্রথম পদক্ষেপ</p>
              <p className="text-blue-300 text-sm mt-1">Python ইনস্টল করে শুরু করুন এবং Virtual Environment তৈরি করুন</p>
            </div>
            <div className="bg-green-900 bg-opacity-30 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-200 font-semibold">নিয়মিত শিখুন</p>
              <p className="text-green-300 text-sm mt-1">প্রতিদিন ২-३ ঘন্টা সময় বরাদ্দ করুন শেখার জন্য</p>
            </div>
            <div className="bg-purple-900 bg-opacity-30 border-l-4 border-purple-500 p-4 rounded">
              <p className="text-purple-200 font-semibold">ট্র্যাক করুন</p>
              <p className="text-purple-300 text-sm mt-1">প্রতিটি মাইলস্টোন ট্র্যাক করুন এবং প্রগতি দেখুন</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
