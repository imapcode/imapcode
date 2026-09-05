import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMAPCODE_CARDS, PlayingCardData } from '../data/cardsData';
import { CardSvgArtwork } from './CardSvgArtwork';
import { cardAudio } from '../utils/cardAudio';

interface InteractiveCardDeckProps {
  onSelectCard?: (card: PlayingCardData) => void;
}

export const InteractiveCardDeck: React.FC<InteractiveCardDeckProps> = ({ onSelectCard }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Sound enabled by default
  useEffect(() => {
    cardAudio.enabled = true;
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

  // Handle card hover (paper slide sound)
  const handleCardHover = (index: number) => {
    setHoveredCardIndex(index);
    cardAudio.playHover();
  };

  // Handle card click (paper snap sound)
  const handleCardClick = (card: PlayingCardData) => {
    cardAudio.playSelect();
    if (onSelectCard) {
      onSelectCard(card);
    }
  };

  // Card Mouse Move for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-10 md:py-16 overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-zinc-700/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* 3D TACTICAL CARD ARENA */}
        <div className="relative min-h-[440px] sm:min-h-[500px] md:min-h-[540px] flex items-center justify-center">
          {/* Atmospheric Floor Drop Shadow */}
          <div
            className="absolute bottom-10 w-[300px] sm:w-[480px] h-[36px] bg-black/80 blur-2xl rounded-full pointer-events-none transition-all duration-300"
            style={{
              transform: `scale(${0.65 + currentSpread * 0.95})`,
            }}
          />

          {/* CARDS CONTAINER */}
          <div className="relative w-[220px] sm:w-[250px] md:w-[270px] h-[340px] sm:h-[390px] md:h-[420px] perspective-1000">
            {IMAPCODE_CARDS.map((card, index) => {
              const isHovered = hoveredCardIndex === index;
              const isTopCardInStack = index === IMAPCODE_CARDS.length - 1; // Card E / Ace of Spades is on top!

              // Calculate position based on spread factor (0.15 = stacked, 1 = fanned)
              let rot = card.defaultRotation * currentSpread;
              let xOff = card.defaultXOffset * currentSpread;
              let yOff = card.defaultYOffset * currentSpread;

              // Stacked tactile paper irregularities
              if (currentSpread < 0.25) {
                const stackFactor = 1 - currentSpread / 0.25;
                rot = (index - 3.5) * 0.5 * stackFactor;
                xOff = (index - 3.5) * 1.4 * stackFactor;
                yOff = (index - 3.5) * 0.8 * stackFactor;
              }

              // Dynamic 3D tilt when hovered
              let rotateX = 0;
              let rotateY = 0;
              if (isHovered) {
                rotateX = -mousePos.y * 16;
                rotateY = mousePos.x * 20;
              }

              // Z-Index: Fanned left-to-right (0 to 7), hovered floats to top
              let zIndex = index + 10;
              if (isHovered) zIndex = 70;

              return (
                <motion.div
                  key={card.id}
                  className="absolute inset-0 cursor-pointer origin-bottom-center will-change-transform"
                  animate={{
                    rotate: rot,
                    x: xOff,
                    y: isHovered ? yOff - 38 : yOff,
                    scale: isHovered ? 1.09 : 1,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 270,
                    damping: 24,
                    mass: 0.75,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isHovered
                      ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                      : undefined,
                  }}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  onMouseMove={handleMouseMove}
                  onClick={() => handleCardClick(card)}
                >
                  {/* Card Artwork Surface */}
                  <div className="relative w-full h-full rounded-xl transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(0,0,0,0.85)]">
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
      </div>
    </section>
  );
};
