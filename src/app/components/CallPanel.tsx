import { useState } from 'react';
import { Phone, PhoneOff, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface CallPanelProps {
  isActive: boolean;
  onAccept: () => void;
  onEnd: () => void;
  callDuration: number;
  elderMode: boolean;
}

export function CallPanel({ isActive, onAccept, onEnd, callDuration, elderMode }: CallPanelProps) {
  const [waveformBars] = useState(Array.from({ length: 40 }, () => Math.random()));

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`rounded-2xl border ${isActive ? 'border-[#ff9eb7]/40 bg-gradient-to-br from-white/90 to-[#ffe3ec]/50' : 'border-[#ff9eb7]/20 bg-white/70'} backdrop-blur-sm shadow-xl overflow-hidden transition-all duration-500 ${isActive ? 'shadow-[#ff9eb7]/20' : ''}`}>
      <div className={`p-8 ${elderMode ? 'p-10' : ''}`}>
        <div className="text-center space-y-6">
          {/* Caller Info */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff4d6d]/15 border border-[#ff4d6d]/30 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#ff4d6d] animate-pulse shadow-lg shadow-[#ff4d6d]/50" />
              <span className={`${elderMode ? 'text-base' : 'text-sm'} font-medium text-[#ff4d6d]`}>Unknown Caller</span>
            </div>
            <h3 className={`${elderMode ? 'text-3xl' : 'text-2xl'} font-bold text-[#5a2e3e]`}>
              Claimed: "Bank Support"
            </h3>
            <p className={`${elderMode ? 'text-lg' : 'text-sm'} text-[#8b6574]`}>
              +1 (555) 982-7743
            </p>
          </div>

          {/* Waveform Visualization */}
          {isActive && (
            <div className="flex items-center justify-center gap-1 h-24 px-8">
              {waveformBars.map((height, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-[#ff9eb7] to-[#ffc9d9] rounded-full"
                  animate={{
                    height: [`${20 + height * 60}%`, `${30 + ((height + 0.3) % 1) * 50}%`, `${20 + height * 60}%`],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    boxShadow: '0 0 10px rgba(255, 158, 183, 0.4)'
                  }}
                />
              ))}
            </div>
          )}

          {!isActive && (
            <div className="flex items-center justify-center h-24">
              <Activity className="w-16 h-16 text-[#d4a5b8]" />
            </div>
          )}

          {/* Call Timer */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#ff4d6d] animate-pulse shadow-lg shadow-[#ff4d6d]/50" />
              <span className={`${elderMode ? 'text-2xl' : 'text-lg'} font-mono font-bold text-[#5a2e3e]`}>
                {formatDuration(callDuration)}
              </span>
            </motion.div>
          )}

          {/* Call Controls */}
          <div className="flex items-center justify-center gap-4 pt-4">
            {!isActive ? (
              <Button
                onClick={onAccept}
                size={elderMode ? "lg" : "default"}
                className={`${elderMode ? 'text-xl px-12 py-7' : 'px-8 py-6'} bg-[#6ee7b7] hover:bg-[#5cd9a6] text-white rounded-full shadow-lg shadow-[#6ee7b7]/30 transition-all hover:scale-105`}
              >
                <Phone className={elderMode ? "w-7 h-7 mr-3" : "w-5 h-5 mr-2"} />
                Accept Call
              </Button>
            ) : (
              <Button
                onClick={onEnd}
                size={elderMode ? "lg" : "default"}
                className={`${elderMode ? 'text-xl px-12 py-7' : 'px-8 py-6'} bg-[#ff4d6d] hover:bg-[#ff3458] text-white rounded-full shadow-lg shadow-[#ff4d6d]/30 transition-all hover:scale-105`}
              >
                <PhoneOff className={elderMode ? "w-7 h-7 mr-3" : "w-5 h-5 mr-2"} />
                End Call
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
