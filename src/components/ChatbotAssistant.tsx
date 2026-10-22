import React, { useState } from 'react';
import { MessageSquare, X, Bot, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/websiteData';

interface ChatbotAssistantProps {
  onOpenQuote: (service?: string) => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Tours & Travels. How can I assist you with corporate employee transport, 3D fleet specifications, or contract logistics today?'
    }
  ]);

  const quickQuestions = [
    { label: '📍 What areas do you serve in Bengaluru?', answer: 'We cover all major Bengaluru IT hubs: Whitefield, Electronic City, Bellandur, Marathahalli Outer Ring Road, Sarjapur, Manyata Tech Park, Hosakote, and Airport Corridors.' },
    { label: '🛡️ How is driver safety verified?', answer: 'Every chauffeur is 100% police-verified, POSH certified, and monitored via Nyletech real-time GPS with physical SOS panic buttons in all vehicles.' },
    { label: '⚡ Do you have Electric Vehicles (EV)?', answer: 'Yes! We operate Tata Tigor and Nexon EVs for zero-emission corporate commutes, backed by charging infrastructure.' },
    { label: '📋 How can I request a corporate quote?', answer: 'You can request a custom proposal directly here, or we can instantly connect you to our 24/7 dispatch desk on WhatsApp!' },
  ];

  const handleQuestionClick = (q: typeof quickQuestions[0]) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: q.label },
      { sender: 'bot', text: q.answer }
    ]);
  };

  return (
    <>
      {/* Floating Chat Launcher Button (Bottom-Left) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white shadow-xl shadow-orange-500/30 flex items-center justify-center border border-orange-400/50 hover:brightness-110 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Toggle Assistant"
        title="Chat with Tours & Travels Assistant"
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <MessageSquare className="w-5 h-5 text-white" />}
      </button>

      {/* Floating Automotive Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[480px] max-h-[calc(100vh-7rem)] rounded-3xl bg-[#111827] border border-white/15 shadow-2xl flex flex-col overflow-hidden text-white animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="p-4 bg-[#0B0F19] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Bot className="w-4 h-4 text-[#F97316]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Tours &amp; Travels Virtual Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-orange-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>Online · Operations Desk</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white bg-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#111827]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white rounded-br-none font-medium shadow-md'
                      : 'bg-[#162032] text-slate-200 border border-white/10 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Questions */}
            <div className="pt-2">
              <div className="text-[10px] uppercase font-mono font-bold text-slate-400 mb-2 tracking-wider">
                Common Inquiries
              </div>
              <div className="space-y-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuestionClick(q)}
                    className="w-full text-left p-2.5 rounded-xl bg-[#0B0F19] border border-white/5 hover:border-orange-500/50 hover:bg-[#162032] text-slate-300 hover:text-white transition-all text-xs flex items-center justify-between group cursor-pointer"
                  >
                    <span>{q.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Footer */}
          <div className="p-3 bg-[#0B0F19] border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              Desk: <strong className="text-orange-400">{COMPANY_INFO.contacts.primaryPhone}</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenQuote();
              }}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white hover:brightness-110 shadow-md shadow-orange-500/20"
            >
              Request Quote
            </button>
          </div>

        </div>
      )}
    </>
  );
};
