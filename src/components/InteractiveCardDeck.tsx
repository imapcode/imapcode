import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMAPCODE_CARDS, PlayingCardData } from '../data/cardsData';
import { CardSvgArtwork } from './CardSvgArtwork';

interface InteractiveCardDeckProps {
  onSelectCard?: (card: PlayingCardData) => void;
}

export const InteractiveCardDeck: React.FC<InteractiveCardDeckProps> = ({ onSelectCard }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Track responsive screen width for dynamic fanning calculation
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll driven animation: fans the deck from stacked (Ace on top) to fanned spread
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const scrollSpread = useTransform(scrollYProgress, [0.1, 0.85], [0.15, 1]);
  const [currentSpread, setCurrentSpread] = useState(1);

  useEffect(() => {
    const unsubscribe = scrollSpread.on('change', (val) => {
      setCurrentSpread(val);
    });
    return () => unsubscribe();
  }, [scrollSpread]);

  // Handle optional card tap/click without any hover inspect state
  const handleCardClick = (card: PlayingCardData) => {
    if (onSelectCard) {
      onSelectCard(card);
    }
  };

  // Compute adaptive card dimensions based on screen width
  // Phone (< 640px): 124px - 145px width
  // Small Tablet (640px - 768px): 165px - 180px width
  // Tablet (768px - 1024px): 185px - 210px width
  // Desktop (>= 1024px): 245px - 255px width
  let cardWidth = 250;
  if (windowWidth < 420) {
    cardWidth = Math.max(118, Math.min(138, Math.floor((windowWidth - 32) * 0.38)));
  } else if (windowWidth < 640) {
    cardWidth = Math.max(136, Math.min(150, Math.floor((windowWidth - 36) * 0.36)));
  } else if (windowWidth < 768) {
    cardWidth = Math.max(160, Math.min(180, Math.floor((windowWidth - 48) * 0.28)));
  } else if (windowWidth < 1024) {
    cardWidth = Math.max(185, Math.min(212, Math.floor((windowWidth - 48) * 0.26)));
  } else {
    cardWidth = 250;
  }

  const cardHeight = Math.round(cardWidth * 1.5); // Standard 2:3 playing card aspect ratio

  // Mathematical spread calculation ensuring cards NEVER exceed screen or tablet width
  const maxAvailableWidth = Math.min(windowWidth - (windowWidth < 640 ? 24 : 48), 1060);
  const edgePadding = windowWidth < 640 ? 12 : 24;
  const maxAllowedSpan = Math.max(80, maxAvailableWidth - cardWidth - edgePadding * 2);
  
  // Total span between outermost card centers is 560px at scale 1.0 (Card 0: -290px, Card 7: +270px)
  const idealSpreadMultiplier = maxAllowedSpan / 560;
  const responsiveSpreadMultiplier = Math.max(0.18, Math.min(0.95, idealSpreadMultiplier));

  // Harmonize rotation angle and vertical parabolic arch with the spread
  const responsiveRotMultiplier = Math.min(1.0, Math.max(0.42, responsiveSpreadMultiplier * 0.95));
  const responsiveYOffMultiplier = Math.min(1.0, Math.max(0.45, responsiveSpreadMultiplier * 0.85));

  return (
    <section
      ref={containerRef}
      className="relative w-full py-6 sm:py-10 md:py-14 overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[480px] md:w-[600px] h-[220px] sm:h-[320px] bg-zinc-700/[0.04] blur-[90px] sm:blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 relative z-10">
        {/* 3D TACTICAL CARD ARENA */}
        <div
          className="relative flex items-center justify-center"
          style={{ minHeight: `${cardHeight + (windowWidth < 640 ? 56 : 90)}px` }}
        >
          {/* Atmospheric Floor Drop Shadow */}
          <div
            className="absolute bottom-4 sm:bottom-8 h-[20px] sm:h-[32px] bg-black/80 blur-2xl rounded-full pointer-events-none transition-all duration-300"
            style={{
              width: `${Math.round(cardWidth * (1 + responsiveSpreadMultiplier * 1.35))}px`,
              transform: `scale(${0.65 + currentSpread * 0.95})`,
            }}
          />

          {/* CARDS CONTAINER - Proportional to computed card geometry */}
          <div
            className="relative perspective-1000"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
            }}
          >
            {IMAPCODE_CARDS.map((card, index) => {
              const isTopCardInStack = index === IMAPCODE_CARDS.length - 1; // Card E / Ace of Spades is on top!

              // Calculate position based on spread factor (0.15 = stacked, 1 = fanned)
              let rot = card.defaultRotation * currentSpread * responsiveRotMultiplier;
              let xOff = card.defaultXOffset * currentSpread * responsiveSpreadMultiplier;
              let yOff = card.defaultYOffset * currentSpread * responsiveYOffMultiplier;

              // Stacked tactile paper irregularities
              if (currentSpread < 0.25) {
                const stackFactor = 1 - currentSpread / 0.25;
                rot = (index - 3.5) * 0.5 * stackFactor;
                xOff = (index - 3.5) * 1.2 * stackFactor;
                yOff = (index - 3.5) * 0.7 * stackFactor;
              }

              // Fixed z-index: Left-to-right (Card 0 to Card 7 / Ace of Spades on top)
              const zIndex = index + 10;

              return (
                <motion.div
                  key={card.id}
                  className="absolute inset-0 origin-bottom-center will-change-transform select-none cursor-default"
                  animate={{
                    rotate: rot,
                    x: xOff,
                    y: yOff,
                    scale: 1,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 24,
                    mass: 0.75,
                  }}
                  onClick={() => handleCardClick(card)}
                >
                  {/* Card Artwork Surface with clean, static tactile shadow - no hover elevation/distortion */}
                  <div className="relative w-full h-full rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.65)] overflow-hidden">
                    <CardSvgArtwork
                      letter={card.letter}
                      isStackedDeck={currentSpread < 0.2 && isTopCardInStack}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tactical caption */}
        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-500 uppercase text-center mt-2 sm:mt-4">
          Scroll to fan deck · 8-card architecture suite
        </p>
      </div>
    </section>
  );
};
