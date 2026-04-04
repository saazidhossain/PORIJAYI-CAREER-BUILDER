import React from 'react';
import { 
  BarChart3, 
  BookMarked, 
  Map, 
  Target, 
  Menu, 
  X,
  Settings,
  LogOut,
  Zap
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'ড্যাশবোর্ড',
      icon: BarChart3,
      description: 'সামগ্রিক অগ্রগতি দেখুন'
    },
    {
      id: 'roadmap',
      label: 'রোডম্যাপ',
      icon: Map,
      description: 'পর্যায়ক্রমিক কাজ পরিকল্পনা'
    },
    {
      id: 'tracker',
      label: 'জ্ঞান ট্র্যাকার',
      icon: BookMarked,
      description: 'শিখেছি তথ্য ট্র্যাক করুন'
    },
    {
      id: 'courses',
      label: 'কোর্স লাইব্রেরি',
      icon: Target,
      description: 'সম্পূর্ণ কোর্স এবং সংস্থান'
    },
    {
      id: 'analytics',
      label: 'বিশ্লেষণ',
      icon: Zap,
      description: 'বিস্তারিত পরিসংখ্যান'
    },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700 flex flex-col transition-all duration-300 h-screen`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors w-full flex items-center justify-center"
        >
          {isOpen ? <X size={24} className="text-blue-400" /> : <Menu size={24} className="text-blue-400" />}
        </button>
        {isOpen && (
          <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mt-4">
            AI Career Builder
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title={!isOpen ? item.label : ''}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && (
                  <div className="text-left">
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
          <Settings size={20} />
          {isOpen && <span>সেটিংস</span>}
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-all">
          <LogOut size={20} />
          {isOpen && <span>লগআউট</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
