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

interface CosmicAIVoiceProps {
  onSpeakingChange: (speaking: boolean) => void;
  onListeningChange?: (listening: boolean) => void;
  onTextChange?: (text: string) => void;
}

export function CosmicAIVoice({ onSpeakingChange, onListeningChange, onTextChange }: CosmicAIVoiceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Real-time streaming voice synthesis queue refs
  const sentencesQueueRef = useRef<string[]>([]);
  const currentSpeakingIndexRef = useRef<number>(-1);
  const isStreamingFinishedRef = useRef<boolean>(false);
  const accumulatedFullTextRef = useRef<string>("");
  const isCancelledRef = useRef(false);

  // Sync listening state dynamically with parent overlay
  useEffect(() => {
    onListeningChange?.(isListening);
  }, [isListening, onListeningChange]);

  const stopSpeech = () => {
    isCancelledRef.current = true;
    sentencesQueueRef.current = [];
    currentSpeakingIndexRef.current = -1;
    isStreamingFinishedRef.current = false;
    accumulatedFullTextRef.current = "";
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    }
    setIsSpeaking(false);
    onSpeakingChange(false);
    onTextChange?.("");
  };

  const startStreamingSpeech = () => {
    stopSpeech();
    isCancelledRef.current = false;
  };

  const queueSentence = (sentence: string) => {
    if (!sentence || isCancelledRef.current) return;
    sentencesQueueRef.current.push(sentence);
    
    // Start speaking the first sentence immediately if not already active
    if (currentSpeakingIndexRef.current === -1) {
      currentSpeakingIndexRef.current = 0;
      speakSentenceAt(0);
    }
  };

  const speakSentenceAt = (index: number) => {
    if (isCancelledRef.current || index < 0) {
      setIsSpeaking(false);
      onSpeakingChange(false);
      return;
    }

    const sentence = sentencesQueueRef.current[index];
    if (!sentence) {
      // If we don't have the sentence yet, but the stream is not finished, we wait.
      if (isStreamingFinishedRef.current) {
        setIsSpeaking(false);
        onSpeakingChange(false);
        currentSpeakingIndexRef.current = -1;
      }
      return;
    }

    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(sentence.trim());
    utterance.pitch = 0.85; // Warm deep baritone pitch
    utterance.rate = 0.95;  // Calm high-end deliberate speed
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && v.localService === true && (v.name.includes('Microsoft') || v.name.includes('David') || v.name.includes('Google') || v.name.includes('Hazel') || v.name.includes('Zira')))
      || voices.find(v => v.lang.startsWith('en') && v.localService === true)
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];

    if (preferredVoice) utterance.voice = preferredVoice;

    let resumeInterval: NodeJS.Timeout | null = null;

    utterance.onstart = () => {
      if (isCancelledRef.current) return;
      setIsSpeaking(true);
      onSpeakingChange(true);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
        resumeInterval = setInterval(() => {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.resume();
          } else {
            if (resumeInterval) clearInterval(resumeInterval);
          }
        }, 5000);
      }
    };

    utterance.onend = () => {
      if (resumeInterval) clearInterval(resumeInterval);
      if (isCancelledRef.current) return;
      
      const nextIndex = index + 1;
      currentSpeakingIndexRef.current = nextIndex;
      onSpeakingChange(false); // Brief lip close
      
      setTimeout(() => {
        speakSentenceAt(nextIndex);
      }, 200); // Warm natural breath break
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis utterance error:", e);
      if (resumeInterval) clearInterval(resumeInterval);
      
      const nextIndex = index + 1;
      currentSpeakingIndexRef.current = nextIndex;
      speakSentenceAt(nextIndex);
    };

    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume(); // Clear stuck states
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakResponse = (text: string) => {
    startStreamingSpeech();
    onTextChange?.(text);
    accumulatedFullTextRef.current = text;
    
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const cleanedSentences = sentences.map(s => s.trim()).filter(Boolean);
    
    cleanedSentences.forEach(s => queueSentence(s));
    isStreamingFinishedRef.current = true;
  };

  const processQuery = async (query: string) => {
    stopSpeech();
    onTextChange?.(`Analyzing query: "${query}"...`);
    
    // Indigo breathing states to simulate cognitive processing link
    setIsSpeaking(true);
    onSpeakingChange(true);

    const backendUrl = import.meta.env.PROD
      ? "https://prabal_batra_ai.gamora.workers.dev/api/chat"
      : "http://localhost:8787/api/chat";

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: query }]
        })
      });

      if (!response.ok) throw new Error(`Server offline: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No downstream stream.");

      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let sentenceBuffer = "";

      // Initialize streaming state
      startStreamingSpeech();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const dataVal = trimmed.slice(6).trim();
            if (dataVal === "[DONE]") continue;
            try {
              const parsed = JSON.parse(dataVal);
              const token = parsed.choices?.[0]?.delta?.content || "";
              if (token) {
                // Update live captions/subtitles on overlay
                accumulatedFullTextRef.current += token;
                onTextChange?.(accumulatedFullTextRef.current);

                // Add to temporary sentence boundary detector
                sentenceBuffer += token;

                // Match a complete sentence (anything ending with ., !, ?, or a newline)
                const match = sentenceBuffer.match(/([^.!?\n]+[.!?\n]+)/);
                if (match) {
                  const sentence = match[1];
                  sentenceBuffer = sentenceBuffer.slice(sentence.length);
                  queueSentence(sentence.trim());
                }
              }
            } catch (err) {}
          }
        }
      }

      // Mark streaming as completed
      isStreamingFinishedRef.current = true;
      if (sentenceBuffer.trim()) {
        queueSentence(sentenceBuffer.trim());
      }

      // If we finished the entire stream and have queued nothing, trigger a fallback
      if (sentencesQueueRef.current.length === 0) {
        throw new Error("Empty response stream");
      }

    } catch (error) {
      console.warn("Using fallback local intelligence archives...", error);

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

      speakResponse(responseText);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported. Try Google Chrome or Microsoft Edge!");
      return;
    }

    stopSpeech();
    setIsListening(true);
    onTextChange?.("System online. Listening... Speak now!");

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      onTextChange?.(`You: "${speechToText}"`);
      processQuery(speechToText);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
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
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    /* 🎙️ Siri-Style Pulsing Mic Button positioned perfectly at the bottom above the active waveform visualizer */
    <div className="absolute bottom-[10.0rem] left-1/2 -translate-x-1/2 z-50 pointer-events-auto flex items-center justify-center">
      <motion.button
        onClick={isListening ? () => {} : (isSpeaking ? stopSpeech : startListening)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
          isListening 
            ? 'bg-rose-500/20 border border-rose-500 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.45)]' 
            : isSpeaking
            ? 'bg-indigo-500/20 border border-indigo-400 text-indigo-200 shadow-[0_0_30px_rgba(129,140,248,0.55)]'
            : 'bg-black/75 border border-primary/30 text-cyan-300 hover:bg-primary/25 hover:border-primary shadow-[0_0_15px_rgba(56,189,248,0.12)]'
        }`}
      >
        {/* Glowing concentric rings pulsing in physical speaking synchronization */}
        {(isListening || isSpeaking) && (
          <>
            <div className={`absolute inset-0 rounded-full animate-ping opacity-25 ${isListening ? 'bg-rose-500' : 'bg-indigo-400'}`} />
            <div className={`absolute -inset-1.5 rounded-full animate-pulse opacity-15 border ${isListening ? 'border-rose-500' : 'border-indigo-400'}`} />
          </>
        )}
        
        {isListening ? (
          <div className="w-3 h-3 bg-rose-400 rounded-sm animate-pulse" />
        ) : isSpeaking ? (
          <svg className="w-4.5 h-4.5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-4.5 h-4.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
