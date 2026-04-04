import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import useStore from '../store/store';

const TaskOverview = ({ tasks }) => {
  const { updateTaskStatus, updateTaskProgress } = useStore();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-progress':
        return 'text-yellow-400';
      default:
        return 'text-slate-500';
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const completedItems = task.checklist.filter(item => item.completed).length;
        const progress = Math.round((completedItems / task.checklist.length) * 100);

        return (
          <div
            key={task.id}
            className="bg-slate-700 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all cursor-pointer"
            onClick={() => {
              if (task.status === 'pending') {
                updateTaskStatus(task.id, 'in-progress');
              }
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-1">
                  {task.status === 'completed' ? (
                    <CheckCircle size={20} className="text-green-400" />
                  ) : (
                    <Circle size={20} className="text-slate-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{task.title}</h4>
                  <p className="text-slate-400 text-sm">{task.description}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                task.priority === 'high' ? 'bg-red-900 text-red-200' : 'bg-slate-600 text-slate-200'
              }`}>
                {task.priority === 'high' ? 'উচ্চ' : 'সাধারণ'}
              </span>
            </div>
            <div className="ml-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">{completedItems}/{task.checklist.length} সম্পূর্ণ</span>
                <span className="text-xs font-semibold text-white">{progress}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskOverview;
