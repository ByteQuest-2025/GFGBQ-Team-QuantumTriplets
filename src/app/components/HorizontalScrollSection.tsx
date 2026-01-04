import { useEffect, useState, useRef } from 'react';
import { ShieldCheck, BellRing, Eye, Headphones } from 'lucide-react';

interface HorizontalScrollSectionProps {
  elderMode?: boolean;
}

interface CardData {
  id: number;
  title: string;
  description: string[];
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

export function HorizontalScrollSection({ elderMode }: HorizontalScrollSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const cards: CardData[] = [
    {
      id: 1,
      title: 'We Listen While You Talk',
      description: [
        'Our AI quietly listens to your phone calls in real-time.',
        'No recordings. No storage. Just protection.',
        'Think of us as a trusted friend watching over you.',
      ],
      icon: <Headphones className={elderMode ? 'w-16 h-16' : 'w-12 h-12'} />,
      color: '#ff9eb7',
      bgGradient: 'from-[#fff0f5] via-[#ffe3ec] to-white',
    },
    {
      id: 2,
      title: 'We Spot the Tricks',
      description: [
        'Scammers use fear, urgency, and fake authority.',
        'We recognize these patterns instantly.',
        'You get a clear warning before you say anything sensitive.',
      ],
      icon: <Eye className={elderMode ? 'w-16 h-16' : 'w-12 h-12'} />,
      color: '#fbbf24',
      bgGradient: 'from-[#fffbeb] via-[#fef3c7] to-white',
    },
    {
      id: 3,
      title: 'We Alert You Immediately',
      description: [
        'The moment danger is detected, you see it on your screen.',
        'Big, clear warnings. No confusing terms.',
        'Simple actions: End call, Mute, or Keep talking safely.',
      ],
      icon: <BellRing className={elderMode ? 'w-16 h-16' : 'w-12 h-12'} />,
      color: '#ff4d6d',
      bgGradient: 'from-[#fff5f7] via-[#ffe4e8] to-white',
    },
    {
      id: 4,
      title: 'Your Privacy Is Sacred',
      description: [
        'Everything happens on your phone. Nothing leaves your device.',
        'No call recordings. No cloud storage. No sharing.',
        'Your conversations stay private, always.',
      ],
      icon: <ShieldCheck className={elderMode ? 'w-16 h-16' : 'w-12 h-12'} />,
      color: '#6ee7b7',
      bgGradient: 'from-[#f0fdf9] via-[#d1fae5] to-white',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress through the section (0 to 1)
      if (sectionTop <= 0 && sectionTop > -sectionHeight + windowHeight) {
        const scrolled = Math.abs(sectionTop);
        const maxScroll = sectionHeight - windowHeight;
        const progress = scrolled / maxScroll;
        setScrollProgress(Math.max(0, Math.min(progress, 1)));
      } else if (sectionTop > 0) {
        setScrollProgress(0);
      } else if (sectionTop <= -sectionHeight + windowHeight) {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate which card should be visible and transition progress
  const totalCards = cards.length;
  const cardTransitionProgress = scrollProgress * (totalCards - 1);
  const currentCardIndex = Math.floor(cardTransitionProgress);
  const transitionProgress = cardTransitionProgress - currentCardIndex;

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        // Section height = viewport height * number of cards
        // This gives enough scroll space for all card transitions
        height: `${totalCards * 100}vh`,
      }}
    >
      {/* Fixed viewport container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Horizontal cards container */}
        <div className="relative w-full h-full">
          {cards.map((card, index) => {
            // Calculate translateX for each card based on scroll position
            let translateX = 0;

            if (index < currentCardIndex) {
              // Cards before current: fully off-screen to the left
              translateX = -100;
            } else if (index === currentCardIndex) {
              // Current card: transitioning from center to left
              translateX = -transitionProgress * 100;
            } else if (index === currentCardIndex + 1) {
              // Next card: transitioning from right to center
              translateX = 100 - transitionProgress * 100;
            } else {
              // Cards after next: fully off-screen to the right
              translateX = 100;
            }

            // Only show cards that are active or transitioning
            const isVisible =
              index === currentCardIndex || index === currentCardIndex + 1;

            return (
              <div
                key={card.id}
                className="absolute inset-0 flex items-center justify-center p-8 md:p-12"
                style={{
                  transform: `translateX(${translateX}%)`,
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
              >
                {/* Card */}
                <div
                  className={`relative w-full max-w-6xl bg-gradient-to-br ${card.bgGradient} backdrop-blur-md border-2 rounded-3xl overflow-hidden shadow-2xl`}
                  style={{
                    height: '75vh',
                    borderColor: `${card.color}40`,
                    boxShadow: `0 10px 40px ${card.color}20, 0 0 60px ${card.color}10`,
                  }}
                >
                  {/* Background radial glow - softer */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${card.color}40, transparent 70%)`,
                    }}
                  />

                  {/* Card content */}
                  <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
                    {/* Icon in top-right corner */}
                    <div
                      className="absolute top-8 right-8 p-5 rounded-2xl backdrop-blur-sm"
                      style={{
                        backgroundColor: `${card.color}15`,
                        border: `2px solid ${card.color}30`,
                        color: card.color,
                      }}
                    >
                      {card.icon}
                    </div>

                    {/* Step indicator */}
                    <div className="mb-8">
                      <span
                        className={`${
                          elderMode ? 'text-xl' : 'text-base'
                        } font-bold uppercase tracking-widest`}
                        style={{ color: card.color }}
                      >
                        Step {index + 1} of {totalCards}
                      </span>
                    </div>

                    {/* Heading */}
                    <h2
                      className={`${
                        elderMode ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
                      } font-black text-[#5a2e3e] mb-8 leading-tight max-w-4xl`}
                    >
                      {card.title}
                    </h2>

                    {/* Description lines */}
                    <div className="space-y-4 max-w-3xl">
                      {card.description.map((line, i) => (
                        <p
                          key={i}
                          className={`${
                            elderMode ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
                          } text-[#8b6574] leading-relaxed`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Decorative accent line */}
                    <div
                      className="mt-12 h-2 w-40 rounded-full"
                      style={{
                        backgroundColor: card.color,
                        boxShadow: `0 0 15px ${card.color}60`,
                      }}
                    />
                  </div>

                  {/* Bottom progress indicator */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                    {cards.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: dotIndex === index ? '56px' : '14px',
                          height: '14px',
                          backgroundColor:
                            dotIndex === index ? card.color : `${card.color}30`,
                          boxShadow:
                            dotIndex === index
                              ? `0 0 15px ${card.color}60`
                              : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll hint - only show at the beginning */}
        {scrollProgress < 0.02 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
            <span
              className={`${
                elderMode ? 'text-xl' : 'text-base'
              } text-[#ff9eb7] font-bold uppercase tracking-wider`}
            >
              Scroll Down to Learn More
            </span>
            <svg
              className="w-8 h-8 text-[#ff9eb7]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        )}

        {/* Overall progress bar at top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-80 md:w-96 h-2 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#ff9eb7] via-[#fbbf24] via-[#ff4d6d] to-[#6ee7b7] rounded-full transition-all duration-150 shadow-lg"
            style={{
              width: `${scrollProgress * 100}%`,
              boxShadow: `0 0 15px rgba(255, 158, 183, 0.5)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
