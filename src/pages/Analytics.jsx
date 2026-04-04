import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Target, Zap } from 'lucide-react';

const Analytics = () => {
  // Sample data
  const weeklyProgress = [
    { day: 'সোম', hours: 2, tasks: 1 },
    { day: 'মঙ্গল', hours: 3, tasks: 2 },
    { day: 'বুধ', hours: 2.5, tasks: 1 },
    { day: 'বৃহ', hours: 4, tasks: 3 },
    { day: 'শুক্র', hours: 3.5, tasks: 2 },
    { day: 'শনি', hours: 5, tasks: 4 },
    { day: 'রবি', hours: 2, tasks: 1 },
  ];

  const skillDistribution = [
    { name: 'Python', value: 35, color: '#3b82f6' },
    { name: 'AI/ML', value: 25, color: '#8b5cf6' },
    { name: 'Backend', value: 20, color: '#10b981' },
    { name: 'Frontend', value: 15, color: '#f59e0b' },
    { name: 'Database', value: 5, color: '#ef4444' },
  ];

  const learningTrend = [
    { month: 'জানু', hours: 20 },
    { month: 'ফেব', hours: 35 },
    { month: 'মার্চ', hours: 45 },
    { month: 'এপ্রিল', hours: 52 },
  ];

  const stats = [
    { icon: Zap, label: 'মোট দক্ষতা পয়েন্ট', value: '450', change: '+15%' },
    { icon: Calendar, label: 'স্ট্রিক (দিন)', value: '12', change: '+3' },
    { icon: Target, label: 'সম্পূর্ণ লক্ষ্য', value: '8/15', change: '53%' },
    { icon: TrendingUp, label: 'সামগ্রিক অগ্রগতি', value: '58%', change: '+8%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-2">বিশ্লেষণ এবং পরিসংখ্যান</h1>
        <p className="text-slate-400">আপনার শিক্ষার অগ্রগতি এবং কর্মক্ষমতা ট্র্যাক করুন</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                <Icon size={20} className="text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <p className="text-sm text-green-400">{stat.change} এই মাসে</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">সাপ্তাহিক অগ্রগতি</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="hours" fill="#3b82f6" name="শিক্ষা ঘন্টা" radius={[8, 8, 0, 0]} />
              <Bar dataKey="tasks" fill="#8b5cf6" name="সম্পূর্ণ কাজ" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Distribution */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">দক্ষতা বিতরণ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {skillDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Learning Trend */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">শিক্ষা প্রবণতা</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={learningTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 6 }}
              activeDot={{ r: 8 }}
              name="সাপ্তাহিক শিক্ষা ঘন্টা"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Achievement Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">অর্জন 🏆</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { emoji: '🎓', name: 'প্রথম কোর্স', desc: 'প্রথম কোর্স সম্পূর্ণ করুন' },
            { emoji: '🔥', name: '७ দিন স্ট্রিক', desc: '৭ দিন ধরাবাহিক শিক্ষা' },
            { emoji: '⭐', name: '১০০ ঘন্টা', desc: '১০০ ঘন্টা শিক্ষা সম্পূর্ণ করুন' },
            { emoji: '🚀', name: 'দ্রুত শিক্ষার্থী', desc: 'সপ্তাহে ২০+ ঘন্টা শিক্ষা' },
          ].map((achievement) => (
            <div key={achievement.name} className="bg-slate-700 bg-opacity-50 rounded-lg p-4 text-center hover:bg-opacity-75 transition-all">
              <div className="text-3xl mb-2">{achievement.emoji}</div>
              <p className="text-white font-semibold text-sm">{achievement.name}</p>
              <p className="text-slate-400 text-xs mt-1">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
