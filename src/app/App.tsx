import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { DashboardPage } from './components/DashboardPage';
import { Shield } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');
  const [elderMode, setElderMode] = useState(false);

  const handleStartProtection = () => {
    setCurrentPage('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef5f7] via-[#ffe3ec] to-[#ffd4e3]">
      {/* Elder Mode Toggle - Fixed position on all pages */}
      <div className="fixed top-6 right-6 z-[60]">
        <button
          onClick={() => setElderMode(!elderMode)}
          className={`${
            elderMode ? 'px-8 py-5 text-2xl' : 'px-6 py-4 text-lg'
          } bg-white/90 backdrop-blur-sm border-2 border-[#ff9eb7] rounded-full text-[#5a2e3e] hover:bg-[#ff9eb7] hover:text-white transition-all duration-300 font-bold shadow-lg shadow-[#ff9eb7]/20 hover:shadow-xl hover:shadow-[#ff9eb7]/30 hover:scale-105 active:scale-95`}
          aria-label={elderMode ? 'Elder Mode is ON - Click to turn off' : 'Elder Mode is OFF - Click to turn on'}
          title={elderMode ? 'Elder Mode is ON - Click to turn off larger text and controls' : 'Click to enable Elder Mode for larger text and controls'}
        >
          {elderMode ? '👴 Elder Mode ON' : '🔍 Elder Mode'}
        </button>
      </div>

      {/* Page Routing */}
      {currentPage === 'landing' && (
        <LandingPage elderMode={elderMode} onStartProtection={handleStartProtection} />
      )}

      {currentPage === 'dashboard' && <DashboardPage elderMode={elderMode} onBackToHome={handleBackToLanding} />}
    </div>
  );
}