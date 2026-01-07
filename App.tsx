import React, { useState } from 'react';
import Monster from './components/Monster';
import InfoPanel from './components/InfoPanel';
import { MONSTER_DATA } from './constants';
import { PartId, HealedState } from './types';
import { Info, Trophy, Sparkles, Code, Github, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [activePart, setActivePart] = useState<PartId | null>(null);
  const [hoveredPart, setHoveredPart] = useState<PartId | null>(null);
  
  // Track which parts have been turned into human (healed)
  const [healedParts, setHealedParts] = useState<HealedState>({
    head: false,
    torso: false,
    leftArm: false,
    rightArm: false,
    legs: false
  });

  // Track which part is currently animating (transforming)
  const [healingPart, setHealingPart] = useState<PartId | null>(null);

  const handlePartClick = (id: PartId) => {
    if (!healingPart) {
      setActivePart(id);
    }
  };

  const handleClose = () => {
    setActivePart(null);
  };

  const handleGameWin = () => {
    if (!activePart) return;
    
    const partToHeal = activePart;
    setActivePart(null); // Close modal immediately to show animation
    setHealingPart(partToHeal); // Trigger animation on Monster component

    // Wait for animation to finish before swapping to human part
    setTimeout(() => {
      setHealedParts(prev => ({
        ...prev,
        [partToHeal]: true
      }));
      setHealingPart(null);
    }, 1500); // Must match CSS animation duration
  };

  const isAllHealed = Object.values(healedParts).every(Boolean);

  return (
    <div className="min-h-screen bg-[#121212] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black text-white overflow-hidden relative selection:bg-monster-skin selection:text-black">
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-monster-skin drop-shadow-lg font-mono">
            {isAllHealed ? 'MODERN' : 'LEGACY PHP'}<br/>
            <span className="text-white text-3xl md:text-5xl">{isAllHealed ? 'DEVELOPER' : 'CODEBASE'}</span>
          </h1>
          <p className="mt-2 text-gray-400 max-w-md pointer-events-auto">
            {isAllHealed 
              ? "You've completely refactored the monster! The codebase is now clean and maintainable." 
              : "A Love Story. Play the mini-games to refactor the monster into a modern developer."}
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <a 
              href="https://dev.to/suckup_de/legacy-codebase-a-love-story-21p3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-monster-skin transition-colors border border-gray-800 hover:border-monster-skin rounded-full px-4 py-2"
              title="Read the original blog post"
            >
              <BookOpen size={16} /> Blog Post
            </a>
            <a 
              href="https://github.com/voku/LegacyPHP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-monster-skin transition-colors border border-gray-800 hover:border-monster-skin rounded-full px-4 py-2"
              title="View on GitHub"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
          {!isAllHealed && (
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 border border-gray-800 rounded-full px-4 py-1">
               <Info size={16} /> Hover and click body parts
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 px-4 relative z-0">
        
        <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl animate-float">
          <Monster 
            activePart={activePart}
            healingPart={healingPart}
            onPartClick={handlePartClick}
            onPartHover={setHoveredPart}
            healedParts={healedParts}
          />
        </div>

        {/* Hover Hint Label (Floating) */}
        {hoveredPart && !activePart && !healingPart && (
            <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 ${healedParts[hoveredPart] ? 'bg-blue-500' : 'bg-monster-skin'} text-black font-bold px-6 py-2 rounded-full shadow-lg animate-bounce`}>
                {MONSTER_DATA[hoveredPart].title} {healedParts[hoveredPart] && '✓'}
            </div>
        )}

      </main>

      {/* Overlay Modal */}
      {activePart && (
        <InfoPanel 
          data={MONSTER_DATA[activePart]} 
          onClose={handleClose}
          isHealed={healedParts[activePart]}
          onHeal={handleGameWin}
        />
      )}

      {/* Win Banner Overlay */}
      {isAllHealed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-gray-900 border-2 border-blue-500 rounded-2xl p-8 max-w-md w-full text-center shadow-[0_0_100px_rgba(59,130,246,0.4)] relative overflow-hidden animate-zoom-in">
            
            {/* Confetti/Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[20%] w-20 h-20 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[20%] w-20 h-20 bg-green-400 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-lg shadow-blue-500/30 transform hover:scale-110 transition-transform duration-500">
                        <Trophy size={48} className="text-white" strokeWidth={1.5} />
                    </div>
                </div>
                
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 mb-2 tracking-tight">
                    SYSTEM UPGRADED
                </h2>
                
                <div className="flex items-center justify-center gap-2 text-blue-300 font-mono text-sm mb-6 opacity-80">
                    <Code size={14} /> <span>Legacy Codebase Refactored</span>
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed">
                    Congratulations! You've successfully transformed the legacy monster into a modern, type-safe, and well-maintained developer.
                </p>

                <button 
                    onClick={() => window.location.reload()}
                    className="group relative px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Sparkles size={18} className="text-yellow-600" /> Start New Project
                    </span>
                    <div className="absolute inset-0 bg-blue-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
      
    </div>
  );
};

export default App;