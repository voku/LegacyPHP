import React, { useState, useEffect, useRef } from 'react';
import { MonsterPartData } from '../types';
import { X, Brain, Heart, Wrench, Shield, Footprints, Play, CheckCircle, ChevronDown, Bug, FileCode, Search, Terminal, AlertTriangle, Database, ArrowRight, GitMerge, Check, Zap, GitBranch, HelpCircle } from 'lucide-react';

interface InfoPanelProps {
  data: MonsterPartData | null;
  onClose: () => void;
  isHealed: boolean;
  onHeal: () => void;
}

// --- MINI GAMES COMPONENTS ---

// THEME: Analysis & Thinking (Head)
// GAME: "Stack Trace Detective"
const HeadGame = ({ onWin }: { onWin: () => void }) => {
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');

  const scenarios = [
    {
      id: 1,
      question: "CRITICAL ERROR! The application threw a 'DivisionByZeroError'. Click the stack frame where the code actually crashed.",
      frames: [
        { id: 0, text: "#0 /src/Legacy/Reports/PdfGenerator.php(203): calc_totals()", correct: true },
        { id: 1, text: "#1 /src/Service/ReportService.php(45): Legacy\\Reports\\PdfGenerator->generate()", correct: false },
        { id: 2, text: "#2 /src/Controller/AdminController.php(88): App\\Service\\ReportService->monthlyReport()", correct: false },
        { id: 3, text: "#3 /public/index.php(15): App\\Kernel->handle()", correct: false },
      ]
    },
    {
      id: 2,
      question: "We need to debug a logic error. Click on the 'Service' layer where the business rules are applied.",
      frames: [
        { id: 0, text: "#0 /vendor/doctrine/orm/lib/Doctrine/ORM/UnitOfWork.php(300): commit()", correct: false },
        { id: 1, text: "#1 /src/Repository/UserRepository.php(50): Doctrine\\ORM\\EntityRepository->save()", correct: false },
        { id: 2, text: "#2 /src/Service/UserRegistrationService.php(112): App\\Repository\\UserRepository->add()", correct: true },
        { id: 3, text: "#3 /src/Controller/RegisterController.php(34): App\\Service\\UserRegistrationService->register()", correct: false },
      ]
    },
    {
      id: 3,
      question: "Identify the entry point of the request. Click on the file that initialized the entire process.",
      frames: [
        { id: 0, text: "#0 /src/Legacy/Auth/LoginHandler.php(20): session_start()", correct: false },
        { id: 1, text: "#1 /src/Controller/SecurityController.php(15): Legacy\\Auth\\LoginHandler::check()", correct: false },
        { id: 2, text: "#2 /src/Core/Router.php(88): App\\Controller\\SecurityController->login()", correct: false },
        { id: 3, text: "#3 /public/legacy_router.php(5): App\\Core\\Router->dispatch()", correct: true },
      ]
    }
  ];

  const handleFrameClick = (isCorrect: boolean) => {
    if (feedback !== 'idle') return;

    if (isCorrect) {
      setFeedback('success');
      setTimeout(() => {
        if (round < scenarios.length - 1) {
          setRound(r => r + 1);
          setFeedback('idle');
        } else {
          onWin();
        }
      }, 1000);
    } else {
      setFeedback('error');
      const container = document.getElementById('stack-game');
      container?.classList.add('animate-shake');
      setTimeout(() => {
          container?.classList.remove('animate-shake');
          setFeedback('idle');
      }, 800);
    }
  };

  const currentScenario = scenarios[round];

  return (
    <div id="stack-game" className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <div className="text-center">
        <h4 className="text-xl font-bold text-monster-skin flex items-center justify-center gap-2">
            <Search size={20} /> Stack Trace Detective
        </h4>
        <p className="text-gray-400 text-sm mt-2 min-h-[40px]">{currentScenario.question}</p>
        <div className="flex gap-1 justify-center mt-3">
            {scenarios.map((_, idx) => (
                <div key={idx} className={`h-2 w-8 rounded-full transition-colors ${idx < round ? 'bg-green-500' : idx === round ? 'bg-monster-skin' : 'bg-gray-700'}`} />
            ))}
        </div>
      </div>
      
      <div className="w-full bg-gray-950 rounded-lg overflow-hidden border border-gray-800 shadow-2xl font-mono text-xs md:text-sm">
        <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
           <div className="w-3 h-3 rounded-full bg-red-500"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
           <div className="w-3 h-3 rounded-full bg-green-500"></div>
           <span className="ml-2 text-gray-500">php-fpm.log</span>
        </div>
        
        <div className="flex flex-col">
            {currentScenario.frames.map((frame, idx) => (
                <button
                    key={idx}
                    onClick={() => handleFrameClick(frame.correct)}
                    disabled={feedback !== 'idle'}
                    className={`
                        text-left p-3 border-b border-gray-800/50 hover:bg-gray-900 transition-colors flex gap-3
                        ${feedback === 'success' && frame.correct ? 'bg-green-900/30 text-green-400' : ''}
                        ${feedback === 'error' && !frame.correct ? 'opacity-50' : 'text-gray-300'}
                    `}
                >
                    <span className="text-gray-600 shrink-0 select-none">#{frame.id}</span>
                    <span className="break-all">{frame.text}</span>
                    {feedback === 'success' && frame.correct && <Check size={16} className="text-green-500 shrink-0 ml-auto" />}
                </button>
            ))}
            <div className="p-3 text-gray-600 italic">
                {feedback === 'error' && <span className="text-red-500 flex items-center gap-2 animate-in fade-in"><AlertTriangle size={14}/> Wrong frame! Read the stack trace carefully.</span>}
                {feedback === 'idle' && "Waiting for input..."}
                {feedback === 'success' && <span className="text-green-500 flex items-center gap-2 animate-in fade-in"><Check size={14}/> Correct! Analyzing next trace...</span>}
            </div>
        </div>
      </div>
    </div>
  );
};

