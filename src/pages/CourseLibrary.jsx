import React, { useState } from 'react';
import { Play, BookOpen, FileText, Code, Award, Star, Clock, Users } from 'lucide-react';

const CourseLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Python এবং AI Fundamentals',
      description: 'Python থেকে শুরু করে Basic AI Concepts পর্যন্ত সবকিছু',
      category: 'python',
      difficulty: 'beginner',
      duration: '4 সপ্তাহ',
      modules: [
        {
          title: 'অধ্যায় ১: Python বেসিক',
          lessons: [
            'ইনস্টলেশন এবং Environment সেটআপ',
            'ভেরিয়েবল এবং ডেটা টাইপ',
            'লুপ এবং কন্ডিশনাল',
            'ফাংশন এবং মডিউল',
          ],
        },
        {
          title: 'অধ্যায় २: Advanced Python',
          lessons: [
            'OOP Concepts',
            'Exception Handling',
            'File I/O',
            'Regular Expressions',
          ],
        },
      ],
      resources: [
        { type: 'video', name: 'Python Complete Tutorial' },
        { type: 'article', name: 'Official Python Docs' },
        { type: 'code', name: 'Code Examples Repository' },
      ],
      rating: 4.8,
      students: 2450,
      progress: 0,
    },
    {
      id: 2,
      title: 'Ollama এবং Local LLM',
      description: 'স্থানীয় AI মডেল সেটআপ এবং ব্যবহার করুন',
      category: 'ai',
      difficulty: 'intermediate',
      duration: '2 সপ্তাহ',
      modules: [
        {
          title: 'অধ্যায় ১: Ollama সেটআপ',
          lessons: [
            'Ollama ইনস্টলেশন',
            'মডেল ডাউনলোডিং',
            'সার্ভার কনফিগারেশন',
            'প্রথম Query পাঠানো',
          ],
        },
      ],
      resources: [
        { type: 'video', name: 'Ollama Setup Guide' },
        { type: 'article', name: 'Model Selection Guide' },
      ],
      rating: 4.7,
      students: 1200,
      progress: 20,
    },
    {
      id: 3,
      title: 'FastAPI দিয়ে REST API',
      description: 'শক্তিশালী REST API তৈরি করুন FastAPI দিয়ে',
      category: 'backend',
      difficulty: 'intermediate',
      duration: '3 সপ্তাহ',
      modules: [
        {
          title: 'অধ্যায় ১: FastAPI বেসিক',
          lessons: [
            'প্রথম অ্যাপ্লিকেশন',
            'রুট এবং এন্ডপয়েন্ট',
            'Request এবং Response',
            'ডেটা ভ্যালিডেশন',
          ],
        },
      ],
      resources: [
        { type: 'video', name: 'FastAPI Tutorial' },
        { type: 'article', name: 'FastAPI Documentation' },
      ],
      rating: 4.9,
      students: 1850,
      progress: 0,
    },
    {
      id: 4,
      title: 'React এবং Frontend Development',
      description: 'আধুনিক Frontend তৈরি করুন React দিয়ে',
      category: 'frontend',
      difficulty: 'intermediate',
      duration: '4 সপ্তাহ',
      modules: [
        {
          title: 'অধ্যায় ১: React বেসিক',
          lessons: [
            'JSX এবং Components',
            'Props এবং State',
            'Hooks',
            'Forms এবং Validation',
          ],
        },
      ],
      resources: [
        { type: 'video', name: 'React Complete Guide' },
        { type: 'code', name: 'Project Examples' },
      ],
      rating: 4.8,
      students: 3200,
      progress: 0,
    },
    {
      id: 5,
      title: 'Database এবং SQL',
      description: 'ডেটাবেস ডিজাইন এবং SQL শেখুন',
      category: 'database',
      difficulty: 'beginner',
      duration: '3 সপ্তাহ',
      modules: [
        {
          title: 'অধ্যায় ১: SQL Basics',
          lessons: [
            'Table তৈরি',
            'SELECT Queries',
            'INSERT, UPDATE, DELETE',
            'Joins এবং Relationships',
          ],
        },
      ],
      resources: [
        { type: 'article', name: 'SQL Tutorial' },
        { type: 'code', name: 'Query Examples' },
      ],
      rating: 4.6,
      students: 1500,
      progress: 0,
    },
    {
      id: 6,
      title: 'Docker এবং Deployment',
      description: 'অ্যাপ্লিকেশন containerize এবং ডিপ্লয় করুন',
      category: 'deployment',
      difficulty: 'advanced',
      duration: '2 সপ্তাহ',
      modules: [
        {
          title: 'অধ্যায় ১: Docker বেসিক',
          lessons: [
            'Docker ইনস্টলেশন',
            'Dockerfile লেখা',
            'Images এবং Containers',
            'Docker Compose',
          ],
        },
      ],
      resources: [
        { type: 'video', name: 'Docker Mastery' },
        { type: 'article', name: 'Docker Best Practices' },
      ],
      rating: 4.7,
      students: 980,
      progress: 0,
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

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-600';
      case 'intermediate':
        return 'bg-yellow-600';
      case 'advanced':
        return 'bg-red-600';
      default:
        return 'bg-slate-600';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'শুরু';
      case 'intermediate':
        return 'মধ্যম';
      case 'advanced':
        return 'উন্নত';
      default:
        return 'অজানা';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-2">কোর্স লাইব্রেরি</h1>
        <p className="text-slate-400">সম্পূর্ণ শিক্ষা পরিকল্পনা এবং সংস্থান</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 bg-slate-800 border border-slate-700 rounded-xl p-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-300 group cursor-pointer"
          >
            {/* Course Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 flex items-center justify-center">
              <Play size={48} className="text-white opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white flex-1">{course.title}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded ${getDifficultyColor(course.difficulty)} text-white whitespace-nowrap ml-2`}>
                  {getDifficultyText(course.difficulty)}
                </span>
              </div>

              <p className="text-slate-400 text-sm mb-4">{course.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-slate-700">
                <div className="text-center">
                  <Clock size={16} className="text-slate-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">{course.duration}</p>
                </div>
                <div className="text-center">
                  <Users size={16} className="text-slate-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">{course.students}</p>
                </div>
                <div className="text-center">
                  <Star size={16} className="text-yellow-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">{course.rating}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">অগ্রগতি</span>
                  <span className="text-xs font-bold text-white">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Module Count */}
              <div className="flex items-center space-x-2 text-sm text-slate-400 mb-4">
                <BookOpen size={16} />
                <span>{course.modules.length} অধ্যায়</span>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-all">
                {course.progress > 0 ? 'চালিয়ে যান' : 'শুরু করুন'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLibrary;
