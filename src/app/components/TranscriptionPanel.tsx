import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic } from 'lucide-react';

interface Message {
  id: number;
  speaker: 'caller' | 'user';
  text: string;
  timestamp: string;
  hasScamPhrases: boolean;
  scamPhrases?: string[];
}

interface TranscriptionPanelProps {
  messages: Message[];
  elderMode: boolean;
}

export function TranscriptionPanel({ messages, elderMode }: TranscriptionPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const highlightScamPhrases = (text: string, phrases?: string[]) => {
    if (!phrases || phrases.length === 0) return text;

    let result = text;
    const parts: Array<{ text: string; isHighlight: boolean }> = [];
    let lastIndex = 0;

    // Create a regex pattern from scam phrases
    const pattern = new RegExp(`(${phrases.join('|')})`, 'gi');
    const matches = [...text.matchAll(pattern)];

    matches.forEach((match) => {
      const index = match.index!;
      if (index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, index), isHighlight: false });
      }
      parts.push({ text: match[0], isHighlight: true });
      lastIndex = index + match[0].length;
    });

    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), isHighlight: false });
    }

    return parts.map((part, i) =>
      part.isHighlight ? (
        <span key={i} className="bg-[#ff4d6d]/25 text-[#ff4d6d] px-1 rounded border border-[#ff4d6d]/40 font-semibold">
          {part.text}
        </span>
      ) : (
        <span key={i}>{part.text}</span>
      )
    );
  };

  return (
    <div className="rounded-2xl border border-[#ff9eb7]/20 bg-white/70 backdrop-blur-sm h-full flex flex-col overflow-hidden shadow-lg">
      <div className="px-6 py-4 border-b border-[#ff9eb7]/20 bg-gradient-to-r from-[#ffe3ec]/60 to-white/80">
        <div className="flex items-center gap-3">
          <Mic className="w-5 h-5 text-[#ff9eb7]" />
          <h3 className={`${elderMode ? 'text-xl' : 'text-lg'} font-bold text-[#5a2e3e]`}>Live Transcription</h3>
        </div>
        <p className={`${elderMode ? 'text-base' : 'text-sm'} text-[#8b6574] mt-1`}>
          Scam phrases highlighted in real-time
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col gap-1 ${message.speaker === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2">
                <span className={`${elderMode ? 'text-sm' : 'text-xs'} font-medium ${
                  message.speaker === 'caller' ? 'text-[#ff4d6d]' : 'text-[#6ee7b7]'
                }`}>
                  {message.speaker === 'caller' ? 'Caller' : 'You'}
                </span>
                <span className={`${elderMode ? 'text-xs' : 'text-[10px]'} text-[#8b6574]`}>
                  {message.timestamp}
                </span>
              </div>
              <div
                className={`${elderMode ? 'text-lg px-5 py-4' : 'text-sm px-4 py-3'} rounded-2xl max-w-[85%] ${
                  message.speaker === 'caller'
                    ? message.hasScamPhrases
                      ? 'bg-[#ff4d6d]/10 border-2 border-[#ff4d6d]/40 text-[#5a2e3e]'
                      : 'bg-[#f9e8ed] border border-[#ff9eb7]/20 text-[#5a2e3e]'
                    : 'bg-[#d1fae5]/40 border border-[#6ee7b7]/30 text-[#5a2e3e]'
                }`}
              >
                {message.hasScamPhrases ? (
                  <p>{highlightScamPhrases(message.text, message.scamPhrases)}</p>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
