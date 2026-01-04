import { motion } from 'motion/react';
import { Clock, TriangleAlert, ShieldAlert, CheckCircle, CircleX, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface TimelineEvent {
  time: string;
  riskLevel: number;
  event: string;
  severity: 'low' | 'medium' | 'high';
}

interface RedFlag {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PostCallSummaryProps {
  callDuration: string;
  maxRiskLevel: number;
  timeline: TimelineEvent[];
  redFlags: RedFlag[];
  elderMode: boolean;
}

export function PostCallSummary({ callDuration, maxRiskLevel, timeline, redFlags, elderMode }: PostCallSummaryProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-[#6ee7b7]/20 border-[#6ee7b7]/40';
      case 'medium': return 'bg-[#fbbf24]/20 border-[#fbbf24]/40';
      case 'high': return 'bg-[#ff4d6d]/20 border-[#ff4d6d]/40';
      default: return 'bg-[#d4a5b8]/20 border-[#d4a5b8]/40';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff9eb7]/15 border border-[#ff9eb7]/30 mb-2">
            <CheckCircle className="w-4 h-4 text-[#ff9eb7]" />
            <span className={`${elderMode ? 'text-base' : 'text-sm'} text-[#ff9eb7]`}>Call Ended</span>
          </div>
          <h2 className={`${elderMode ? 'text-4xl' : 'text-3xl'} font-bold text-[#5a2e3e]`}>Call Protection Summary</h2>
          <p className={`${elderMode ? 'text-xl' : 'text-lg'} text-[#8b6574]`}>
            Duration: {callDuration} • Max Risk: {maxRiskLevel}%
          </p>
        </div>

        {/* Risk Timeline */}
        <Card className="border-[#ff9eb7]/20 bg-white/70 backdrop-blur-sm overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-[#ff9eb7]/20 bg-gradient-to-r from-[#ffe3ec]/60 to-white/80">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#ff9eb7]" />
              <h3 className={`${elderMode ? 'text-xl' : 'text-lg'} font-bold text-[#5a2e3e]`}>Risk Progression Timeline</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-2 ${getSeverityColor(event.severity)} flex items-center justify-center flex-shrink-0`}>
                      <span className={`${elderMode ? 'text-base' : 'text-sm'} font-bold text-[#5a2e3e]`}>{event.riskLevel}%</span>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gradient-to-b from-[#d4a5b8] to-transparent mt-2" />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-6">
                    <div className={`${elderMode ? 'text-base' : 'text-sm'} text-[#8b6574] mb-1`}>{event.time}</div>
                    <div className={`${elderMode ? 'text-lg' : 'text-base'} text-[#5a2e3e]`}>{event.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Red Flags Detected */}
        <Card className="border-[#ff4d6d]/30 bg-gradient-to-br from-[#fff5f7] to-white backdrop-blur-sm overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-[#ff4d6d]/20">
            <div className="flex items-center gap-3">
              <TriangleAlert className="w-5 h-5 text-[#ff4d6d]" />
              <h3 className={`${elderMode ? 'text-xl' : 'text-lg'} font-bold text-[#ff4d6d]`}>Key Red Flags Detected</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid gap-4">
              {redFlags.map((flag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-[#ff4d6d]/5 border border-[#ff4d6d]/20"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ff4d6d]/15 flex items-center justify-center">
                    {flag.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`${elderMode ? 'text-lg' : 'text-base'} font-bold text-[#5a2e3e] mb-1`}>{flag.title}</h4>
                    <p className={`${elderMode ? 'text-base' : 'text-sm'} text-[#8b6574]`}>{flag.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Safety Recommendations */}
        <Card className="border-[#6ee7b7]/30 bg-gradient-to-br from-[#f0fdf9] to-white backdrop-blur-sm overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-[#6ee7b7]/20">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-[#6ee7b7]" />
              <h3 className={`${elderMode ? 'text-xl' : 'text-lg'} font-bold text-[#059669]`}>Safety Recommendations</h3>
            </div>
          </div>
          
          <div className="p-6">
            <ul className="space-y-3">
              {[
                'Block this number to prevent future calls',
                'Never share OTP codes, passwords, or account details over the phone',
                'Banks will never ask you to move money to a "safe account"',
                'When in doubt, hang up and call back using official numbers',
                'Report this incident to help protect others'
              ].map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#6ee7b7] flex-shrink-0 mt-0.5" />
                  <span className={`${elderMode ? 'text-lg' : 'text-base'} text-[#5a2e3e]`}>{tip}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button
            size={elderMode ? "lg" : "default"}
            className={`${elderMode ? 'text-xl px-10 py-7' : 'px-8 py-6'} bg-[#ff4d6d] hover:bg-[#ff3458] text-white font-bold rounded-xl shadow-lg shadow-[#ff4d6d]/30`}
          >
            <Flag className={`${elderMode ? 'w-6 h-6' : 'w-5 h-5'} mr-2`} />
            Report Scam
          </Button>
          
          <Button
            size={elderMode ? "lg" : "default"}
            variant="outline"
            className={`${elderMode ? 'text-xl px-10 py-7' : 'px-8 py-6'} border-[#ff9eb7]/30 text-[#5a2e3e] hover:bg-[#ff9eb7]/10 rounded-xl`}
          >
            <CircleX className={`${elderMode ? 'w-6 h-6' : 'w-5 h-5'} mr-2`} />
            Block Number
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
