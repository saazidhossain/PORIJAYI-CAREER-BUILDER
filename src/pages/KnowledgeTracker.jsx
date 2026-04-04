import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ExternalLink } from 'lucide-react';
import useStore from '../store/store';

const KnowledgeTracker = () => {
  const { knowledge, addKnowledge } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'AI/ML', 'Python', 'Backend', 'Frontend', 'Database'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleAddKnowledge = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newItem = {
      id: Date.now(),
      title: formData.get('title'),
      category: formData.get('category'),
      level: formData.get('level'),
      progress: 0,
      importance: formData.get('importance'),
      resources: [
        { type: 'note', url: '#', title: 'আমার নোট' }
      ],
      notes: formData.get('notes'),
      dateAdded: new Date().toLocaleDateString('bn-BD'),
    };

    addKnowledge(newItem);
    e.target.reset();
    setShowForm(false);
  };

  const filteredKnowledge = selectedCategory === 'all'
    ? knowledge
    : knowledge.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">জ্ঞান ট্র্যাকার</h1>
          <p className="text-slate-400">আপনার শিক্ষা যাত্রা ট্র্যাক করুন এবং সংগঠিত করুন</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          <Plus size={20} />
          <span>নতুন টপিক যোগ করুন</span>
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">নতুন জ্ঞান আইটেম</h3>
          <form onSubmit={handleAddKnowledge} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="টপিক শিরোনাম"
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                required
              />
              <select
                name="category"
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">ক্যাটেগরি নির্বাচন করুন</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Python">Python</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="level"
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">লেভেল নির্বাচন করুন</option>
                <option value="beginner">শুরু</option>
                <option value="intermediate">মধ্যম</option>
                <option value="advanced">উন্নত</option>
              </select>
              <select
                name="importance"
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="normal">গুরুত্ব</option>
                <option value="high">উচ্চ</option>
                <option value="medium">মাঝারি</option>
                <option value="low">কম</option>
              </select>
            </div>

            <textarea
              name="notes"
              placeholder="নোট এবং বর্ণনা..."
              rows="3"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                যোগ করুন
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                বাতিল করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 bg-slate-800 border border-slate-700 rounded-xl p-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === category.toLowerCase()
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Knowledge Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredKnowledge.length === 0 ? (
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <p className="text-slate-400 text-lg">এখনও কোন জ্ঞান আইটেম যোগ করা হয়নি</p>
          </div>
        ) : (
          filteredKnowledge.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded-full">{item.category}</span>
                    <span className="text-xs px-2 py-1 bg-purple-600 text-white rounded-full">{item.level}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-slate-700 rounded transition-colors">
                    <Edit2 size={16} className="text-slate-400 hover:text-white" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded transition-colors">
                    <Trash2 size={16} className="text-slate-400 hover:text-red-400" />
                  </button>
                </div>
              </div>

              {item.notes && (
                <p className="text-slate-400 text-sm mb-4">{item.notes}</p>
              )}

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">বোঝা</span>
                  <span className="text-xs font-bold text-white">{item.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Resources */}
              <div>
                <p className="text-xs text-slate-400 mb-2">সংস্থান</p>
                <div className="flex flex-wrap gap-2">
                  {item.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      className="flex items-center space-x-1 text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                    >
                      <span>{resource.title}</span>
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KnowledgeTracker;
