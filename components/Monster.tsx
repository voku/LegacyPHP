import React from 'react';
import { HealedState, PartId } from '../types';

interface MonsterProps {
  activePart: string | null;
  healingPart: string | null;
  onPartClick: (id: PartId) => void;
  onPartHover: (id: PartId | null) => void;
  healedParts: HealedState;
}

const Particles = () => {
  // Generate deterministic particles for explosion
  const particles = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * 360;
    // Randomize distance slightly
    const dist = 60 + Math.random() * 80; 
    const tx = Math.cos(angle * Math.PI / 180) * dist;
    const ty = Math.sin(angle * Math.PI / 180) * dist;
    
    // Pass custom properties for CSS animation
    const style = {
      '--tx': `${tx}px`,
      '--ty': `${ty}px`,
      animationDelay: `${0.2 + Math.random() * 0.3}s` // Delay start slightly to match dissolve
    } as React.CSSProperties;
    
    // Randomize size and colors (Code fragments)
    const size = 3 + Math.random() * 4;
    const color = i % 3 === 0 ? '#60A5FA' : i % 3 === 1 ? '#C6FF00' : '#FFFFFF';
    
    return (
      <rect 
        key={i} 
        width={size}
        height={size}
        fill={color} 
        className="particle"
        style={style}
        rx={1}
      />
    );
  });
  
  return (
    <g className="particles-group" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      {particles}
    </g>
  );
};

