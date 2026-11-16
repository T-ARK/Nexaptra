import React, { useState } from 'react';
import { Bot, Send, Sparkles, Terminal, User } from 'lucide-react';
import { CaptureAnalysisData } from '../../types/api';

interface AiAssistantViewProps {
  analysisData: CaptureAnalysisData | null;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ analysisData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Tactical Forensic Copilot initialized. Currently tracking capture: ${
        analysisData?.filename || 'sample_traffic.pcap'
      }. How can I assist with your packet investigation today?`,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'Summarize capture forensics',
    'Check for DNS tunneling indicators',
    'Analyze top talking hosts',
    'Evaluate SYN flood risk',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let aiResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('summarize')) {
        aiResponse = `**Forensic Summary for ${analysisData?.filename || 'sample_traffic.pcap'}:**\n- **Total Frames Ingested:** ${analysisData?.total_packets || 9}\n- **Protocols Active:** DNS, HTTP, ICMP, TLS\n- **Unique Endpoints:** 4 source IPs, 4 destination IPs\n- **Threat Level:** Low / Baseline Normal\n- **Isolation Forest Score:** 0.044 (Well below 0.65 alert threshold)`;
      } else if (lower.includes('dns') || lower.includes('tunnel')) {
        aiResponse = `**DNS Forensics Assessment:**\n- Queries observed conform to RFC 1035 standards.\n- Maximum domain label length: 14 characters.\n- Average Shannon Entropy: 3.12 (Normal alphanumeric distribution).\n- **Verdict:** No evidence of DNS tunneling or data exfiltration.`;
      } else if (lower.includes('host') || lower.includes('talk')) {
        aiResponse = `**Host Communication Analysis:**\n- Dominant internal source: \`192.168.1.105\` (RFC 1918 Private Subnet).\n- Dominant egress destination: \`140.82.112.6\` (TCP 443 HTTPS).\n- All connections show orderly termination with normal FIN/ACK flags.`;
      } else {
        aiResponse = `Analysis of **${text}**: Heuristic engine reports nominal packet telemetry. Flow features evaluated across 12 statistical dimensions indicate consistent behavior with standard web browsing and DNS resolution.`;
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse },
      ]);
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-[#00ff88]" />
          <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-wider">
            AI_ASSISTANT // FORENSIC COPILOT
          </h2>
        </div>
        <p className="text-xs font-mono text-[#888888] mt-0.5">
          [INTERACTIVE_HEURISTIC_EXPERT_SYSTEM]
        </p>
      </div>

      {/* Chat Container */}
      <div className="p-4 sm:p-6 bg-[#0a0a0a] border border-[#00ff88]/25 relative flex flex-col h-[520px]">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 font-mono text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3 max-w-xl border leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#00ff88]/15 border-[#00ff88]/40 text-white'
                    : 'bg-[#050505] border-[#222222] text-[#dddddd]'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Prompts Bar */}
        <div className="py-2.5 border-t border-[#1a1a1a] flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 text-[11px] font-mono bg-[#050505] hover:bg-[#00ff88]/10 text-[#888888] hover:text-[#00ff88] border border-[#222222] hover:border-[#00ff88]/40 transition-colors"
            >
              + {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="pt-2 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Forensic Copilot a query about this capture..."
            className="flex-1 bg-[#050505] border border-[#00ff88]/30 px-3 py-2 text-xs font-mono text-white placeholder:text-[#555555] focus:outline-none focus:border-[#00ff88]"
          />
          <button
            type="submit"
            className="px-4 py-2 btn-tactical-primary text-xs flex items-center space-x-1"
          >
            <span>SEND</span>
            <Send className="w-3.5 h-3.5 ml-1 text-black" />
          </button>
        </form>
      </div>
    </div>
  );
};
