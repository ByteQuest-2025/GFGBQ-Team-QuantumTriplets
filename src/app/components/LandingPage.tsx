import { ShieldCheck, Lock, Sparkles, Shield } from 'lucide-react';
import { HorizontalScrollSection } from './HorizontalScrollSection';

interface LandingPageProps {
  elderMode?: boolean;
  onStartProtection: () => void;
}

export function LandingPage({ elderMode, onStartProtection }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef5f7] via-[#ffe3ec] to-[#ffd4e3]">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background decoration - soft pink glows */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff9eb7] rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffc9d9] rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1
            className={`${
              elderMode ? 'text-6xl md:text-8xl' : 'text-5xl md:text-7xl'
            } font-black text-[#5a2e3e] mb-6 leading-tight`}
          >
            Your Caring AI Guardian{' '}
            <span className="bg-gradient-to-r from-[#ff9eb7] via-[#ffc9d9] to-[#ffb3c6] bg-clip-text text-transparent">
              Protects You
            </span>
            <br />
            From Phone Scams
          </h1>

          {/* Subtext */}
          <p
            className={`${
              elderMode ? 'text-3xl' : 'text-2xl'
            } text-[#8b6574] mb-12 max-w-4xl mx-auto leading-relaxed`}
          >
            Warm, protective AI that quietly watches over your calls and alerts you instantly when something feels wrong.
          </p>

          {/* Visual Illustration - Voice Waves + Shield */}
          <div className="flex items-center justify-center gap-8 mb-16">
            {/* Voice wave animation */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-[#ff9eb7] to-[#6ee7b7] rounded-full animate-pulse"
                  style={{
                    height: `${20 + i * 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Shield icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff9eb7] blur-xl opacity-40 animate-pulse" />
              <ShieldCheck className="relative w-20 h-20 text-[#ff9eb7]" />
            </div>

            {/* Voice wave animation (mirrored) */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-[#ff9eb7] to-[#6ee7b7] rounded-full animate-pulse"
                  style={{
                    height: `${60 - i * 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm border border-[#ff9eb7]/30 rounded-full shadow-sm">
              <Sparkles className="w-5 h-5 text-[#ff9eb7]" />
              <span className={`${elderMode ? 'text-xl' : 'text-base'} text-[#5a2e3e] font-semibold`}>
                AI-Powered
              </span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm border border-[#6ee7b7]/30 rounded-full shadow-sm">
              <Lock className="w-5 h-5 text-[#6ee7b7]" />
              <span className={`${elderMode ? 'text-xl' : 'text-base'} text-[#5a2e3e] font-semibold`}>
                Privacy-First
              </span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm border border-[#ff9eb7]/30 rounded-full shadow-sm">
              <Shield className="w-5 h-5 text-[#ff9eb7]" />
              <span className={`${elderMode ? 'text-xl' : 'text-base'} text-[#5a2e3e] font-semibold`}>
                Real-Time Protection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL SECTION - Step-by-step walkthrough */}
      <HorizontalScrollSection elderMode={elderMode} />

      {/* PRIMARY CTA SECTION */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glow effect behind button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-[#ff9eb7] rounded-full blur-[128px] opacity-30 animate-pulse" />
          </div>

          <div className="relative z-10">
            {/* Primary CTA Button */}
            <button
              onClick={onStartProtection}
              className={`${
                elderMode ? 'text-3xl px-16 py-8' : 'text-2xl px-12 py-6'
              } font-bold bg-gradient-to-r from-[#ff9eb7] to-[#ffc9d9] text-white rounded-2xl hover:from-[#ff8aa8] hover:to-[#ffb3c6] transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-[#ff9eb7]/30 relative group`}
            >
              {/* Button glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff9eb7] to-[#ffc9d9] rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
              <span className="relative text-[rgb(46,22,34)]">Start Your Protection</span>
            </button>

            {/* Supporting microcopy */}
            <p className={`${elderMode ? 'text-xl' : 'text-base'} text-[#8b6574] mt-6`}>
              Demo mode • No signup • Privacy-safe
            </p>
          </div>
        </div>
      </section>

      {/* Page ends here - no footer */}
    </div>
  );
}