// THEME: Patience & Refactoring (Torso)
// GAME: "Refactoring Strategy Quiz"
const TorsoGame = ({ onWin }: { onWin: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const questions = [
    {
      question: "You encounter a massive 'God Class' (3000+ lines) that works but is ugly. You need to add a small feature. What is the best approach?",
      options: [
        { text: "Rewrite the entire class from scratch immediately.", correct: false, explanation: "Big rewrites often fail and introduce regressions. Avoid 'The Big Rewrite' unless absolutely necessary." },
        { text: "Add the feature inside the class as a private method.", correct: false, explanation: "This just increases technical debt and makes the 'God Class' larger." },
        { text: "Extract the logic needed for the feature into a new class, then inject it.", correct: true, explanation: "Correct! Use the 'Strangler Fig' pattern to incrementally improve the system." }
      ]
    },
    {
      question: "A critical legacy module has zero tests, and you need to refactor it. What is your first step?",
      options: [
        { text: "Write 'Characterization Tests' (Golden Master) to capture current behavior.", correct: true, explanation: "Correct! You must ensure you don't break existing behavior before changing the code structure." },
        { text: "Start refactoring and testing manually.", correct: false, explanation: "Manual testing is error-prone and slow. You need automated safety nets." },
        { text: "Delete it and replace it with a 3rd party library.", correct: false, explanation: "Replacing critical logic without understanding it is extremely risky." }
      ]
    },
    {
      question: "The team wants to stop all feature development for 3 months to rewrite the legacy core. Do you agree?",
      options: [
        { text: "Yes, it's the only way to fix the mess.", correct: false, explanation: "Stops feature delivery and business value. The rewrite often takes longer than expected." },
        { text: "No, advocate for continuous, incremental refactoring while shipping features.", correct: true, explanation: "Correct! Refactoring should be part of the daily workflow, not a separate 'project'." },
        { text: "Yes, but only if we use a new trendy framework.", correct: false, explanation: "Changing frameworks doesn't solve architectural problems automatically." }
      ]
    }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setIsAnswered(false);
          setFeedback(null);
        } else {
          onWin();
        }
      }, 2000);
    } else {
      const container = document.getElementById('quiz-container');
      container?.classList.add('animate-shake');
      setTimeout(() => container?.classList.remove('animate-shake'), 500);
      
      // Allow retry after delay
      setTimeout(() => {
          setIsAnswered(false);
          setFeedback(null);
      }, 2500);
    }
  };

  const q = questions[currentQuestion];

  return (
    <div id="quiz-container" className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="text-center">
        <h4 className="text-xl font-bold text-red-500 flex items-center justify-center gap-2">
            <Heart size={20} /> Refactoring Strategy
        </h4>
        <p className="text-gray-400 text-sm">Make the right decision for the legacy codebase.</p>
        <div className="flex gap-1 justify-center mt-2">
            {questions.map((_, idx) => (
                <div key={idx} className={`h-2 w-8 rounded-full transition-colors ${idx < currentQuestion ? 'bg-green-500' : idx === currentQuestion ? 'bg-red-500' : 'bg-gray-700'}`} />
            ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl w-full">
        <h5 className="text-lg text-white font-semibold mb-4">{q.question}</h5>
        
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.correct)}
              disabled={isAnswered}
              className={`
                w-full text-left p-4 rounded-lg border transition-all relative overflow-hidden group
                ${isAnswered && opt.correct ? 'bg-green-900/40 border-green-500' : ''}
                ${isAnswered && !opt.correct && feedback === 'wrong' ? 'opacity-50' : ''}
                ${!isAnswered ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-gray-500' : ''}
              `}
            >
              <div className="relative z-10 flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 
                    ${isAnswered && opt.correct ? 'border-green-500 bg-green-500 text-black' : 'border-gray-500'}
                `}>
                    {isAnswered && opt.correct && <Check size={12} strokeWidth={4} />}
                </div>
                <span className={`${isAnswered && opt.correct ? 'text-green-100' : 'text-gray-200'}`}>
                    {opt.text}
                </span>
              </div>
              
              {/* Reveal Explanation if this was the clicked answer or if it's the correct answer after a wrong guess (optional, here just showing feedback on click) */}
              {isAnswered && opt.correct && (
                  <div className="mt-3 text-xs text-green-300 pl-8 border-l-2 border-green-500/30 animate-in fade-in slide-in-from-top-2">
                      <span className="font-bold">Why:</span> {opt.explanation}
                  </div>
              )}
               {isAnswered && !opt.correct && feedback === 'wrong' && (
                  <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-20">
                      {/* Dim wrong answers */}
                  </div>
              )}
            </button>
          ))}
        </div>
        
        {feedback === 'wrong' && (
             <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm flex items-center gap-2 animate-in fade-in">
                 <AlertTriangle size={16} /> Incorrect strategy. Try again.
             </div>
        )}
      </div>
    </div>
  );
};

// THEME: The 5 Core Steps
// GAME: "Refactoring Pipeline" (Ordering)
const LeftArmGame = ({ onWin }: { onWin: () => void }) => {
  const correctOrder = [
    { id: 1, text: 'Analyze' },
    { id: 2, text: 'Write Test' },
    { id: 3, text: 'Refactor' },
    { id: 4, text: 'Static Check' },
    { id: 5, text: 'Commit' }
  ];
  
  const [items, setItems] = useState(() => [...correctOrder].sort(() => Math.random() - 0.5));
  const [nextExpected, setNextExpected] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  
  const handleClick = (id: number) => {
    if (id === nextExpected) {
        // Correct
        const newNext = nextExpected + 1;
        setNextExpected(newNext);
        setCompleted([...completed, id]);
        
        // Remove item from pool
        setItems(prev => prev.filter(item => item.id !== id));

        if (newNext > 5) onWin();
    } else {
        // Wrong
        const btn = document.getElementById(`step-btn-${id}`);
        btn?.classList.add('bg-red-500', 'shake');
        setTimeout(() => btn?.classList.remove('bg-red-500', 'shake'), 400);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h4 className="text-xl font-bold text-yellow-500 flex items-center justify-center gap-2">
            <Wrench size={20} /> The Refactoring Pipeline
        </h4>
        <p className="text-gray-400 text-sm">Click the steps in the correct logical order.</p>
      </div>

      <div className="w-full flex justify-between items-center px-4 mb-2 relative">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10"></div>
         {correctOrder.map(step => (
             <div 
                key={step.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${completed.includes(step.id) ? 'bg-yellow-500 border-yellow-500 text-black scale-110' : 'bg-gray-900 border-gray-700 text-gray-500'}`}
             >
                 {completed.includes(step.id) ? <Check size={14} /> : step.id}
             </div>
         ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center max-w-sm min-h-[160px]">
        {items.map(item => (
           <button 
             key={item.id}
             id={`step-btn-${item.id}`}
             onClick={() => handleClick(item.id)}
             className="px-4 py-3 bg-gray-800 border-b-2 border-yellow-600 rounded hover:bg-yellow-500/20 active:scale-95 transition-all text-sm font-bold w-full max-w-[140px] animate-in fade-in zoom-in"
           >
             {item.text}
           </button>
        ))}
        {items.length === 0 && (
            <div className="text-yellow-400 font-bold text-lg animate-bounce flex items-center gap-2">
                <CheckCircle /> PROCESS COMPLETE
            </div>
        )}
      </div>
    </div>
  );
};

