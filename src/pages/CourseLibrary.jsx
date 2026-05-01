import React, { useState } from 'react';
import { Play, BookOpen, FileText, Code, Star, Clock, Users, ArrowRight, Award } from 'lucide-react';

const difficultyConfig = {
  beginner:     { label: 'শুরু',   badgeClass: 'badge-green' },
  intermediate: { label: 'মধ্যম', badgeClass: 'badge-amber' },
  advanced:     { label: 'উন্নত', badgeClass: 'badge-red' },
};

const categoryGradients = {
  python:     'linear-gradient(135deg,#1d4ed8,#3b82f6)',
  ai:         'linear-gradient(135deg,#6d28d9,#8b5cf6)',
  backend:    'linear-gradient(135deg,#047857,#10b981)',
  frontend:   'linear-gradient(135deg,#92400e,#f59e0b)',
  database:   'linear-gradient(135deg,#0e7490,#06b6d4)',
  deployment: 'linear-gradient(135deg,#9f1239,#f43f5e)',
};

const resourceIconMap = {
  video:   { icon: Play,     color: '#f43f5e' },
  article: { icon: FileText, color: '#60a5fa' },
  code:    { icon: Code,     color: '#34d399' },
};

const courses = [
  {
    id: 1, title: 'Python এবং AI Fundamentals',
    description: 'Python থেকে শুরু করে Basic AI Concepts পর্যন্ত সবকিছু',
    category: 'python', difficulty: 'beginner', duration: '৪ সপ্তাহ',
    modules: [{ title: 'অধ্যায় ১: Python বেসিক', lessons: ['ইনস্টলেশন এবং Environment', 'ভেরিয়েবল ও ডেটা টাইপ', 'লুপ ও কন্ডিশনাল', 'ফাংশন ও মডিউল'] }, { title: 'অধ্যায় ২: Advanced Python', lessons: ['OOP Concepts', 'Exception Handling', 'File I/O', 'Regular Expressions'] }],
    resources: [{ type: 'video', name: 'Python Complete Tutorial' }, { type: 'article', name: 'Official Python Docs' }, { type: 'code', name: 'Code Examples' }],
    rating: 4.8, students: 2450, progress: 0,
  },
  {
    id: 2, title: 'Ollama এবং Local LLM',
    description: 'স্থানীয় AI মডেল সেটআপ এবং ব্যবহার করুন',
    category: 'ai', difficulty: 'intermediate', duration: '২ সপ্তাহ',
    modules: [{ title: 'অধ্যায় ১: Ollama সেটআপ', lessons: ['Ollama ইনস্টলেশন', 'মডেল ডাউনলোড', 'সার্ভার কনফিগারেশন', 'প্রথম Query পাঠানো'] }],
    resources: [{ type: 'video', name: 'Ollama Setup Guide' }, { type: 'article', name: 'Model Selection Guide' }],
    rating: 4.7, students: 1200, progress: 20,
  },
  {
    id: 3, title: 'FastAPI দিয়ে REST API',
    description: 'শক্তিশালী REST API তৈরি করুন FastAPI দিয়ে',
    category: 'backend', difficulty: 'intermediate', duration: '৩ সপ্তাহ',
    modules: [{ title: 'অধ্যায় ১: FastAPI বেসিক', lessons: ['প্রথম অ্যাপ্লিকেশন', 'রুট ও এন্ডপয়েন্ট', 'Request ও Response', 'ডেটা ভ্যালিডেশন'] }],
    resources: [{ type: 'video', name: 'FastAPI Tutorial' }, { type: 'article', name: 'FastAPI Documentation' }],
    rating: 4.9, students: 1850, progress: 0,
  },
  {
    id: 4, title: 'React এবং Frontend Development',
    description: 'আধুনিক Frontend তৈরি করুন React দিয়ে',
    category: 'frontend', difficulty: 'intermediate', duration: '৪ সপ্তাহ',
    modules: [{ title: 'অধ্যায় ১: React বেসিক', lessons: ['JSX ও Components', 'Props ও State', 'Hooks', 'Forms ও Validation'] }],
    resources: [{ type: 'video', name: 'React Complete Guide' }, { type: 'code', name: 'Project Examples' }],
    rating: 4.8, students: 3200, progress: 0,
  },
  {
    id: 5, title: 'Database এবং SQL',
    description: 'ডেটাবেস ডিজাইন এবং SQL শেখুন',
    category: 'database', difficulty: 'beginner', duration: '৩ সপ্তাহ',
    modules: [{ title: 'অধ্যায় ১: SQL Basics', lessons: ['Table তৈরি', 'SELECT Queries', 'INSERT, UPDATE, DELETE', 'Joins ও Relationships'] }],
    resources: [{ type: 'article', name: 'SQL Tutorial' }, { type: 'code', name: 'Query Examples' }],
    rating: 4.6, students: 1500, progress: 0,
  },
  {
    id: 6, title: 'Docker এবং Deployment',
    description: 'অ্যাপ্লিকেশন containerize এবং ডিপ্লয় করুন',
    category: 'deployment', difficulty: 'advanced', duration: '২ সপ্তাহ',
    modules: [{ title: 'অধ্যায় ১: Docker বেসিক', lessons: ['Docker ইনস্টলেশন', 'Dockerfile লেখা', 'Images ও Containers', 'Docker Compose'] }],
    resources: [{ type: 'video', name: 'Docker Mastery' }, { type: 'article', name: 'Docker Best Practices' }],
    rating: 4.7, students: 980, progress: 0,
  },
];

