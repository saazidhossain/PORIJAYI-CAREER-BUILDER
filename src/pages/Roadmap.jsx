import React, { useState } from 'react';
import { Filter, Plus, CheckCircle2, Circle, Clock } from 'lucide-react';
import useStore from '../store/store';

const Roadmap = () => {
  const { roadmapTasks, updateTaskStatus, updateTaskProgress } = useStore();
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [expandedTask, setExpandedTask] = useState(null);

  const phases = [
    { id: 1, name: 'ফেজ ১: সেটআপ', color: 'blue' },
    { id: 2, name: 'ফেজ २: কোর ডেভেলপমেন্ট', color: 'purple' },
    { id: 3, name: 'ফেজ ३: Advanced Features', color: 'green' },
    { id: 4, name: 'ফেজ ४: Deployment', color: 'orange' },
  ];

  const filteredTasks = selectedPhase === 'all'
    ? roadmapTasks
    : roadmapTasks.filter(task => task.phase === parseInt(selectedPhase));

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-slate-600', text: 'অপেক্ষমাণ', icon: Circle },
      'in-progress': { bg: 'bg-yellow-600', text: 'চলমান', icon: Clock },
      completed: { bg: 'bg-green-600', text: 'সম্পূর্ণ', icon: CheckCircle2 },
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} text-white`}>
        <Icon size={16} />
        <span>{badge.text}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-2">পর্যায়ক্রমিক রোডম্যাপ</h1>
        <p className="text-slate-400">আপনার Personal AI সিস্টেম তৈরির সম্পূর্ণ পরিকল্পনা</p>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4 bg-slate-800 border border-slate-700 rounded-xl p-4">
        <Filter size={20} className="text-slate-400" />
        <div className="space-x-2 flex flex-wrap">
          <button
            onClick={() => setSelectedPhase('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedPhase === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            সব ফেজ
          </button>
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id.toString())}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedPhase === phase.id.toString()
                  ? `bg-${phase.color}-600 text-white`
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              ফেজ {phase.id}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
            <p className="text-slate-400 text-lg">এই ফেজে কোন কাজ নেই</p>
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            const completedItems = task.checklist.filter(item => item.completed).length;
            const progress = Math.round((completedItems / task.checklist.length) * 100);
            const isExpanded = expandedTask === task.id;

            return (
              <div
                key={task.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-300"
              >
                {/* Task Header */}
                <button
                  onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                  className="w-full p-6 flex items-start justify-between hover:bg-slate-700 hover:bg-opacity-50 transition-colors"
                >
                  <div className="flex items-start space-x-4 flex-1 text-left">
                    <div className="mt-1">
                      {task.status === 'completed' ? (
                        <CheckCircle2 size={24} className="text-green-400" />
                      ) : task.status === 'in-progress' ? (
                        <Clock size={24} className="text-yellow-400 animate-pulse" />
                      ) : (
                        <Circle size={24} className="text-slate-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{task.title}</h3>
                        {getStatusBadge(task.status)}
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{completedItems}/{task.checklist.length} সম্পূর্ণ</span>
                        <div className="w-32 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>

                {/* Task Details */}
                {isExpanded && (
                  <div className="border-t border-slate-700 p-6 bg-slate-900 bg-opacity-50">
                    <div className="space-y-4">
                      {/* Checklist */}
                      <div>
                        <h4 className="text-white font-bold mb-3">চেকলিস্ট</h4>
                        <div className="space-y-2">
                          {task.checklist.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => updateTaskProgress(task.id, item.id)}
                              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700 transition-colors text-left"
                            >
                              <div className={`flex-shrink-0 ${item.completed ? 'text-green-400' : 'text-slate-500'}`}>
                                {item.completed ? (
                                  <CheckCircle2 size={20} />
                                ) : (
                                  <Circle size={20} />
                                )}
                              </div>
                              <span className={`${item.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                                {item.text}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div>
                        <h4 className="text-white font-bold mb-3">সংস্থান</h4>
                        <div className="flex flex-wrap gap-2">
                          {task.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href="#"
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
                            >
                              {resource}
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-4">
                        {task.status !== 'completed' && (
                          <>
                            {task.status === 'pending' && (
                              <button
                                onClick={() => updateTaskStatus(task.id, 'in-progress')}
                                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-semibold transition-colors"
                              >
                                শুরু করুন
                              </button>
                            )}
                            {task.status === 'in-progress' && (
                              <button
                                onClick={() => updateTaskStatus(task.id, 'completed')}
                                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-colors"
                              >
                                সম্পূর্ণ করুন
                              </button>
                            )}
                          </>
                        )}
                      </div>
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