// THEME: Modern Tools & Standards
// GAME: "Type Safety Match" (Memory Card)
const RightArmGame = ({ onWin }: { onWin: () => void }) => {
  const concepts = [
    { id: 't1', label: 'list<int>', type: 'concept', match: 'v1' },
    { id: 'v1', label: '[0, 1, 2]', type: 'value', match: 't1' },
    
    { id: 't2', label: 'array{a: int}', type: 'concept', match: 'v2' },
    { id: 'v2', label: "['a' => 1]", type: 'value', match: 't2' },
    
    { id: 't3', label: 'callable', type: 'concept', match: 'v3' },
    { id: 'v3', label: 'fn() => true', type: 'value', match: 't3' },
    
    { id: 't4', label: 'generator', type: 'concept', match: 'v4' },
    { id: 'v4', label: 'yield $i;', type: 'value', match: 't4' },
  ];

  const [cards, setCards] = useState<{id: string, label: string, type: string, match: string, flipped: boolean, solved: boolean}[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const deck = [...concepts]
      .sort(() => Math.random() - 0.5)
      .map((c) => ({ ...c, flipped: false, solved: false }));
    setCards(deck);
  }, []);

  const handleCardClick = (index: number) => {
    if (selected === index || cards[index].solved || cards[index].flipped) return;
    
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (selected === null) {
      setSelected(index);
    } else {
      const card1 = newCards[selected];
      const card2 = newCards[index];

      if (card1.match === card2.id) {
         newCards[selected].solved = true;
         newCards[index].solved = true;
         setCards(newCards);
         setSelected(null);
         if (newCards.every(c => c.solved)) setTimeout(onWin, 500);
      } else {
         setTimeout(() => {
            const resetCards = [...cards];
            if (!resetCards[selected].solved) resetCards[selected].flipped = false;
            if (!resetCards[index].solved) resetCards[index].flipped = false;
            setCards(resetCards);
            setSelected(null);
         }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center">
        <h4 className="text-xl font-bold text-blue-400 flex items-center justify-center gap-2">
            <Shield size={20} /> Type Safety Match
        </h4>
        <p className="text-gray-400 text-sm">Pair the strict types with their values.</p>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-sm perspective-1000">
        {cards.map((card, idx) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              disabled={card.solved}
              className={`
                aspect-square rounded border flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 transform-style-3d overflow-hidden break-words p-1
                ${card.flipped || card.solved 
                    ? 'bg-blue-900/50 border-blue-400 rotate-y-0' 
                    : 'bg-gray-800 border-gray-600 rotate-y-180 hover:bg-gray-700'
                }
                ${card.solved ? 'opacity-50 cursor-default' : 'cursor-pointer'}
              `}
            >
                {(card.flipped || card.solved) ? (
                    <span className={`animate-in fade-in ${card.type === 'concept' ? 'text-blue-300 font-mono leading-tight' : 'text-white font-mono leading-tight'}`}>
                        {card.label}
                    </span>
                ) : (
                    <span className="text-gray-600 text-xl font-mono">?</span>
                )}
            </button>
        ))}
      </div>
    </div>
  );
};

// THEME: Fixing & Preventing
// GAME: "Git Guru Challenge" (Knowledge Check)
const LegsGame = ({ onWin }: { onWin: () => void }) => {
  const questions = [
    {
      scenario: "You committed 'WIP' to main by mistake. You need to undo the commit but keep your work staged.",
      options: [
        { cmd: "git reset --hard HEAD~1", correct: false },
        { cmd: "git revert HEAD", correct: false },
        { cmd: "git reset --soft HEAD~1", correct: true }
      ]
    },
    {
       scenario: "You created a new local branch and need to push it to the remote, establishing a tracking relationship.",
       options: [
         { cmd: "git push -u origin feature-branch", correct: true },
         { cmd: "git remote add origin feature-branch", correct: false },
         { cmd: "git checkout -b feature-branch", correct: false }
       ]
    },
    {
        scenario: "You need a critical hotfix from the 'develop' branch applied immediately to your 'release' branch.",
        options: [
            { cmd: "git merge develop --force", correct: false },
            { cmd: "git cherry-pick <commit-hash>", correct: true },
            { cmd: "git rebase develop", correct: false }
        ]
    }
  ];

  const [qIndex, setQIndex] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');

  const handleGuess = (isCorrect: boolean) => {
      if (feedback !== 'idle') return;

      if (isCorrect) {
          setFeedback('success');
          setTimeout(() => {
              if (qIndex < questions.length - 1) {
                  setQIndex(prev => prev + 1);
                  setFeedback('idle');
              } else {
                  onWin();
              }
          }, 1000);
      } else {
          setFeedback('error');
          setTimeout(() => setFeedback('idle'), 800);
          
          // Shake effect
          const container = document.getElementById('git-game');
          container?.classList.add('animate-shake');
          setTimeout(() => container?.classList.remove('animate-shake'), 400);
      }
  };

  const currentQ = questions[qIndex];

  return (
    <div id="git-game" className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
         <div className="text-center">
            <h4 className="text-xl font-bold text-orange-500 flex items-center justify-center gap-2">
                <GitBranch size={20} /> Git Guru Challenge
            </h4>
            <p className="text-gray-400 text-sm">Select the correct command to fix the scenario.</p>
         </div>

         <div className="w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-xl font-mono text-sm">
            {/* Title Bar */}
            <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-xs ml-2">bash — 80x24</div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <div className="text-gray-300">
                    <span className="text-green-500">dev@legacy:~$</span> git status
                    <br/>
                    <span className="text-blue-400"># Scenario:</span> {currentQ.scenario}
                </div>

                <div className="space-y-2 mt-4">
                    <div className="text-gray-500 text-xs mb-1">Select the command to run:</div>
                    {currentQ.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleGuess(opt.correct)}
                            disabled={feedback !== 'idle'}
                            className={`
                                w-full text-left px-3 py-2 rounded border border-gray-700 transition-all
                                ${feedback === 'idle' ? 'hover:bg-gray-800 hover:border-gray-500 text-gray-300' : ''}
                                ${feedback === 'success' && opt.correct ? 'bg-green-900/50 border-green-500 text-green-200' : ''}
                                ${feedback === 'error' && !opt.correct ? 'opacity-50' : ''}
                            `}
                        >
                            <span className="text-gray-500">$</span> {opt.cmd}
                        </button>
                    ))}
                </div>
                
                {/* Status Line */}
                <div className="h-6 mt-2">
                    {feedback === 'success' && <span className="text-green-500 animate-pulse flex items-center gap-2"><Check size={14}/> Command executed successfully.</span>}
                    {feedback === 'error' && <span className="text-red-500 flex items-center gap-2"><X size={14}/> Error: Command failed.</span>}
                </div>
            </div>
         </div>
         
         {/* Progress Dots */}
         <div className="flex gap-2">
            {questions.map((_, idx) => (
                <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === qIndex ? 'bg-orange-500' : idx < qIndex ? 'bg-green-500' : 'bg-gray-700'}`}></div>
            ))}
         </div>
    </div>
  );
};


const InfoPanel: React.FC<InfoPanelProps> = ({ data, onClose, isHealed, onHeal }) => {
  const [view, setView] = useState<'content' | 'game'>('content');
  const [expandedPoint, setExpandedPoint] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  if (!data) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain': return <Brain className="w-8 h-8 text-monster-skin" />;
      case 'heart': return <Heart className="w-8 h-8 text-red-500" />;
      case 'wrench': return <Wrench className="w-8 h-8 text-yellow-500" />;
      case 'shield': return <Shield className="w-8 h-8 text-blue-400" />;
      case 'footprints': return <Footprints className="w-8 h-8 text-orange-400" />;
      default: return null;
    }
  };

  const triggerClose = () => {
      setIsClosing(true);
      setTimeout(() => {
          onClose();
          setIsClosing(false); 
      }, 200);
  };

  const handleGameWin = () => {
      setIsClosing(true);
      setTimeout(() => {
          onHeal();
      }, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
          triggerClose();
      }
  };

  const togglePoint = (index: number) => {
      setExpandedPoint(expandedPoint === index ? null : index);
  };

  const renderGame = () => {
      switch (data.id) {
          case 'head': return <HeadGame onWin={handleGameWin} />;
          case 'torso': return <TorsoGame onWin={handleGameWin} />;
          case 'leftArm': return <LeftArmGame onWin={handleGameWin} />;
          case 'rightArm': return <RightArmGame onWin={handleGameWin} />;
          case 'legs': return <LegsGame onWin={handleGameWin} />;
          default: return <div>Game not found</div>;
      }
  };

  return (
    <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={handleBackdropClick}
    >
      <div 
        className={`bg-gray-900 border-2 ${isHealed ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.3)]' : 'border-monster-skin shadow-[0_0_50px_rgba(139,195,74,0.3)]'} rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col shadow-2xl ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}
        role="dialog"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md p-6 border-b border-gray-800 flex justify-between items-start z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gray-800 rounded-full border ${isHealed ? 'border-blue-500' : 'border-gray-700'}`}>
              {isHealed ? <CheckCircle className="w-8 h-8 text-blue-500" /> : renderIcon(data.icon)}
            </div>
            <div>
              <h2 id="modal-title" className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                {data.title}
                {isHealed && <span className="text-xs bg-blue-600 px-2 py-0.5 rounded text-white font-mono animate-in fade-in slide-in-from-left-2">REFACTORED</span>}
              </h2>
              <p className={isHealed ? "text-blue-400 font-medium" : "text-monster-skin font-medium"}>
                  {isHealed ? "Modernized Component" : data.subtitle}
              </p>
            </div>
          </div>
          <button 
            onClick={triggerClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 grow flex flex-col min-h-[400px]">
          
          {view === 'content' ? (
              <div key="content" className="flex flex-col grow slide-up-fade">
                <div className="prose prose-invert max-w-none grow">
                    <p className="text-lg text-gray-300 leading-relaxed mb-8 border-l-4 border-gray-700 pl-4 italic">
                    {data.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className={isHealed ? "text-blue-500" : "text-monster-skin"}>⚡</span> Key Takeaways
                    </h3>
                    
                    <div className="space-y-3">
                    {data.points.map((point, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-800/50 rounded overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer group"
                            onClick={() => togglePoint(index)}
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-2 h-2 rounded-full shrink-0 ${isHealed ? 'bg-blue-400 shadow-[0_0_8px_#60A5FA]' : 'bg-monster-highlight shadow-[0_0_8px_#C6FF00]'}`}></span>
                                        <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                                            {point.summary}
                                        </span>
                                    </div>
                                    <ChevronDown 
                                        size={18} 
                                        className={`text-gray-400 transition-transform duration-300 ${expandedPoint === index ? 'rotate-180' : ''}`}
                                    />
                                </div>
                                <div 
                                    className={`accordion-content ${expandedPoint === index ? 'open' : ''}`}
                                >
                                    <div className="accordion-inner pt-2">
                                        <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-700 pt-2">
                                            {point.detail}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                {!isHealed && (
                    <div className="mt-8 flex justify-center pt-6 border-t border-gray-800">
                        <button 
                            onClick={() => setView('game')}
                            className="group flex items-center gap-2 px-8 py-4 bg-monster-skin hover:bg-monster-skinDark text-black font-bold text-lg rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(139,195,74,0.4)]"
                        >
                            <Play size={20} fill="currentColor" className="group-hover:translate-x-1 transition-transform" /> Refactor This Part
                        </button>
                    </div>
                )}
                {isHealed && (
                    <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded text-center text-blue-200 animate-in fade-in zoom-in-95 delay-150">
                        <p>This part of the codebase is now clean and modern.</p>
                    </div>
                )}
              </div>
          ) : (
              <div key="game" className="flex flex-col h-full slide-right-fade">
                  <div className="grow flex items-center justify-center min-h-[300px]">
                     {renderGame()}
                  </div>
                  <div className="flex justify-center mt-6 pt-6 border-t border-gray-800">
                       <button 
                         onClick={() => setView('content')}
                         className="text-gray-400 hover:text-white flex items-center gap-2 hover:underline underline-offset-4"
                       >
                           Cancel Refactoring
                       </button>
                  </div>
              </div>
          )}

        </div>

        {/* Footer decoration */}
        <div className={`h-2 w-full transition-colors duration-500 ${isHealed ? 'bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700' : 'bg-gradient-to-r from-monster-skinDark via-monster-skin to-monster-skinDark'}`}></div>
      </div>
    </div>
  );
};

export default InfoPanel;