const categories = [
  { id: 'all', label: 'সব কোর্স' },
  { id: 'python', label: 'Python' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'deployment', label: 'Deployment' },
];

const CourseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-7xl">

      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(91,33,182,0.5) 0%, rgba(30,58,138,0.4) 50%, rgba(6,78,59,0.3) 100%)',
          border: '1px solid rgba(139,92,246,0.2)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }}
        />
        <div className="relative">
          <p className="type-label text-violet-300/70 mb-2">শিক্ষা উপকরণ</p>
          <h1 className="type-h1 text-white mb-2">কোর্স লাইব্রেরি</h1>
          <p className="text-slate-400">সম্পূর্ণ শিক্ষা পরিকল্পনা এবং সংস্থান</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-sm text-slate-400">
              <BookOpen size={15} className="text-violet-400" />
              {courses.length} কোর্স
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-400">
              <Award size={15} className="text-blue-400" />
              সার্টিফিকেট সহ
            </span>
          </div>
        </div>
      </div>

      {/* ── Category Filter ──────────────────────────────────── */}
      <div
        className="flex flex-wrap gap-2 p-4 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={isActive
                ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff', boxShadow: '0 0 12px rgba(59,130,246,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Courses Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const dc = difficultyConfig[course.difficulty] || difficultyConfig.beginner;
          const grad = categoryGradients[course.category] || categoryGradients.python;
          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

          return (
            <div
              key={course.id}
              className="group glass-card rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Thumbnail */}
              <div
                className="relative h-36 flex items-center justify-center overflow-hidden"
                style={{ background: grad }}
              >
                <div className="absolute inset-0 opacity-30"
                  style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <Play size={24} className="text-white ml-1" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`badge ${dc.badgeClass}`}>{dc.label}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="type-h3 text-white mb-2 group-hover:text-blue-300 transition-colors">{course.title}</h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed flex-1">{course.description}</p>

                {/* Stats row */}
                <div
                  className="grid grid-cols-3 gap-2 mb-4 pb-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {[
                    { Icon: Clock, text: course.duration },
                    { Icon: Users, text: course.students.toLocaleString() },
                    { Icon: Star,  text: course.rating, color: '#fbbf24' },
                  ].map(({ Icon, text, color }, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Icon size={14} className="flex-shrink-0" style={{ color: color || '#64748b' }} />
                      <span className="text-xs text-slate-400">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500">{course.modules.length} অধ্যায় · {totalLessons} পাঠ</span>
                    <span className="text-xs font-bold text-white tabular-nums">{course.progress}%</span>
                  </div>
                  <div className="progress-bar h-1.5">
                    <div className="progress-bar-fill" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                {/* Resources */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.resources.map((r, idx) => {
                    const { icon: RIcon, color } = resourceIconMap[r.type] || resourceIconMap.article;
                    return (
                      <span
                        key={idx}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <RIcon size={11} style={{ color }} />
                        {r.name}
                      </span>
                    );
                  })}
                </div>

                {/* CTA */}
                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={course.progress > 0
                    ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#93c5fd' }
                    : { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff', boxShadow: '0 4px 12px rgba(59,130,246,0.25)' }
                  }
                >
                  {course.progress > 0 ? 'চালিয়ে যান' : 'শুরু করুন'}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseLibrary;
