import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Comprehensive knowledge base exactly synchronized with Prabal Batra's official Resume
const KNOWLEDGE_BASE: { [key: string]: string } = {
  default: "I am the interactive AI assistant for Prabal Batra. Prabal is an elite AI Engineer specializing in Geospatial Intelligence, Multi-Agent Systems, and Large Language Model architectures. Feel free to ask me about his work experience, technical skills, patents, or projects.",
  who: "Prabal Batra is a cutting-edge AI Engineer currently pursuing his B.E. in Computer Science & Engineering with a specialization in Big Data and Analytics at Chandigarh University. He is currently an Apprenticeship Trainee at Genesys International Corporation in Mumbai.",
  experience: "Prabal currently works as an Apprenticeship Trainee at Genesys International in Mumbai, where he presented an Agentic AI system to leadership and investors. Previously, he was a Business Analyst Intern at Ozibook in Bangalore.",
  skills: "Prabal's core tech stack includes AI orchestration with LangChain and LangGraph, Structured and Vector RAG pipelines, FastAPI backend architecture, PyTorch, TensorFlow, OpenCV, Docker, AWS, PostGIS spatial queries, and Python DSA.",
  projects: "Prabal has engineered an Agentic RAG Geospatial Platform reducing LLM token overhead by 92 percent. He also built a Multi-Agent Graph RAG Reasoning System and Astroterra, a CNN lunar crater detection pipeline achieving 90 percent accuracy.",
  patents: "Prabal has filed two patent applications: 'Mycofibre Composite' (No: 202311048967) and an 'AI-Enabled Tracking Security System' (No: 202311054397). He also published a book chapter on Hybrid Metal Additive Manufacturing in 2023.",
  achievements: "Prabal received the Academic Excellence Award at Chandigarh University for outstanding performance, filed two innovative patents, and successfully deployed production-grade GenAI systems processing over 100 spatial queries per day.",
  contact: "You can contact Prabal directly via phone at +91 9413829248 or email at batraprabal04@gmail.com. You can also connect with him on GitHub or LinkedIn under the handle prabal-batra.",
  hello: "Greetings, visitor. Welcome to Prabal Batra's cinematic AI portfolio. Ask me anything about his credentials, patents, or project experience."
};

