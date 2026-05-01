import React from 'react';
import {
  BarChart3,
  BookMarked,
  Map,
  Target,
  Menu,
  ChevronLeft,
  Settings,
  LogOut,
  Zap,
  Brain,
} from 'lucide-react';

const menuItems = [
  {
    id: 'dashboard',
    label: 'ড্যাশবোর্ড',
    icon: BarChart3,
    description: 'সামগ্রিক অগ্রগতি',
  },
  {
    id: 'roadmap',
    label: 'রোডম্যাপ',
    icon: Map,
    description: 'পর্যায়ক্রমিক পরিকল্পনা',
  },
  {
    id: 'tracker',
    label: 'জ্ঞান ট্র্যাকার',
    icon: BookMarked,
    description: 'শিখেছি তথ্য ট্র্যাক',
  },
  {
    id: 'courses',
    label: 'কোর্স লাইব্রেরি',
    icon: Target,
    description: 'সম্পূর্ণ কোর্স ও সম্পদ',
  },
  {
    id: 'analytics',
    label: 'বিশ্লেষণ',
    icon: Zap,
    description: 'বিস্তারিত পরিসংখ্যান',
  },
];

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  return (
    <aside
      className="relative z-20 flex flex-col h-screen flex-shrink-0 transition-all duration-300"
      style={{
        width: isOpen ? '240px' : '68px',
        background: 'linear-gradient(180deg, rgba(10,22,40,0.97) 0%, rgba(5,10,24,0.98) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* ── Logo ─────────────────────────────────── */}
      <div
        className="flex items-center px-4 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', minHeight: '72px' }}
      >
        <div className="flex items-center gap-3 flex-1 overflow-hidden">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', boxShadow: '0 0 16px rgba(59,130,246,0.4)' }}
          >
            <Brain size={18} className="text-white" />
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm leading-tight gradient-text-blue" style={{ whiteSpace: 'nowrap' }}>
                PORIJAYI
              </p>
              <p className="text-xs text-slate-500" style={{ whiteSpace: 'nowrap' }}>
                Career Builder
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          aria-label="Toggle sidebar"
        >
          {isOpen
            ? <ChevronLeft size={14} className="text-slate-400" />
            : <Menu size={14} className="text-slate-400" />
          }
        </button>
      </div>

      {/* ── Navigation ───────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              title={!isOpen ? item.label : undefined}
              className={`
                group w-full flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer
                ${isActive ? 'nav-active' : 'hover:bg-white/5'}
              `}
              style={{ padding: isOpen ? '10px 12px' : '10px' }}
            >
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'stat-icon-blue'
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} />
              </span>
              {isOpen && (
                <div className="text-left overflow-hidden flex-1">
                  <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{item.description}</p>
                </div>
              )}
              {isActive && isOpen && (
                <span
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', boxShadow: '0 0 6px #3b82f6' }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Section Divider ───────────────────────── */}
      <div className="mx-4">
        <div className="divider" />
      </div>

      {/* ── Bottom nav ───────────────────────────── */}
      <div className="py-4 px-3 space-y-1">
        <button
          onClick={() => setCurrentPage('settings')}
          title={!isOpen ? 'সেটিংস' : undefined}
          className={`
            group w-full flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer
            ${currentPage === 'settings' ? 'nav-active' : 'hover:bg-white/5'}
          `}
          style={{ padding: isOpen ? '10px 12px' : '10px' }}
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all">
            <Settings size={16} className="text-slate-400 group-hover:text-slate-200" />
          </span>
          {isOpen && <span className="text-sm font-semibold text-slate-300 group-hover:text-white">সেটিংস</span>}
        </button>

        <button
          title={!isOpen ? 'লগআউট' : undefined}
          className="group w-full flex items-center gap-3 rounded-xl hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
          style={{ padding: isOpen ? '10px 12px' : '10px' }}
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-red-500/15 transition-all">
            <LogOut size={16} className="text-slate-400 group-hover:text-red-400" />
          </span>
          {isOpen && <span className="text-sm font-semibold text-slate-300 group-hover:text-red-400">লগআউট</span>}
        </button>
      </div>

      {/* ── User profile ─────────────────────────── */}
      {isOpen && (
        <div
          className="mx-3 mb-4 rounded-xl p-3 flex items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', boxShadow: '0 0 10px rgba(59,130,246,0.4)' }}
          >
            আ
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-semibold text-white truncate">শিক্ষার্থী</p>
            <p className="text-xs text-slate-500 truncate">লেভেল ১</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
