import React, { useState } from 'react';
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
    roadmap:   <Roadmap />,
    tracker:   <KnowledgeTracker />,
    courses:   <CourseLibrary />,
    analytics: <Analytics />,
    settings:  <Settings />,
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#030712' }}>
      {/* Ambient background blobs */}
      <div className="ambient-bg" />

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="relative flex-1 overflow-y-auto z-10">
        <div className="p-6 md:p-8 min-h-full" key={currentPage}>
          <div className="page-enter">
            {pages[currentPage]}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
