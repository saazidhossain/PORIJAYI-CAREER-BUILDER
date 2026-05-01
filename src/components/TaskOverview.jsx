import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import useStore from '../store/store';

const statusConfig = {
  completed:   { icon: CheckCircle2, color: 'text-emerald-400', label: 'সম্পূর্ণ' },
  'in-progress': { icon: Clock,       color: 'text-amber-400',   label: 'চলমান' },
  pending:     { icon: Circle,       color: 'text-slate-500',   label: 'অপেক্ষমাণ' },
};

const TaskOverview = ({ tasks }) => {
  const { updateTaskStatus } = useStore();

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const completedItems = task.checklist.filter((i) => i.completed).length;
        const progress = Math.round((completedItems / task.checklist.length) * 100);
        const cfg = statusConfig[task.status] || statusConfig.pending;
        const Icon = cfg.icon;

        return (
          <div
            key={task.id}
            className="group rounded-xl p-4 cursor-pointer transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            }}
            onClick={() => {
              if (task.status === 'pending') updateTaskStatus(task.id, 'in-progress');
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <Icon size={18} className={`${cfg.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="text-sm font-semibold text-white truncate">{task.title}</h4>
                  <span
                    className={`badge flex-shrink-0 ${
                      task.priority === 'high' ? 'badge-red' : 'badge-slate'
                    }`}
                  >
                    {task.priority === 'high' ? 'উচ্চ' : 'সাধারণ'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{task.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 progress-bar h-1.5">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs font-semibold text-slate-400 tabular-nums flex-shrink-0">
                {completedItems}/{task.checklist.length}
              </span>
              <ArrowRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskOverview;