const Monster: React.FC<MonsterProps> = ({ activePart, healingPart, onPartClick, onPartHover, healedParts }) => {

  const getStyle = (id: PartId) => {
    const isActive = activePart === id;
    const isHealing = healingPart === id;
    const isHealed = healedParts[id];

    let classes = "monster-part transition-all duration-500 ";
    
    if (isHealing) {
      return classes + "refactoring";
    }
    
    if (isHealed) {
      // Adding explicit class for human animation
      return classes + "human-part-appear";
    }
    
    if (isActive) {
      return classes + "active";
    }
    
    return classes;
  };

  // --- HUMAN PARTS (Refactored Codebase) ---

  const HumanLegs = () => (
    <g transform="translate(0,0)">
       {/* Jeans */}
       <path d="M130 380 L130 560 L180 560 L180 420 L220 420 L220 560 L270 560 L270 380 Z" fill="#1565C0" stroke="#0D47A1" strokeWidth="2" />
       {/* Sneakers */}
       <path d="M120 560 L180 560 L180 590 L120 590 Z" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="2" />
       <path d="M220 560 L280 560 L280 590 L220 590 Z" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="2" />
       {/* Belt */}
       <rect x="130" y="370" width="140" height="15" fill="#3E2723" />
       <rect x="190" y="368" width="20" height="19" fill="#FFC107" rx="2" />
    </g>
  );

  const HumanTorso = () => (
    <g>
       {/* Hoodie */}
       <path d="M110 140 L290 140 L290 380 L110 380 Z" fill="#1976D2" stroke="#0D47A1" strokeWidth="2" rx="10" />
       {/* Hoodie Pocket */}
       <path d="M140 280 L260 280 L240 360 L160 360 Z" fill="#1565C0" />
       {/* React/Code Logo */}
       <circle cx="200" cy="220" r="25" fill="#E3F2FD" opacity="0.2" />
       <path d="M190 220 L200 230 L215 210" stroke="#E3F2FD" strokeWidth="3" fill="none" />
       {/* Strings */}
       <path d="M180 140 L180 200" stroke="#E3F2FD" strokeWidth="2" />
       <path d="M220 140 L220 200" stroke="#E3F2FD" strokeWidth="2" />
    </g>
  );

  const HumanRightArm = () => (
    <g>
       {/* Sleeve */}
       <path d="M280 140 L360 180 L360 250 L280 220 Z" fill="#1976D2" stroke="#0D47A1" strokeWidth="2" />
       {/* Skin Arm */}
       <path d="M290 220 L350 250 L360 350 L290 350 Z" fill="#FFCCBC" stroke="#E64A19" strokeWidth="1" />
       {/* Hand */}
       <circle cx="330" cy="350" r="25" fill="#FFCCBC" stroke="#E64A19" strokeWidth="1" />
       {/* Coffee Cup */}
       <path d="M315 330 L345 330 L340 370 L320 370 Z" fill="#D7CCC8" stroke="#5D4037" strokeWidth="1" />
    </g>
  );

  const HumanLeftArm = () => (
    <g>
       {/* Sleeve */}
       <path d="M120 140 L40 180 L40 250 L120 220 Z" fill="#1976D2" stroke="#0D47A1" strokeWidth="2" />
        {/* Skin Arm */}
       <path d="M110 220 L50 250 L40 350 L110 350 Z" fill="#FFCCBC" stroke="#E64A19" strokeWidth="1" />
       {/* Hand */}
       <circle cx="70" cy="350" r="25" fill="#FFCCBC" stroke="#E64A19" strokeWidth="1" />
       {/* Watch */}
       <rect x="55" y="340" width="30" height="10" fill="#212121" rx="2" />
    </g>
  );

  const HumanHead = () => (
    <g>
       {/* Neck */}
       <rect x="175" y="120" width="50" height="30" fill="#FFCCBC" />
       {/* Face */}
       <ellipse cx="200" cy="80" rx="55" ry="65" fill="#FFCCBC" stroke="#E64A19" strokeWidth="1" />
       {/* Hair */}
       <path d="M145 60 C145 20, 255 20, 255 60 C255 40, 260 90, 255 80 L255 60 Z" fill="#5D4037" /> 
       <path d="M150 60 Q 200 10 250 60" fill="#5D4037" />
       {/* Eyes */}
       <circle cx="180" cy="75" r="5" fill="#3E2723" className="eye-wink" /> {/* Left Eye (Viewer's Left) */}
       <circle cx="220" cy="75" r="5" fill="#3E2723" />
       {/* Glasses */}
       <path d="M165 75 L195 75 M205 75 L235 75" stroke="#37474F" strokeWidth="2" />
       <circle cx="180" cy="75" r="12" stroke="#37474F" strokeWidth="2" fill="none" />
       <circle cx="220" cy="75" r="12" stroke="#37474F" strokeWidth="2" fill="none" />
       <path d="M200 75 L200 78" stroke="#37474F" strokeWidth="2" />
       {/* Smile */}
       <path d="M185 110 Q 200 120 215 110" fill="none" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />
    </g>
  );


  // --- MONSTER PARTS (Legacy Codebase) ---
  
  const MonsterLegs = () => (
    <g>
        {/* Left Leg */}
        <rect x="130" y="380" width="50" height="180" fill="#37474F" stroke="#1a1a1a" strokeWidth="2"/>
        <rect x="120" y="560" width="70" height="30" rx="5" fill="#212121" />
        {/* Right Leg */}
        <rect x="220" y="380" width="50" height="180" fill="#37474F" stroke="#1a1a1a" strokeWidth="2"/>
        <rect x="210" y="560" width="70" height="30" rx="5" fill="#212121" />
        {/* Belt area */}
        <rect x="120" y="360" width="160" height="40" fill="#263238" />
        <rect x="180" y="360" width="40" height="40" fill="#455A64" stroke="#78909C" strokeWidth="2" />
        {/* Stitches */}
        <path d="M155 420 L155 450 M145 435 L165 435" stroke="#78909C" strokeWidth="2" />
    </g>
  );

  const MonsterRightArm = () => (
    <g>
        <path d="M280 140 L360 180 L360 350 L280 300 Z" fill="#37474F" stroke="#1a1a1a" strokeWidth="2" />
        <rect x="340" y="350" width="50" height="60" rx="10" fill="#8BC34A" stroke="#33691E" strokeWidth="2"/>
        <rect x="350" y="330" width="20" height="20" fill="#546E7A" />
    </g>
  );

  const MonsterLeftArm = () => (
    <g>
        <path d="M120 140 L40 180 L40 350 L120 300 Z" fill="#37474F" stroke="#1a1a1a" strokeWidth="2" />
        <rect x="10" y="350" width="50" height="60" rx="10" fill="#8BC34A" stroke="#33691E" strokeWidth="2"/>
        <rect x="15" y="360" width="10" height="40" fill="#424242" transform="rotate(-15 20 380)" />
    </g>
  );

  const MonsterTorso = () => (
    <g>
        <rect x="110" y="140" width="180" height="240" rx="10" fill="#455A64" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M110 140 L200 250 L290 140" fill="#37474F" opacity="0.5" />
        <path d="M200 140 L200 380" stroke="#263238" strokeWidth="2" strokeDasharray="5,5" />
        <circle cx="200" cy="200" r="30" fill="#263238" stroke="#78909C" strokeWidth="2" />
        <path d="M185 200 L215 200 M200 185 L200 215" stroke="#8BC34A" strokeWidth="2" className="animate-pulse" />
        <path d="M130 300 L180 300" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="140" y1="290" x2="140" y2="310" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="155" y1="290" x2="155" y2="310" stroke="#1a1a1a" strokeWidth="2" />
        <line x1="170" y1="290" x2="170" y2="310" stroke="#1a1a1a" strokeWidth="2" />
    </g>
  );

  const MonsterHead = () => (
    <g>
        <rect x="170" y="110" width="60" height="40" fill="#689F38" />
        <rect x="150" y="125" width="10" height="10" fill="#B0BEC5" />
        <rect x="240" y="125" width="10" height="10" fill="#B0BEC5" />
        <rect x="150" y="20" width="100" height="100" rx="10" fill="#8BC34A" stroke="#33691E" strokeWidth="2" />
        <path d="M150 20 L150 40 L160 30 L170 45 L180 30 L190 45 L200 30 L210 45 L220 30 L230 40 L250 40 L250 20 Z" fill="#212121" />
        
        {/* Left Eye Group (Wink Target) */}
        <g className="eye-wink">
          <circle cx="175" cy="70" r="8" fill="#FFF" />
          <circle cx="175" cy="70" r="3" fill="#000" />
        </g>

        <circle cx="225" cy="70" r="8" fill="#FFF" />
        <circle cx="225" cy="70" r="3" fill="#000" />
        <path d="M160 40 L190 45" stroke="#33691E" strokeWidth="2" />
        <line x1="165" y1="38" x2="165" y2="46" stroke="#33691E" strokeWidth="2" />
        <line x1="175" y1="39" x2="175" y2="47" stroke="#33691E" strokeWidth="2" />
        <line x1="185" y1="40" x2="185" y2="48" stroke="#33691E" strokeWidth="2" />
        <path d="M180 100 Q200 105 220 100" stroke="#33691E" strokeWidth="3" fill="none" />
    </g>
  );

  return (
    <svg 
      viewBox="0 0 400 600" 
      className="w-full h-full max-h-[80vh] drop-shadow-2xl"
      onMouseLeave={() => onPartHover(null)}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <pattern id="stitches" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
           <path d="M0,10 L20,10 M10,0 L10,20" stroke="#212121" strokeWidth="1" opacity="0.2"/>
        </pattern>
      </defs>

      {/* Background Aura */}
      <ellipse cx="200" cy="580" rx="160" ry="20" fill="rgba(0,0,0,0.5)" filter="url(#glow)" />

      <g 
        id="legs"
        className={getStyle('legs')}
        onClick={() => onPartClick('legs')}
        onMouseEnter={() => onPartHover('legs')}
      >
        {healedParts.legs ? <HumanLegs /> : <MonsterLegs />}
        {healingPart === 'legs' && <Particles />}
      </g>

      <g 
        id="rightArm"
        className={getStyle('rightArm')}
        onClick={() => onPartClick('rightArm')}
        onMouseEnter={() => onPartHover('rightArm')}
      >
        {healedParts.rightArm ? <HumanRightArm /> : <MonsterRightArm />}
        {healingPart === 'rightArm' && <Particles />}
      </g>

      <g 
        id="leftArm"
        className={getStyle('leftArm')}
        onClick={() => onPartClick('leftArm')}
        onMouseEnter={() => onPartHover('leftArm')}
      >
        {healedParts.leftArm ? <HumanLeftArm /> : <MonsterLeftArm />}
        {healingPart === 'leftArm' && <Particles />}
      </g>

      <g 
        id="torso"
        className={getStyle('torso')}
        onClick={() => onPartClick('torso')}
        onMouseEnter={() => onPartHover('torso')}
      >
        {healedParts.torso ? <HumanTorso /> : <MonsterTorso />}
        {healingPart === 'torso' && <Particles />}
      </g>

      <g 
        id="head"
        className={getStyle('head')}
        onClick={() => onPartClick('head')}
        onMouseEnter={() => onPartHover('head')}
      >
        {healedParts.head ? <HumanHead /> : <MonsterHead />}
        {healingPart === 'head' && <Particles />}
      </g>
      
      {/* Spark Effects (Decorative) - only if not fully healed */}
      {!Object.values(healedParts).every(Boolean) && (
        <g className="animate-pulse-slow opacity-30">
           <path d="M100 50 L120 80 L110 90 L130 120" stroke="#C6FF00" strokeWidth="2" fill="none" className="spark" />
           <path d="M300 50 L280 80 L290 90 L270 120" stroke="#C6FF00" strokeWidth="2" fill="none" className="spark" />
        </g>
      )}

    </svg>
  );
};

export default Monster;