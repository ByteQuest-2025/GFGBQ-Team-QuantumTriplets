import { motion, AnimatePresence } from 'motion/react';
import { TriangleAlert, PhoneOff, VolumeOff, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

interface AlertOverlayProps {
  isVisible: boolean;
  onEndCall: () => void;
  onMute: () => void;
  onDismiss: () => void;
  elderMode: boolean;
}

export function AlertOverlay({ isVisible, onEndCall, onMute, onDismiss, elderMode }: AlertOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
        >
          <div className="rounded-2xl border-2 border-[#ff4d6d] bg-gradient-to-br from-white/95 to-[#fff5f7]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Animated border glow */}
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute inset-0 rounded-2xl border-2 border-[#ff4d6d]/50" style={{ 
                boxShadow: '0 0 30px rgba(255, 77, 109, 0.5), inset 0 0 30px rgba(255, 77, 109, 0.1)' 
              }} />
            </div>

            <div className={`relative ${elderMode ? 'p-8' : 'p-6'}`}>
              {/* Warning Icon */}
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex-shrink-0"
                >
                  <div className="p-3 rounded-full bg-[#ff4d6d]/20 border-2 border-[#ff4d6d]">
                    <TriangleAlert className={`${elderMode ? 'w-8 h-8' : 'w-6 h-6'} text-[#ff4d6d]`} />
                  </div>
                </motion.div>

                <div className="flex-1 space-y-3">
                  {/* Alert Message */}
                  <div className="space-y-2">
                    <h4 className={`${elderMode ? 'text-3xl' : 'text-2xl'} font-bold text-[#ff4d6d]`}>
                      ⚠️ SCAM DETECTED
                    </h4>
                    <p className={`${elderMode ? 'text-xl' : 'text-lg'} text-[#5a2e3e] font-semibold`}>
                      This call shows strong signs of a scam
                    </p>
                    <p className={`${elderMode ? 'text-lg' : 'text-base'} text-[#8b6574]`}>
                      Do NOT share OTP codes, passwords, or banking details
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      onClick={onEndCall}
                      size={elderMode ? "lg" : "default"}
                      className={`${elderMode ? 'text-xl px-8 py-6' : 'px-6 py-5'} bg-[#ff4d6d] hover:bg-[#ff3458] text-white font-bold rounded-xl shadow-lg shadow-[#ff4d6d]/40 border-2 border-[#ff4d6d] transition-all hover:scale-105`}
                    >
                      <PhoneOff className={`${elderMode ? 'w-6 h-6' : 'w-5 h-5'} mr-2`} />
                      End Call Now
                    </Button>

                    <Button
                      onClick={onMute}
                      size={elderMode ? "lg" : "default"}
                      variant="outline"
                      className={`${elderMode ? 'text-lg px-6 py-6' : 'px-5 py-5'} bg-[#fbbf24]/10 border-2 border-[#fbbf24]/50 text-[#d97706] hover:bg-[#fbbf24]/20 hover:border-[#fbbf24] rounded-xl transition-all`}
                    >
                      <VolumeOff className={`${elderMode ? 'w-5 h-5' : 'w-4 h-4'} mr-2`} />
                      Mute Caller
                    </Button>

                    <Button
                      onClick={onDismiss}
                      size={elderMode ? "lg" : "default"}
                      variant="ghost"
                      className={`${elderMode ? 'text-lg px-6 py-6' : 'px-5 py-5'} text-[#8b6574] hover:text-[#5a2e3e] hover:bg-[#ff9eb7]/10 rounded-xl transition-all`}
                    >
                      <ShieldCheck className={`${elderMode ? 'w-5 h-5' : 'w-4 h-4'} mr-2`} />
                      I'm Safe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