export function CosmicAIVoice({ onSpeakingChange }: { onSpeakingChange: (speaking: boolean) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  
  const sentenceQueueRef = useRef<string[]>([]);
  const isCancelledRef = useRef(false);
  const wordPulseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopSpeech = () => {
    isCancelledRef.current = true;
    sentenceQueueRef.current = [];
    if (wordPulseTimeoutRef.current) clearTimeout(wordPulseTimeoutRef.current);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    onSpeakingChange(false);
  };

  const speakNextSentence = () => {
    if (isCancelledRef.current || sentenceQueueRef.current.length === 0) {
      setIsSpeaking(false);
      onSpeakingChange(false);
      return;
    }

    const sentence = sentenceQueueRef.current.shift();
    if (!sentence || !sentence.trim()) {
      speakNextSentence();
      return;
    }

    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(sentence.trim());
    utterance.pitch = 0.8;
    utterance.rate = 0.95;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Natural')));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onboundary = (event) => {
      if (isCancelledRef.current) return;
      if (event.name === 'word') {
        onSpeakingChange(true);
        if (wordPulseTimeoutRef.current) clearTimeout(wordPulseTimeoutRef.current);
        wordPulseTimeoutRef.current = setTimeout(() => {
          if (!isCancelledRef.current) {
            onSpeakingChange(false);
          }
        }, 280);
      }
    };

    utterance.onstart = () => {
      onSpeakingChange(true);
    };

    utterance.onend = () => {
      if (isCancelledRef.current) return;
      if (wordPulseTimeoutRef.current) clearTimeout(wordPulseTimeoutRef.current);
      
      onSpeakingChange(false);

      if (sentenceQueueRef.current.length > 0) {
        setTimeout(() => {
          speakNextSentence();
        }, 450);
      } else {
        setIsSpeaking(false);
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      onSpeakingChange(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const speakResponse = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech is not supported in this browser.");
      return;
    }

    stopSpeech();
    isCancelledRef.current = false;

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    sentenceQueueRef.current = [...sentences];

    speakNextSentence();
  };

  const processQuery = (query: string) => {
    const q = query.toLowerCase();
    let responseText = KNOWLEDGE_BASE.default;

    if (q.includes('who') || q.includes('prabal') || q.includes('about') || q.includes('bio')) {
      responseText = KNOWLEDGE_BASE.who;
    } else if (q.includes('work') || q.includes('job') || q.includes('genesys') || q.includes('intern') || q.includes('experience')) {
      responseText = KNOWLEDGE_BASE.experience;
    } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know') || q.includes('tool')) {
      responseText = KNOWLEDGE_BASE.skills;
    } else if (q.includes('project') || q.includes('build') || q.includes('make') || q.includes('rag') || q.includes('astroterra')) {
      responseText = KNOWLEDGE_BASE.projects;
    } else if (q.includes('patent') || q.includes('book') || q.includes('publish') || q.includes('author') || q.includes('research')) {
      responseText = KNOWLEDGE_BASE.patents;
    } else if (q.includes('achieve') || q.includes('award') || q.includes('honor') || q.includes('cgpa')) {
      responseText = KNOWLEDGE_BASE.achievements;
    } else if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('number')) {
      responseText = KNOWLEDGE_BASE.contact;
    } else if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      responseText = KNOWLEDGE_BASE.hello;
    }

    setAiResponse(responseText);
    speakResponse(responseText);
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Free Speech Recognition is not supported in your browser. Try Chrome or Edge!");
      return;
    }

    stopSpeech();
    setTranscript('');
    setAiResponse('');
    setIsListening(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      processQuery(speechToText);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="absolute top-8 right-8 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      <AnimatePresence>
        {(transcript || aiResponse || isListening || isSpeaking) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-primary/30 max-w-sm text-left shadow-[0_0_30px_rgba(56,189,248,0.2)]"
          >
            {isListening && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono tracking-widest uppercase animate-pulse">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Listening to your voice...
              </div>
            )}

            {transcript && !isListening && (
              <div className="text-xs text-muted-foreground font-mono mb-2 italic border-b border-primary/10 pb-2">
                " {transcript} "
              </div>
            )}

            {aiResponse && (
              <div className="text-sm font-light text-foreground leading-relaxed flex items-start gap-2">
                <span className={`inline-block w-2 h-2 mt-1.5 rounded-full ${isSpeaking ? 'bg-indigo-400 shadow-[0_0_10px_#818cf8] animate-pulse' : 'bg-primary/50'}`} />
                <span>{aiResponse}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={isListening ? () => {} : (isSpeaking ? stopSpeech : startListening)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-3 px-5 py-3 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 backdrop-blur-md border ${
          isListening 
            ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-pulse' 
            : isSpeaking
            ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 shadow-[0_0_30px_rgba(129,140,248,0.5)]'
            : 'bg-black/60 border-primary/40 text-cyan-300 hover:bg-primary/20 hover:border-primary shadow-[0_0_20px_rgba(56,189,248,0.2)]'
        }`}
      >
        {isListening ? (
          <>
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute left-5" />
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse mr-1" />
            <span>Speak Now...</span>
          </>
        ) : isSpeaking ? (
          <>
            <div className="w-3 h-3 rounded-full bg-indigo-400 animate-ping absolute left-5" />
            <span className="w-3 h-3 rounded-full bg-indigo-400 mr-1" />
            <span>Stop AI Voice</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 10v2a7 7 0 0 1-14 0v-2m7 6v4m-3 0h6m-3-11a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0v-2a3 3 0 0 0-3-3z" />
            </svg>
            <span>Ask AI Assistant</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
