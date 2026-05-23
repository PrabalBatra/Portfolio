import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberMask } from './CyberMask';

const KNOWLEDGE_BASE: Record<string, string> = {
  who: "Prabal Batra is a senior AI Engineer & Geospatial Intelligence architect. He specializes in multi-agent systems, deep spatial vision pipelines, high-frequency RAG architectures, and custom WebGL hardware-accelerated interfaces.",
  experience: "Prabal engineered cutting-edge systems at Genesys as an AI Intern — building automated geospatial feature recognition and multi-sensor RAG architectures, delivering massive speedups for enterprise geo-data processing.",
  skills: "His stack: TypeScript, React, Next.js, TanStack, Python, PyTorch, LangChain, CrewAI, Three.js, PostgreSQL, Docker, and high-performance serverless cloud infrastructure.",
  projects: "Key projects include Astroterra (autonomous Lunar Crater Navigation), Visual Intelligence Dome (3D geospatial gallery), and Gamora (a custom WebGL full-scene LLM entity).",
  patents: "Prabal holds multiple published research works and technical engineering disclosures in autonomous deep learning vision networks and geospatial analysis algorithms.",
  achievements: "Outstanding academic honors — 9.2 GPA, high-ranking awards in global deep learning hackathons, and certified research in neural spatial analytics.",
  contact: "Reach Prabal at batraprabal2003@gmail.com or via the social links at the bottom of this portal.",
  hello: "Greetings. I am GAMORA, Prabal's autonomous AI assistant. Ask me anything about his work, projects, or skills.",
  default: "I've registered your query. Ask me about Prabal's 'experience', 'skills', 'projects', 'achievements', or 'contact'."
};

function getLocalResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('who') || q.includes('prabal') || q.includes('about') || q.includes('bio')) return KNOWLEDGE_BASE.who;
  if (q.includes('work') || q.includes('job') || q.includes('genesys') || q.includes('intern') || q.includes('experience')) return KNOWLEDGE_BASE.experience;
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know') || q.includes('tool')) return KNOWLEDGE_BASE.skills;
  if (q.includes('project') || q.includes('build') || q.includes('make') || q.includes('rag') || q.includes('astroterra')) return KNOWLEDGE_BASE.projects;
  if (q.includes('patent') || q.includes('book') || q.includes('publish') || q.includes('author') || q.includes('research')) return KNOWLEDGE_BASE.patents;
  if (q.includes('achieve') || q.includes('award') || q.includes('honor') || q.includes('cgpa')) return KNOWLEDGE_BASE.achievements;
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone')) return KNOWLEDGE_BASE.contact;
  if (q.includes('hi') || q.includes('hello') || q.includes('hey')) return KNOWLEDGE_BASE.hello;
  return KNOWLEDGE_BASE.default;
}

export function GamoraChatbar() {
  const [inputVal, setInputVal] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleDismiss = (text: string) => {
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    const readTime = Math.max(5000, text.length * 40);
    dismissTimerRef.current = setTimeout(() => {
      setShowResponse(false);
      setTimeout(() => setResponseText(''), 600);
    }, Math.min(readTime, 18000));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = inputVal.trim();
    if (!query || isStreaming) return;

    setInputVal('');
    setResponseText('');
    setShowResponse(true);
    setIsStreaming(true);
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);

    const backendUrl = import.meta.env.PROD
      ? "https://prabal_batra_ai.gamora.workers.dev/api/chat"
      : "http://localhost:8787/api/chat";

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: query }] })
      });

      if (!response.ok) throw new Error("Offline");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const dataVal = trimmed.slice(6).trim();
          if (dataVal === "[DONE]") continue;
          try {
            const parsed = JSON.parse(dataVal);
            const token = parsed.choices?.[0]?.delta?.content || "";
            if (token) {
              accumulated += token;
              setResponseText(accumulated);
            }
          } catch {}
        }
      }

      setIsStreaming(false);
      scheduleDismiss(accumulated);

    } catch {
      const fallback = getLocalResponse(query);
      const words = fallback.split(" ");
      let i = 0;
      let built = "";

      const tick = setInterval(() => {
        if (i < words.length) {
          built += (i === 0 ? "" : " ") + words[i];
          setResponseText(built);
          i++;
        } else {
          clearInterval(tick);
          setIsStreaming(false);
          scheduleDismiss(built);
        }
      }, 38);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '2rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      pointerEvents: 'none', // Let clicks pass through the bounding box
    }}>
      
      {/* Streaming Response Floating Text */}
      <AnimatePresence>
        {showResponse && responseText && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{
              marginBottom: '1rem',
              width: '320px',
              padding: '1rem 1.25rem',
              background: 'rgba(9,7,24,0.65)',
              border: '1px solid rgba(56,189,248,0.2)',
              borderRadius: '16px 16px 4px 16px',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              pointerEvents: 'auto',
            }}
          >
             <p style={{
              fontFamily: 'Space Grotesk, system-ui, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)',
              margin: 0,
            }}>
              {responseText}
              {isStreaming && (
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  background: '#38bdf8',
                  marginLeft: '4px',
                  verticalAlign: 'text-bottom',
                  animation: 'gamora-caret 0.8s steps(1) infinite'
                }} />
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Gamora Avatar */}
      <div style={{
        width: '180px',
        height: '180px',
        marginBottom: '-1rem', // Pull input closer
        pointerEvents: 'none',
        filter: isStreaming ? 'drop-shadow(0 0 20px rgba(56,189,248,0.4))' : 'none',
        transition: 'filter 0.5s ease',
      }}>
        <CyberMask isSpeaking={isStreaming} />
      </div>

      {/* Interactive Input Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(9,7,24,0.85)',
          border: '1px solid rgba(56,189,248,0.3)',
          borderRadius: '100px',
          padding: '0.4rem 0.4rem 0.4rem 1.2rem',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          width: '320px',
          pointerEvents: 'auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(56,189,248,0.1)',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Ask Gamora..."
          disabled={isStreaming}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'white',
            fontSize: '0.85rem',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isStreaming}
          style={{
            flexShrink: 0,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: (inputVal.trim() && !isStreaming)
              ? 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)'
              : 'rgba(255,255,255,0.08)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (inputVal.trim() && !isStreaming) ? 'pointer' : 'default',
            transition: 'all 0.3s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      <style>{`
        @keyframes gamora-caret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
