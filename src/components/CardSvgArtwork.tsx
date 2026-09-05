import React from 'react';

interface CardSvgArtworkProps {
  letter: string;
  className?: string;
  isStackedDeck?: boolean;
}

export const CardSvgArtwork: React.FC<CardSvgArtworkProps> = ({ letter, className = '', isStackedDeck = false }) => {
  // Determine word grouping for the 3 words: I & MAP & CODE
  const wordGroup: 'I' | 'MAP' | 'CODE' =
    letter === 'I' ? 'I' : ['M', 'A', 'P'].includes(letter) ? 'MAP' : 'CODE';

  // Suit assignment:
  // ONLY top card 'E' has Spades! Other cards have randomized suits (Diamonds, Clubs, Hearts)
  let suitType: 'spade' | 'club' | 'heart' | 'diamond' = 'diamond';
  let isRedSuit = false;

  if (letter === 'E') {
    suitType = 'spade'; // Top card Ace of Spades ONLY
    isRedSuit = false;
  } else if (letter === 'I') {
    suitType = 'diamond';
    isRedSuit = true;
  } else if (letter === 'M') {
    suitType = 'club';
    isRedSuit = false;
  } else if (letter === 'A') {
    suitType = 'heart';
    isRedSuit = true;
  } else if (letter === 'P') {
    suitType = 'diamond';
    isRedSuit = true;
  } else if (letter === 'C') {
    suitType = 'club';
    isRedSuit = false;
  } else if (letter === 'O') {
    suitType = 'heart';
    isRedSuit = true;
  } else if (letter === 'D') {
    suitType = 'diamond';
    isRedSuit = true;
  }

  // Word color palettes (I vs MAP vs CODE) - distinct minimal color themes
  // Group 1: 'I' -> Cold Titanium / Industrial Monolith (Cool bone slate)
  // Group 2: 'MAP' -> Cartographic Ochre / Raw Desert Brass (Warm honey amber)
  // Group 3: 'CODE' -> Tactical Obsidian / Smoked Carbon Slate (Dark gunmetal & deep ink)
  const palette = {
    I: {
      bgStops: ['#f4f1eb', '#ebe5dc', '#dfd7cc', '#cbc1b2'],
      borderColor: '#3a3a42',
      borderOpacity: 0.45,
      inkPrimary: '#141416',
      accentColor: '#475569',
      wordLabel: 'I',
      subStamp: 'SEC.01 // OPTIC',
      badgeBg: '#1e293b',
      badgeText: '#cbd5e1',
    },
    MAP: {
      bgStops: ['#faf2e3', '#f0e3cc', '#dfceae', '#c8b48f'],
      borderColor: '#4d3720',
      borderOpacity: 0.5,
      inkPrimary: '#1c150e',
      accentColor: '#92400e',
      wordLabel: 'MAP',
      subStamp: letter === 'M' ? 'MAP · 02 // FLUX' : letter === 'A' ? 'MAP · 03 // ATOM' : 'MAP · 04 // LATENCY',
      badgeBg: '#451a03',
      badgeText: '#fde68a',
    },
    CODE: {
      bgStops: ['#e9e2d5', '#d6cbba', '#bbaa92', '#998670'],
      borderColor: '#222227',
      borderOpacity: 0.6,
      inkPrimary: '#0f0f12',
      accentColor: '#881337',
      wordLabel: 'CODE',
      subStamp:
        letter === 'C'
          ? 'CODE · 05 // CTRL'
          : letter === 'O'
          ? 'CODE · 06 // GATE'
          : letter === 'D'
          ? 'CODE · 07 // SCATTER'
          : 'CODE · 08 // ACE',
      badgeBg: '#18181b',
      badgeText: '#f43f5e',
    },
  }[wordGroup];

  const suitFillColor = isRedSuit ? '#7f1d1d' : palette.inkPrimary;

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D Stacked Card Deck Layers if in stacked deck mode */}
      {isStackedDeck && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-2 -right-1 left-1 top-2 bg-[#d1c6b2] rounded-xl border border-stone-800/40 shadow-xl opacity-90" />
          <div className="absolute -bottom-3.5 -right-2 left-2 top-3.5 bg-[#c8bca6] rounded-xl border border-stone-800/50 shadow-2xl opacity-80" />
          <div className="absolute -bottom-5 -right-3 left-3 top-5 bg-[#bdae95] rounded-xl border border-stone-900/60 shadow-2xl opacity-70" />
          <div className="absolute -bottom-5 right-0 left-0 h-4 rounded-b-xl bg-stone-900/30 flex flex-col justify-around py-0.5 px-3">
            <div className="w-full h-[1px] bg-stone-700/40" />
            <div className="w-full h-[1px] bg-stone-600/30" />
            <div className="w-full h-[1px] bg-stone-700/40" />
          </div>
        </div>
      )}

      {/* Main Card Surface */}
      <svg
        viewBox="0 0 280 430"
        className="w-full h-full drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] rounded-xl overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Distinct radial aging vignette per word group */}
          <radialGradient id={`parchment-grad-${letter}`} cx="50%" cy="50%" r="68%">
            <stop offset="0%" stopColor={palette.bgStops[0]} />
            <stop offset="60%" stopColor={palette.bgStops[1]} />
            <stop offset="88%" stopColor={palette.bgStops[2]} />
            <stop offset="100%" stopColor={palette.bgStops[3]} />
          </radialGradient>

          {/* Edge shadow */}
          <linearGradient id={`edge-aging-${letter}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.10" />
            <stop offset="15%" stopColor="#000000" stopOpacity="0" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.16" />
          </linearGradient>

          {/* SUIT ICONS: Spades (♠), Clubs (♣), Hearts (♥), Diamonds (♦) */}
          <g id={`suit-spade-${letter}`}>
            <path
              d="M0,-14 C2,-9 8,-5 8,1 C8,5 4,8 0,8 C-4,8 -8,5 -8,1 C-8,-5 -2,-9 0,-14 Z M-2,7 L-3,12 L3,12 L2,7 Z"
              fill={suitFillColor}
            />
          </g>
          <g id={`suit-club-${letter}`}>
            <path
              d="M0,-10 C-3.5,-10 -5.5,-7 -5.5,-3.5 C-5.5,-0.5 -2.5,0.5 0,1.5 C2.5,0.5 5.5,-0.5 5.5,-3.5 C5.5,-7 3.5,-10 0,-10 Z M-4.5,-2 C-7.5,-2 -9.5,0.5 -9.5,4 C-9.5,7.5 -6.5,9.5 -3.5,9.5 C-1.5,9.5 0,7.5 0,6 C0,7.5 1.5,9.5 3.5,9.5 C6.5,9.5 9.5,7.5 9.5,4 C9.5,0.5 7.5,-2 4.5,-2 Z M-2,6 L-3,12 L3,12 L2,6 Z"
              fill={suitFillColor}
            />
          </g>
          <g id={`suit-heart-${letter}`}>
            <path
              d="M0,-4 C-2,-9 -7.5,-9 -7.5,-3.5 C-7.5,2.5 0,11 0,11 C0,11 7.5,2.5 7.5,-3.5 C7.5,-9 2,-9 0,-4 Z"
              fill={suitFillColor}
            />
          </g>
          <g id={`suit-diamond-${letter}`}>
            <path d="M0,-12 L6.5,0 L0,12 L-6.5,0 Z" fill={suitFillColor} />
          </g>
        </defs>

        {/* Card Background Base with Word-Specific Color Scheme */}
        <rect
          x="3"
          y="3"
          width="274"
          height="424"
          rx="14"
          fill={`url(#parchment-grad-${letter})`}
          stroke={palette.borderColor}
          strokeWidth="1.8"
        />

        {/* Subtle Paper Grain & Distressed Edge Vignette */}
        <rect
          x="3"
          y="3"
          width="274"
          height="424"
          rx="14"
          fill={`url(#edge-aging-${letter})`}
          pointerEvents="none"
        />

        {/* Rugged Double Border & Notched Corner Accent */}
        <rect
          x="12"
          y="12"
          width="256"
          height="406"
          rx="10"
          fill="none"
          stroke={palette.borderColor}
          strokeWidth="1.3"
          strokeOpacity={palette.borderOpacity}
        />
        <rect
          x="16"
          y="16"
          width="248"
          height="398"
          rx="8"
          fill="none"
          stroke={palette.borderColor}
          strokeWidth="0.6"
          strokeDasharray="4 2"
          strokeOpacity={palette.borderOpacity * 0.7}
        />

        {/* TACTICAL RUGGED CORNER MARKS (Crosshairs & Registration Ticks) */}
        {/* Top-Left crosshair */}
        <path d="M10,22 L18,22 M14,18 L14,26" stroke={palette.borderColor} strokeWidth="0.8" strokeOpacity="0.45" />
        {/* Top-Right crosshair */}
        <path d="M262,22 L270,22 M266,18 L266,26" stroke={palette.borderColor} strokeWidth="0.8" strokeOpacity="0.45" />
        {/* Bottom-Left crosshair */}
        <path d="M10,408 L18,408 M14,404 L14,412" stroke={palette.borderColor} strokeWidth="0.8" strokeOpacity="0.45" />
        {/* Bottom-Right crosshair */}
        <path d="M262,408 L270,408 M266,404 L266,412" stroke={palette.borderColor} strokeWidth="0.8" strokeOpacity="0.45" />

        {/* WORD GROUP HEADER BANNER (Shows I vs MAP vs CODE clearly and minimally) */}
        <g transform="translate(140, 24)">
          {/* Pill Container */}
          <rect
            x="-44"
            y="-9"
            width="88"
            height="18"
            rx="4"
            fill={palette.borderColor}
            fillOpacity="0.08"
            stroke={palette.borderColor}
            strokeWidth="0.7"
            strokeOpacity="0.3"
          />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fontFamily="'Courier Prime', monospace"
            fontSize="8.5"
            fontWeight="bold"
            letterSpacing="0.22em"
            fill={palette.inkPrimary}
          >
            [ {palette.wordLabel} ]
          </text>
        </g>

        {/* SUBTLE TACTICAL SUB-STAMP AT TOP */}
        <text
          x="140"
          y="40"
          textAnchor="middle"
          fontFamily="'Courier Prime', monospace"
          fontSize="6.5"
          letterSpacing="0.14em"
          fill={palette.inkPrimary}
          opacity="0.45"
        >
          {palette.subStamp}
        </text>

        {/* TOP LEFT CARD LETTER & SUIT */}
        <g>
          <text
            x="24"
            y="52"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="32"
            fontWeight="900"
            fill={isRedSuit ? '#7f1d1d' : palette.inkPrimary}
            letterSpacing="-0.02em"
          >
            {letter}
          </text>
          {/* Suit below letter */}
          <g transform="translate(32, 68) scale(0.7)">
            <use href={`#suit-${suitType}-${letter}`} />
          </g>
        </g>

        {/* BOTTOM RIGHT INVERTED LETTER & SUIT */}
        <g transform="rotate(180 140 215)">
          <text
            x="24"
            y="52"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="32"
            fontWeight="900"
            fill={isRedSuit ? '#7f1d1d' : palette.inkPrimary}
          >
            {letter === 'E' ? 'A' : letter}
          </text>
          <g transform="translate(32, 68) scale(0.7)">
            <use href={`#suit-${suitType}-${letter}`} />
          </g>
        </g>

        {/* BOTTOM CODE METADATA */}
        <text
          x="140"
          y="404"
          textAnchor="middle"
          fontFamily="'Courier Prime', monospace"
          fontSize="7"
          letterSpacing="0.18em"
          fill={palette.inkPrimary}
          opacity="0.4"
        >
          IMAP · {letter} // PROTOCOL REV-4.2
        </text>

        {/* SPECIFIC DIAGRAM ILLUSTRATIONS PER CARD */}
        {letter === 'I' && (
          <g transform="translate(140, 215)" stroke={palette.inkPrimary} strokeWidth="1.2" fill="none">
            {/* Optical Refraction & Snell's Boundary */}
            <line x1="-80" y1="0" x2="80" y2="0" strokeWidth="1.5" />
            <line x1="0" y1="-75" x2="0" y2="75" strokeDasharray="3 3" strokeOpacity="0.6" />
            <line x1="-65" y1="-60" x2="0" y2="0" strokeWidth="1.8" />
            <path d="M-35,-32 L-26,-27 L-31,-22" fill={palette.inkPrimary} />
            <line x1="0" y1="0" x2="65" y2="-60" strokeWidth="1.2" strokeDasharray="4 2" />
            <line x1="0" y1="0" x2="45" y2="75" strokeWidth="1.8" />
            <path d="M22,37 L25,48 L17,45" fill={palette.inkPrimary} />
            <path d="M-15,-20 A25,25 0 0,0 0,-25" strokeWidth="0.8" />
            <path d="M0,30 A30,30 0 0,0 18,24" strokeWidth="0.8" />
            <text x="-55" y="-12" fontSize="10" fontFamily="'Courier Prime', monospace" fill={palette.inkPrimary}>
              n₁
            </text>
            <text x="45" y="24" fontSize="10" fontFamily="'Courier Prime', monospace" fill={palette.inkPrimary}>
              n₂
            </text>
            <text x="-25" y="-35" fontSize="9" fontFamily="'Playfair Display', serif" fontStyle="italic" fill={palette.inkPrimary}>
              θ₁
            </text>
            <text x="14" y="42" fontSize="9" fontFamily="'Playfair Display', serif" fontStyle="italic" fill={palette.inkPrimary}>
              θ₂
            </text>
          </g>
        )}

        {letter === 'M' && (
          <g transform="translate(140, 215)" stroke={palette.inkPrimary} strokeWidth="1.1" fill="none">
            <text x="0" y="-70" textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="13" fontWeight="bold" fill={palette.inkPrimary}>
              dΔ / ∂t = -∇ · J
            </text>
            <path d="M-60,-40 C-30,-20 30,-20 60,-40" strokeWidth="1" />
            <path d="M-70,-15 C-30,5 30,5 70,-15" strokeWidth="1.4" />
            <path d="M-65,15 C-25,35 25,35 65,15" strokeWidth="1.2" />
            <path d="M-55,40 C-20,60 20,60 55,40" strokeWidth="1" />
            <circle cx="0" cy="5" r="30" strokeDasharray="3 3" strokeOpacity="0.5" />
            <circle cx="0" cy="5" r="16" strokeDasharray="2 2" strokeOpacity="0.4" />
            <path d="M10,0 L18,-3 L14,5 Z" fill={palette.inkPrimary} />
            <path d="M-12,14 L-20,12 L-15,19 Z" fill={palette.inkPrimary} />
            <line x1="-40" y1="5" x2="40" y2="5" strokeDasharray="2 4" />
          </g>
        )}

        {letter === 'A' && (
          <g transform="translate(140, 215)" stroke={palette.inkPrimary} strokeWidth="1.2" fill="none">
            <circle cx="0" cy="0" r="46" strokeWidth="0.8" strokeOpacity="0.4" />
            <polygon points="0,-18 17,-6 11,15 -11,15 -17,-6" strokeWidth="1.6" fill={palette.inkPrimary} fillOpacity="0.05" />
            <line x1="0" y1="-18" x2="0" y2="-44" strokeWidth="1.4" />
            <line x1="17" y1="-6" x2="42" y2="-16" strokeWidth="1.4" />
            <line x1="11" y1="15" x2="27" y2="38" strokeWidth="1.4" />
            <line x1="-11" y1="15" x2="-27" y2="38" strokeWidth="1.4" />
            <line x1="-17" y1="-6" x2="-42" y2="-16" strokeWidth="1.4" />
            <polygon points="0,-44 24,-38 42,-16 26,1 17,-6 0,-18" strokeWidth="0.9" strokeDasharray="2 1" />
            <polygon points="0,-44 -24,-38 -42,-16 -26,1 -17,-6 0,-18" strokeWidth="0.9" strokeDasharray="2 1" />
            <text x="0" y="66" textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="11" fill={palette.inkPrimary}>
              C₆₀ · Ih Symmetry
            </text>
          </g>
        )}

        {letter === 'P' && (
          <g transform="translate(140, 210)" stroke={palette.inkPrimary} strokeWidth="1.2" fill="none">
            <text x="0" y="-72" textAnchor="middle" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="22" fill={palette.inkPrimary}>
              Ψ (x, t)
            </text>
            <text x="0" y="-52" textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="11" fill={palette.inkPrimary}>
              ∂ / ∂Hᵢ
            </text>
            <line x1="-65" y1="45" x2="65" y2="45" strokeWidth="1.2" />
            <line x1="0" y1="-45" x2="0" y2="45" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d="M-60,-20 Q-30,45 0,45 Q30,45 60,-20" strokeWidth="1.5" />
            <path d="M-45,15 Q-22,-10 0,15 Q22,40 45,15" strokeWidth="1.2" strokeDasharray="4 2" />
            <line x1="-40" y1="28" x2="40" y2="28" strokeWidth="0.8" strokeOpacity="0.5" />
            <line x1="-50" y1="12" x2="50" y2="12" strokeWidth="0.8" strokeOpacity="0.5" />
            <text x="48" y="27" fontSize="8" fontFamily="'Courier Prime', monospace" fill={palette.inkPrimary}>
              E₀
            </text>
            <text x="56" y="11" fontSize="8" fontFamily="'Courier Prime', monospace" fill={palette.inkPrimary}>
              E₁
            </text>
          </g>
        )}

        {letter === 'C' && (
          <g transform="translate(140, 215)" stroke={palette.inkPrimary} strokeWidth="1.2" fill="none">
            <text x="0" y="-68" textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="11" fill={palette.inkPrimary}>
              L(v) · H(s)
            </text>
            <circle cx="-55" cy="-20" r="10" strokeWidth="1.4" />
            <text x="-55" y="-17" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={palette.inkPrimary}>
              Σ
            </text>
            <line x1="-80" y1="-20" x2="-65" y2="-20" strokeWidth="1.4" />
            <line x1="-45" y1="-20" x2="-20" y2="-20" strokeWidth="1.4" />
            <rect x="-20" y="-35" width="40" height="30" rx="3" strokeWidth="1.5" fill={palette.bgStops[0]} />
            <text x="0" y="-23" textAnchor="middle" fontSize="9" fontFamily="'Courier Prime', monospace" fill={palette.inkPrimary}>
              αs / as
            </text>
            <text x="0" y="-11" textAnchor="middle" fontSize="8" fontFamily="'Courier Prime', monospace" fill={palette.inkPrimary}>
              K · G(s)
            </text>
            <line x1="20" y1="-20" x2="45" y2="-20" strokeWidth="1.4" />
            <rect x="45" y="-35" width="30" height="30" rx="3" strokeWidth="1.5" fill={palette.bgStops[0]} />
            <text x="60" y="-16" textAnchor="middle" fontSize="12" fontFamily="serif" fill={palette.inkPrimary}>
              ∫
            </text>
            <line x1="75" y1="-20" x2="85" y2="-20" strokeWidth="1.4" />
            <line x1="80" y1="-20" x2="80" y2="30" strokeWidth="1.2" />
            <line x1="80" y1="30" x2="-55" y2="30" strokeWidth="1.2" />
            <line x1="-55" y1="30" x2="-55" y2="-10" strokeWidth="1.2" />
            <text x="-62" y="3" fontSize="10" fill={palette.inkPrimary} fontFamily="monospace">
              -
            </text>
            <text x="-67" y="-23" fontSize="9" fill={palette.inkPrimary} fontFamily="monospace">
              +
            </text>
          </g>
        )}

        {letter === 'O' && (
          <g transform="translate(140, 215)" stroke={palette.inkPrimary} strokeWidth="1.2" fill="none">
            <text x="0" y="-62" textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="16" fontWeight="bold" fill={palette.inkPrimary}>
              {'{ }'}
            </text>
            <path d="M-35,-25 L-5,-25 C12,-25 22,-10 22,0 C22,10 12,25 -5,25 L-35,25 Z" strokeWidth="1.5" fill={palette.bgStops[0]} />
            <line x1="-55" y1="-12" x2="-35" y2="-12" strokeWidth="1.2" />
            <line x1="-55" y1="12" x2="-35" y2="12" strokeWidth="1.2" />
            <line x1="22" y1="0" x2="45" y2="0" strokeWidth="1.4" />
            <circle cx="26" cy="0" r="3" fill={palette.bgStops[0]} strokeWidth="1.2" />
            <path d="M-60,55 L-40,55 L-40,40 L-20,40 L-20,55 L0,55 L0,40 L20,40 L20,55 L40,55 L40,40 L60,40" strokeWidth="1.2" />
            <text x="0" y="72" textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="9" fill={palette.inkPrimary}>
              CLK · 4.8 GHz
            </text>
          </g>
        )}

        {letter === 'D' && (
          <g transform="translate(140, 215)" stroke={palette.inkPrimary} strokeWidth="1.2" fill="none">
            <circle cx="0" cy="0" r="4" fill={palette.inkPrimary} />
            <line x1="-70" y1="0" x2="0" y2="0" strokeWidth="2" />
            <path d="M-35,-4 L-25,0 L-35,4" fill={palette.inkPrimary} />
            <path d="M0,0 C25,-15 50,-45 70,-60" strokeWidth="1.5" />
            <path d="M0,0 C30,-8 55,-20 75,-25" strokeWidth="1.2" />
            <path d="M0,0 C30,10 50,30 65,55" strokeWidth="1.6" />
            <path d="M0,0 C15,20 30,50 40,70" strokeWidth="1.2" />
            <path d="M25,-15 C35,-25 45,-15 35,-5 C28,0 20,-10 25,-15" strokeWidth="0.9" strokeDasharray="2 1" />
            <text x="0" y="-68" textAnchor="middle" fontFamily="'Courier Prime', monospace" fontSize="10" fill={palette.inkPrimary}>
              e⁻ + e⁺ → γ + γ
            </text>
          </g>
        )}

        {letter === 'E' && (
          <g>
            {/* 4D HYPERCUBE / TESSERACT PROJECTION */}
            <g transform="translate(195, 80) scale(0.65)" stroke={palette.inkPrimary} strokeWidth="1.2" fill="none">
              <rect x="-30" y="-30" width="60" height="60" rx="3" strokeWidth="1.3" />
              <rect x="-14" y="-14" width="28" height="28" rx="2" strokeWidth="1.1" />
              <line x1="-30" y1="-30" x2="-14" y2="-14" strokeWidth="1" />
              <line x1="30" y1="-30" x2="14" y2="-14" strokeWidth="1" />
              <line x1="30" y1="30" x2="14" y2="14" strokeWidth="1" />
              <line x1="-30" y1="30" x2="-14" y2="14" strokeWidth="1" />
              <circle cx="-30" cy="-30" r="2.5" fill={palette.inkPrimary} />
              <circle cx="30" cy="-30" r="2.5" fill={palette.inkPrimary} />
              <circle cx="30" cy="30" r="2.5" fill={palette.inkPrimary} />
              <circle cx="-30" cy="30" r="2.5" fill={palette.inkPrimary} />
            </g>

            {/* BRAGG DIFFRACTION LATTICE */}
            <g transform="translate(85, 335) scale(0.65)" stroke={palette.inkPrimary} strokeWidth="1.1" fill="none">
              <line x1="-45" y1="-15" x2="45" y2="-15" strokeWidth="1" />
              <line x1="-45" y1="5" x2="45" y2="5" strokeWidth="1" />
              <line x1="-45" y1="25" x2="45" y2="25" strokeWidth="1" />
              {[-36, -18, 0, 18, 36].map((x) => (
                <React.Fragment key={x}>
                  <circle cx={x} cy="-15" r="2" fill={palette.inkPrimary} />
                  <circle cx={x} cy="5" r="2" fill={palette.inkPrimary} />
                  <circle cx={x} cy="25" r="2" fill={palette.inkPrimary} />
                </React.Fragment>
              ))}
              <line x1="-35" y1="-50" x2="0" y2="-15" strokeWidth="1.4" />
              <line x1="0" y1="-15" x2="35" y2="-50" strokeWidth="1.4" />
              <line x1="-25" y1="-50" x2="0" y2="5" strokeWidth="1.4" strokeDasharray="3 2" />
              <line x1="0" y1="5" x2="25" y2="-50" strokeWidth="1.4" strokeDasharray="3 2" />
            </g>

            {/* CENTER ACE OF SPADES ICON - CROWNING ENGRAVED STARBURST (SPADES ONLY!) */}
            <g transform="translate(140, 220) scale(1.85)">
              <defs>
                <clipPath id="spade-clip">
                  <path d="M0,-24 C5,-16 18,-8 18,5 C18,13 10,18 0,18 C-10,18 -18,13 -18,5 C-18,-8 -5,-16 0,-24 Z" />
                </clipPath>
              </defs>

              {/* Spade Base Body */}
              <path
                d="M0,-24 C5,-16 18,-8 18,5 C18,13 10,18 0,18 C-10,18 -18,13 -18,5 C-18,-8 -5,-16 0,-24 Z"
                fill="#0f0f12"
              />
              {/* Internal Sunburst Starburst Flare Lines */}
              <g clipPath="url(#spade-clip)" stroke="#e4dccd" strokeWidth="0.6">
                {Array.from({ length: 18 }).map((_, i) => {
                  const angle = (i * 20 * Math.PI) / 180;
                  const x = Math.cos(angle) * 30;
                  const y = Math.sin(angle) * 30;
                  return <line key={i} x1="0" y1="3" x2={x} y2={y} strokeOpacity="0.75" />;
                })}
              </g>
              {/* Outer filigree outline */}
              <path
                d="M0,-24 C5,-16 18,-8 18,5 C18,13 10,18 0,18 C-10,18 -18,13 -18,5 C-18,-8 -5,-16 0,-24 Z"
                fill="none"
                stroke="#e4dccd"
                strokeWidth="0.8"
              />
              {/* Spade Stem / Base */}
              <path d="M-3,14 L-6,26 L6,26 L3,14 Z" fill="#0f0f12" stroke="#0f0f12" strokeWidth="0.5" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
