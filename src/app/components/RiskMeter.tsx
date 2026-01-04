import { motion } from 'motion/react';
import { ShieldAlert, TriangleAlert } from 'lucide-react';
import { Badge } from './ui/badge';

interface RiskMeterProps {
  riskLevel: number; // 0-100
  detectedPattern: string;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  tags: string[];
  elderMode: boolean;
}

export function RiskMeter({ riskLevel, detectedPattern, threatLevel, tags, elderMode }: RiskMeterProps) {
  const getColor = () => {
    if (riskLevel < 30) return { primary: '#6ee7b7', secondary: '#5cd9a6', glow: 'rgba(110, 231, 183, 0.3)' };
    if (riskLevel < 60) return { primary: '#fbbf24', secondary: '#f59e0b', glow: 'rgba(251, 191, 36, 0.3)' };
    return { primary: '#ff4d6d', secondary: '#ff3458', glow: 'rgba(255, 77, 109, 0.3)' };
  };

  const getThreatColor = () => {
    switch (threatLevel) {
      case 'Low': return 'bg-[#6ee7b7]/20 text-[#059669] border-[#6ee7b7]/40';
      case 'Medium': return 'bg-[#fbbf24]/20 text-[#d97706] border-[#fbbf24]/40';
      case 'High': return 'bg-[#ff9eb7]/25 text-[#ff4d6d] border-[#ff9eb7]/50';
      case 'Critical': return 'bg-[#ff4d6d]/25 text-[#ff4d6d] border-[#ff4d6d]/50';
    }
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (riskLevel / 100) * circumference;

  return (
    <div className="rounded-2xl border border-[#ff9eb7]/20 bg-white/70 backdrop-blur-sm h-full flex flex-col overflow-hidden shadow-lg">
      <div className="px-6 py-4 border-b border-[#ff9eb7]/20 bg-gradient-to-r from-[#ffe3ec]/60 to-white/80">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-[#ff9eb7]" />
          <h3 className={`${elderMode ? 'text-xl' : 'text-lg'} font-bold text-[#5a2e3e]`}>Scam Risk Intelligence</h3>
        </div>
        <p className={`${elderMode ? 'text-base' : 'text-sm'} text-[#8b6574] mt-1`}>
          AI-powered threat analysis
        </p>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center space-y-6">
        {/* Circular Risk Meter */}
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#ffd4e3"
              strokeWidth="12"
              fill="none"
            />
            {/* Animated progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              stroke={color.primary}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                filter: `drop-shadow(0 0 8px ${color.glow})`
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <div className={`${elderMode ? 'text-6xl' : 'text-5xl'} font-bold`} style={{ color: color.primary }}>
                {riskLevel}%
              </div>
              <div className={`${elderMode ? 'text-base' : 'text-sm'} text-[#8b6574] mt-1`}>Risk Score</div>
            </motion.div>
          </div>
        </div>

        {/* Threat Level Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`px-6 py-3 rounded-full border-2 ${getThreatColor()} ${elderMode ? 'text-lg' : 'text-base'} font-bold shadow-sm`}
        >
          Threat Level: {threatLevel}
        </motion.div>

        {/* Detected Pattern */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center space-y-2"
        >
          <div className={`${elderMode ? 'text-base' : 'text-sm'} text-[#8b6574]`}>Detected Pattern:</div>
          <div className={`${elderMode ? 'text-xl' : 'text-lg'} font-bold text-[#5a2e3e] flex items-center gap-2 justify-center`}>
            <TriangleAlert className="w-5 h-5 text-[#fbbf24]" />
            {detectedPattern}
          </div>
        </motion.div>

        {/* Risk Tags */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`${elderMode ? 'text-sm px-4 py-2' : 'text-xs px-3 py-1'} bg-[#ff4d6d]/10 border-[#ff4d6d]/40 text-[#ff4d6d] hover:bg-[#ff4d6d]/20`}
            >
              {tag}
            </Badge>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
