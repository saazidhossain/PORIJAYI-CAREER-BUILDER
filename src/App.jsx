import React, { useState } from 'react';
import { BookOpen, Zap, Target, Users, TrendingUp, Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import KnowledgeTracker from './pages/KnowledgeTracker';
import CourseLibrary from './pages/CourseLibrary';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = {
    dashboard: <Dashboard />,
    roadmap: <Roadmap />,
    tracker: <KnowledgeTracker />,
    courses: <CourseLibrary />,
    analytics: <Analytics />,
    settings: <Settings />,
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <div className="p-6 md:p-8">
          {pages[currentPage]}
        </div>
      </main>
    </div>
  );
}

export default App;
