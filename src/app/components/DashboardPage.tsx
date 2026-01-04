import { useState, useEffect } from 'react';
import { Shield, Lock, TriangleAlert, CircleAlert, ShieldAlert, Clock } from 'lucide-react';
import { CallPanel } from './CallPanel';
import { TranscriptionPanel } from './TranscriptionPanel';
import { RiskMeter } from './RiskMeter';
import { AlertOverlay } from './AlertOverlay';
import { PostCallSummary } from './PostCallSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface DashboardPageProps {
  elderMode?: boolean;
  onBackToHome?: () => void;
}

interface Message {
  id: number;
  speaker: 'caller' | 'user';
  text: string;
  timestamp: string;
  hasScamPhrases: boolean;
  scamPhrases?: string[];
}

export function DashboardPage({ elderMode, onBackToHome }: DashboardPageProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [riskLevel, setRiskLevel] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('live');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      speaker: 'caller',
      text: 'Hello, this is calling from your bank security department.',
      timestamp: '00:05',
      hasScamPhrases: false,
    },
    {
      id: 2,
      speaker: 'user',
      text: 'Oh, hello. Is something wrong?',
      timestamp: '00:09',
      hasScamPhrases: false,
    },
    {
      id: 3,
      speaker: 'caller',
      text: 'We have detected suspicious activity on your account. This is urgent and requires immediate action.',
      timestamp: '00:15',
      hasScamPhrases: true,
      scamPhrases: ['urgent', 'immediate'],
    },
  ]);

  const scamConversation = [
    {
      speaker: 'caller' as const,
      text: 'Your account has been blocked due to security concerns. You need to verify your identity right away.',
      hasScamPhrases: true,
      scamPhrases: ['blocked', 'verify'],
    },
    {
      speaker: 'user' as const,
      text: 'Blocked? What do I need to do?',
      hasScamPhrases: false,
    },
    {
      speaker: 'caller' as const,
      text: 'I will send you an OTP code. Please read it back to me to confirm your identity.',
      hasScamPhrases: true,
      scamPhrases: ['OTP'],
    },
    {
      speaker: 'user' as const,
      text: 'Okay, I received a text message...',
      hasScamPhrases: false,
    },
    {
      speaker: 'caller' as const,
      text: 'Good. What is the code? We need to act immediately before your account is permanently frozen.',
      hasScamPhrases: true,
      scamPhrases: ['immediately', 'permanently'],
    },
  ];

  // Simulate call progression
  useEffect(() => {
    if (!isCallActive) return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCallActive]);

  // Simulate risk level increase
  useEffect(() => {
    if (!isCallActive) return;

    const riskTimer = setInterval(() => {
      setRiskLevel((prev) => {
        const newLevel = Math.min(prev + 5, 92);
        if (newLevel >= 70 && !showAlert) {
          setShowAlert(true);
        }
        return newLevel;
      });
    }, 2000);

    return () => clearInterval(riskTimer);
  }, [isCallActive, showAlert]);

  // Simulate conversation
  useEffect(() => {
    if (!isCallActive) return;

    let messageIndex = 0;
    const conversationTimer = setInterval(() => {
      if (messageIndex < scamConversation.length) {
        const newMessage = scamConversation[messageIndex];
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            ...newMessage,
            timestamp: formatTime(callDuration + (messageIndex + 1) * 5),
          },
        ]);
        messageIndex++;
      } else {
        clearInterval(conversationTimer);
      }
    }, 6000);

    return () => clearInterval(conversationTimer);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAcceptCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
    setRiskLevel(15);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setShowAlert(false);
    setActiveTab('summary');
  };

  const handleMuteCaller = () => {
    console.log('Caller muted');
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  const getThreatLevel = () => {
    if (riskLevel < 30) return 'Low';
    if (riskLevel < 60) return 'Medium';
    if (riskLevel < 80) return 'High';
    return 'Critical';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef5f7] via-[#ffe3ec] to-[#ffd4e3]">
      {/* TOP BAR - SYSTEM STATUS */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#ff9eb7]/20 shadow-sm">
        <div className="container mx-auto px-6 py-4 pt-20 flex items-center justify-between bg-[rgba(0,0,0,0)]">
          {/* Logo + Name - Clickable to go back home */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ff9eb7]/50 focus:ring-offset-2 rounded-xl px-3 py-2 -ml-3"
            aria-label="Return to Home page"
          >
            <Shield className={`${elderMode ? 'w-10 h-10' : 'w-8 h-8'} text-[#ff9eb7] transition-transform duration-300 group-hover:rotate-12`} />
            <span className={`${elderMode ? 'text-2xl' : 'text-xl'} font-bold text-[#5a2e3e] group-hover:text-[#ff9eb7] transition-colors duration-300 relative`}>
              FraudShield AI
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff9eb7] group-hover:w-full transition-all duration-300" />
            </span>
          </button>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#6ee7b7]/20 border border-[#6ee7b7]/40 rounded-full shadow-sm">
            <div className="w-3 h-3 bg-[#6ee7b7] rounded-full animate-pulse shadow-lg shadow-[#6ee7b7]/50" />
            <span className={`${elderMode ? 'text-lg' : 'text-sm'} text-[#059669] font-semibold`}>
              AI Monitoring Active
            </span>
          </div>

          {/* Privacy Indicator */}
          <div className="hidden md:flex items-center gap-2 text-[#8b6574]">
            <Lock className={`${elderMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
            <span className={`${elderMode ? 'text-lg' : 'text-sm'}`}>
              On-device processing • No call storage
            </span>
          </div>
        </div>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white/60 border border-[#ff9eb7]/20 shadow-sm rounded-xl">
            <TabsTrigger
              value="live"
              className={`${elderMode ? 'text-lg py-4' : 'text-base py-3'} data-[state=active]:bg-[#ff9eb7] data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg`}
            >
              Live Protection
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className={`${elderMode ? 'text-lg py-4' : 'text-base py-3'} data-[state=active]:bg-[#ff9eb7] data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg`}
            >
              Call Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT PANEL - LIVE TRANSCRIPTION */}
              <div className="lg:col-span-1 h-[600px]">
                <TranscriptionPanel messages={messages} elderMode={elderMode || false} />
              </div>

              {/* CENTER PANEL - MAIN CALL PANEL */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className="w-full">
                  <CallPanel
                    isActive={isCallActive}
                    onAccept={handleAcceptCall}
                    onEnd={handleEndCall}
                    callDuration={callDuration}
                    elderMode={elderMode || false}
                  />
                </div>
              </div>

              {/* RIGHT PANEL - SCAM INTELLIGENCE */}
              <div className="lg:col-span-1 h-[600px]">
                <RiskMeter
                  riskLevel={riskLevel}
                  detectedPattern="Bank Impersonation"
                  threatLevel={getThreatLevel()}
                  tags={['Urgency Tactics', 'Authority Claim', 'Credential Request', 'Fear Mongering']}
                  elderMode={elderMode || false}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary">
            <PostCallSummary
              callDuration={formatTime(callDuration)}
              maxRiskLevel={92}
              timeline={[
                { time: '00:15', riskLevel: 25, event: 'Suspicious urgency language detected', severity: 'low' },
                { time: '00:32', riskLevel: 48, event: 'Caller claimed to be from bank security', severity: 'medium' },
                { time: '00:55', riskLevel: 67, event: 'Request for account verification detected', severity: 'high' },
                { time: '01:12', riskLevel: 85, event: 'OTP code request - Critical threat pattern', severity: 'high' },
                { time: '01:28', riskLevel: 92, event: 'High-pressure tactics and fear mongering', severity: 'high' },
              ]}
              redFlags={[
                {
                  icon: <TriangleAlert className="w-5 h-5 text-red-400" />,
                  title: 'OTP Code Request',
                  description: 'Caller asked you to share an OTP verification code - a common scam tactic.',
                },
                {
                  icon: <CircleAlert className="w-5 h-5 text-amber-400" />,
                  title: 'Urgency & Fear Tactics',
                  description: 'Used words like "urgent", "immediately", "blocked" to pressure you into acting quickly.',
                },
                {
                  icon: <ShieldAlert className="w-5 h-5 text-orange-400" />,
                  title: 'False Authority Claim',
                  description: 'Claimed to be from bank security without proper verification procedures.',
                },
                {
                  icon: <Clock className="w-5 h-5 text-red-400" />,
                  title: 'Time Pressure',
                  description: 'Created artificial urgency to prevent you from thinking clearly or verifying their identity.',
                },
              ]}
              elderMode={elderMode || false}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* ALERT OVERLAY */}
      <AlertOverlay
        isVisible={showAlert && isCallActive}
        onEndCall={handleEndCall}
        onMute={handleMuteCaller}
        onDismiss={handleDismissAlert}
        elderMode={elderMode || false}
      />
    </div>
  );
}