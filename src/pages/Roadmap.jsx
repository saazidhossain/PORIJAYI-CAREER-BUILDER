import React, { useState } from 'react';
import {
  Filter, CheckCircle2, Circle, Clock, ChevronDown,
  ExternalLink, Play, Flag,
} from 'lucide-react';
import useStore from '../store/store';

const phaseColors = {
  1: { badge: 'badge-blue',   bar: '#3b82f6', dot: '#3b82f6',  label: 'সেটআপ' },
  2: { badge: 'badge-violet', bar: '#8b5cf6', dot: '#8b5cf6',  label: 'কোর ডেভেলপমেন্ট' },
  3: { badge: 'badge-green',  bar: '#10b981', dot: '#10b981',  label: 'Advanced Features' },
  4: { badge: 'badge-amber',  bar: '#f59e0b', dot: '#f59e0b',  label: 'Deployment' },
};

const statusConfig = {
  pending:     { icon: Circle,       label: 'অপেক্ষমাণ', badgeClass: 'badge-slate' },
  'in-progress': { icon: Clock,       label: 'চলমান',     badgeClass: 'badge-amber' },
  completed:   { icon: CheckCircle2, label: 'সম্পূর্ণ',  badgeClass: 'badge-green' },
};

const Roadmap = () => {
  const { roadmapTasks, updateTaskStatus, updateTaskProgress } = useStore();
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [expandedTask, setExpandedTask] = useState(null);

  const phases = [1, 2, 3, 4];

  const filteredTasks = selectedPhase === 'all'
    ? roadmapTasks
    : roadmapTasks.filter((t) => t.phase === parseInt(selectedPhase));

  return (
    <div className="space-y-8 max-w-5xl">

      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30,64,175,0.5) 0%, rgba(76,29,149,0.4) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', transform: 'translate(20%, -30%)' }}
        />
        <div className="relative">
          <p className="type-label text-blue-300/70 mb-2">পরিকল্পনা</p>
          <h1 className="type-h1 text-white mb-2">পর্যায়ক্রমিক রোডম্যাপ</h1>
          <p className="text-slate-400">আপনার Personal AI সিস্টেম তৈরির সম্পূর্ণ পরিকল্পনা</p>
        </div>
      </div>

      {/* ── Phase Filters ────────────────────────────────────── */}
      <div
        className="flex flex-wrap gap-2 items-center p-4 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <Filter size={15} className="text-slate-500 mr-1" />
        {['all', ...phases.map(String)].map((val) => {
          const isActive = selectedPhase === val;
          const pc = phaseColors[parseInt(val)];
          return (
            <button
              key={val}
              onClick={() => setSelectedPhase(val)}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={isActive
                ? { background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff', boxShadow: '0 0 12px rgba(59,130,246,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {val === 'all' ? 'সব ফেজ' : `ফেজ ${val}`}
            </button>
          );
        })}
      </div>

      {/* ── Task List ────────────────────────────────────────── */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Flag size={32} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-base">এই ফেজে কোনো কাজ নেই</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const completedItems = task.checklist.filter((i) => i.completed).length;
            const progress = Math.round((completedItems / task.checklist.length) * 100);
            const isExpanded = expandedTask === task.id;
            const sc = statusConfig[task.status] || statusConfig.pending;
            const StatusIcon = sc.icon;
            const pc = phaseColors[task.phase] || phaseColors[1];

            return (
              <div
                key={task.id}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: isExpanded
                    ? '1px solid rgba(59,130,246,0.25)'
                    : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isExpanded ? '0 0 24px rgba(59,130,246,0.08)' : 'none',
                }}
              >
                {/* Task Header */}
                <button
                  onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                  className="w-full p-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors text-left"
                >
                  {/* Status icon */}
                  <StatusIcon
                    size={20}
                    className={`flex-shrink-0 mt-0.5 ${
                      task.status === 'completed'   ? 'text-emerald-400' :
                      task.status === 'in-progress' ? 'text-amber-400 animate-pulse' :
                      'text-slate-600'
                    }`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="type-h3 text-white">{task.title}</h3>
                      <span className={`badge ${sc.badgeClass}`}>{sc.label}</span>
                      <span className={`badge ${pc.badge}`}>ফেজ {task.phase}</span>
                      {task.priority === 'high' && (
                        <span className="badge badge-red">উচ্চ প্রাধান্য</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{task.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <div className="progress-bar h-1.5">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${pc.bar}, #8b5cf6)` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 tabular-nums">{completedItems}/{task.checklist.length}</span>
                    </div>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-slate-500 transition-transform duration-300 mt-1 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div
                    className="border-t p-6 space-y-5"
                    style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.25)' }}
                  >
                    {/* Checklist */}
                    <div>
                      <p className="type-label text-slate-500 mb-3">চেকলিস্ট</p>
                      <div className="space-y-2">
                        {task.checklist.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => updateTaskProgress(task.id, item.id)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200"
                            style={{
                              background: item.completed ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.03)',
                              border: item.completed ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.06)',
                            }}
                          >
                            {item.completed
                              ? <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                              : <Circle size={18} className="text-slate-600 flex-shrink-0" />
                            }
                            <span className={`text-sm ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                              {item.text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <p className="type-label text-slate-500 mb-3">সংস্থান</p>
                      <div className="flex flex-wrap gap-2">
                        {task.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.18)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; }}
                          >
                            <ExternalLink size={13} />
                            {resource}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-1">
                      {task.status === 'pending' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                          style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#fcd34d' }}
                        >
                          <Play size={14} /> শুরু করুন
                        </button>
                      )}
                      {task.status === 'in-progress' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                          className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                          style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#6ee7b7' }}
                        >
                          <CheckCircle2 size={14} /> সম্পূর্ণ করুন
                        </button>
                      )}
                      {task.status === 'completed' && (
                        <span className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold badge-green badge">
                          <CheckCircle2 size={14} /> সম্পূর্ণ হয়েছে
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Roadmap;
