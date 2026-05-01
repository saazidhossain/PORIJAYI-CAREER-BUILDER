import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ExternalLink, BookOpen, X } from 'lucide-react';
import useStore from '../store/store';

const levelMap = {
  beginner:     { label: 'শুরু',    badgeClass: 'badge-green' },
  intermediate: { label: 'মধ্যম', badgeClass: 'badge-amber' },
  advanced:     { label: 'উন্নত',  badgeClass: 'badge-red' },
};

const KnowledgeTracker = () => {
  const { knowledge, addKnowledge } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'AI/ML', 'Python', 'Backend', 'Frontend', 'Database'];

  const handleAddKnowledge = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addKnowledge({
      id: Date.now(),
      title: formData.get('title'),
      category: formData.get('category'),
      level: formData.get('level'),
      progress: 0,
      importance: formData.get('importance'),
      resources: [{ type: 'note', url: '#', title: 'আমার নোট' }],
      notes: formData.get('notes'),
      dateAdded: new Date().toLocaleDateString('bn-BD'),
    });
    e.target.reset();
    setShowForm(false);
  };

  const filteredKnowledge = selectedCategory === 'all'
    ? knowledge
    : knowledge.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-7xl">

      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl p-8 overflow-hidden flex flex-wrap items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, rgba(5,46,22,0.6) 0%, rgba(6,78,59,0.4) 50%, rgba(4,47,46,0.4) 100%)',
          border: '1px solid rgba(16,185,129,0.2)',
        }}
      >
        <div>
          <p className="type-label text-emerald-300/70 mb-2">শিক্ষা যাত্রা</p>
          <h1 className="type-h1 text-white mb-2">জ্ঞান ট্র্যাকার</h1>
          <p className="text-slate-400">আপনার শিক্ষা যাত্রা ট্র্যাক করুন এবং সংগঠিত করুন</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
          style={{ background: 'linear-gradient(135deg,#059669,#10b981)', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
        >
          <Plus size={16} />
          নতুন টপিক যোগ করুন
        </button>
      </div>

      {/* ── Add Form Modal ───────────────────────────────────── */}
      {showForm && (
        <div
          className="rounded-2xl p-6 relative"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="type-h2 text-white">নতুন জ্ঞান আইটেম</h3>
            <button onClick={() => setShowForm(false)} className="btn-ghost p-2 rounded-xl">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleAddKnowledge} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="টপিক শিরোনাম"
                className="input-base"
                required
              />
              <select name="category" className="input-base" required>
                <option value="">ক্যাটেগরি নির্বাচন করুন</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Python">Python</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="Database">Database</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="level" className="input-base" required>
                <option value="">লেভেল নির্বাচন করুন</option>
                <option value="beginner">শুরু</option>
                <option value="intermediate">মধ্যম</option>
                <option value="advanced">উন্নত</option>
              </select>
              <select name="importance" className="input-base">
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
              className="input-base resize-none"
            />
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                className="btn-primary flex-1"
                style={{ background: 'linear-gradient(135deg,#059669,#10b981)', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
              >
                যোগ করুন
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost flex-1">
                বাতিল করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Category Filter ──────────────────────────────────── */}
      <div
        className="flex flex-wrap gap-2 p-4 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {categories.map((cat) => {
          const val = cat.toLowerCase();
          const isActive = selectedCategory === val;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(val)}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={isActive
                ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff', boxShadow: '0 0 12px rgba(59,130,246,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Knowledge Cards ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredKnowledge.length === 0 ? (
          <div
            className="lg:col-span-2 rounded-2xl p-12 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <BookOpen size={32} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">এখনও কোনো জ্ঞান আইটেম যোগ করা হয়নি</p>
            <p className="text-slate-600 text-sm mt-1">উপরে বোতাম ক্লিক করে শুরু করুন</p>
          </div>
        ) : (
          filteredKnowledge.map((item) => {
            const lvl = levelMap[item.level] || { label: item.level, badgeClass: 'badge-slate' };
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="type-h3 text-white mb-2">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge badge-blue">{item.category}</span>
                      <span className={`badge ${lvl.badgeClass}`}>{lvl.label}</span>
                      {item.importance === 'high' && <span className="badge badge-red">উচ্চ গুরুত্ব</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10">
                      <Edit2 size={14} className="text-slate-500 hover:text-slate-200" />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10">
                      <Trash2 size={14} className="text-slate-500 hover:text-red-400" />
                    </button>
                  </div>
                </div>

                {item.notes && (
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{item.notes}</p>
                )}

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500">বোঝার মাত্রা</span>
                    <span className="text-xs font-bold text-white tabular-nums">{item.progress}%</span>
                  </div>
                  <div className="progress-bar h-2">
                    <div className="progress-bar-fill" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <p className="text-xs text-slate-500 mb-2">সংস্থান</p>
                  <div className="flex flex-wrap gap-2">
                    {item.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#f8fafc'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; }}
                      >
                        <ExternalLink size={12} />
                        {resource.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default KnowledgeTracker;
