import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CosmicAIVoice } from './CosmicAIVoice';
import { AIVoiceVisualizer } from './AIVoiceVisualizer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImg from '../../public/profile.png';

const KNOWLEDGE_BASE: Record<string, string> = {
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

function getLocalResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('who') || q.includes('prabal') || q.includes('about') || q.includes('bio')) return KNOWLEDGE_BASE.who;
  if (q.includes('work') || q.includes('job') || q.includes('genesys') || q.includes('intern') || q.includes('experience')) return KNOWLEDGE_BASE.experience;
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know') || q.includes('tool')) return KNOWLEDGE_BASE.skills;
  if (q.includes('project') || q.includes('build') || q.includes('make') || q.includes('rag') || q.includes('astroterra')) return KNOWLEDGE_BASE.projects;
  if (q.includes('patent') || q.includes('book') || q.includes('publish') || q.includes('author') || q.includes('research')) return KNOWLEDGE_BASE.patents;
  if (q.includes('achieve') || q.includes('award') || q.includes('honor') || q.includes('cgpa')) return KNOWLEDGE_BASE.achievements;
  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone')) return KNOWLEDGE_BASE.contact;
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('default')) return KNOWLEDGE_BASE.hello;
  return KNOWLEDGE_BASE.default;
}

// Helper to highlight key terminology, patents, and roles in text responses
function highlightKeywords(text: string): React.ReactNode {
  if (!text) return "";
  const wordKeywords = [
    "AI Engineer", "Geospatial Intelligence", "Multi-Agent Systems", "Large Language Model", "Large Language Models",
    "LangGraph", "LangChain", "FastAPI", "PyTorch", "TensorFlow", "OpenCV", "Docker", "AWS", "PostGIS",
    "AstroTerra", "G.U.A.R.D", "GUARD", "Robocop", "Murphy Systum", "LifeMatrix", "Mycofibre Composite",
    "1st position", "Academic Excellence Award", "Agentic AI", "Graph RAG", "Vector RAG", "Digital Twin",
    "Apprenticeship Trainee", "Genesys International", "Ozibook", "Business Analyst", "Business Analyst Intern",
    "Chandigarh University", "Mumbai", "Bangalore", "GitHub", "LinkedIn", "batraprabal04@gmail.com", "prabal-batra"
  ];
  
  const specialKeywords = [
    "\\+91 9413829248"
  ];

  const escapedWordKws = wordKeywords.map(kw => kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const wordPattern = `\\b(${escapedWordKws.join('|')})\\b`;
  const specialPattern = `(${specialKeywords.join('|')})`;
  
  const regex = new RegExp(`${wordPattern}|${specialPattern}`, 'gi');
  
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (!part) return null;
    const isMatch = [
      ...wordKeywords,
      "+91 9413829248"
    ].some(kw => kw.toLowerCase() === part.toLowerCase());
    
    if (isMatch) {
      return (
        <span key={i} className="text-cyan-300 font-semibold drop-shadow-[0_0_8px_rgba(56,189,248,0.35)]">
          {part}
        </span>
      );
    }
    return part;
  });
}

// --- Text Mode Sub-component ---
function TextModeInterface() {
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const cancelStreamRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleStopStreaming = () => {
    cancelStreamRef.current = true;
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setIsStreaming(false);
  };

  useEffect(() => {
    return () => {
      cancelStreamRef.current = true;
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

  const chips = [
    { label: "Experience", icon: "🏢" },
    { label: "Projects", icon: "🚀" },
    { label: "Skills", icon: "⚡" },
    { label: "Contact", icon: "📞" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, preset?: string) => {
    e?.preventDefault();
    const query = preset || inputVal.trim();
    if (!query || isStreaming) return;

    setInputVal('');
    setMessages(prev => [...prev, { role: 'user', content: query }, { role: 'gamora', content: '' }]);
    setIsStreaming(true);
    cancelStreamRef.current = false;
    abortRef.current = null;

    const qLower = query.toLowerCase();
    const isKeyword = ['experience', 'projects', 'skills', 'contact', 'who'].some(k => qLower.includes(k));

    // If it's a preset chip OR a recognized keyword, instantly use the local knowledge base!
    if (preset || isKeyword) {
      let built = "";
      const fallbackMsg = getLocalResponse(query);
      const words = fallbackMsg.split(" ");
      for (let i = 0; i < words.length; i++) {
        if (cancelStreamRef.current) break;
        await new Promise(r => setTimeout(r, 35));
        if (cancelStreamRef.current) break;
        built += (i === 0 ? "" : " ") + words[i];
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = built;
          return newMsgs;
        });
      }
      setIsStreaming(false);
      return;
    }

    const backendUrl = import.meta.env.PROD
      ? "https://prabal_batra_ai.gamora.workers.dev/api/chat"
      : "http://localhost:8787/api/chat";

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: query }] }),
        signal: controller.signal
      });

      if (!response.ok) throw new Error("Offline");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let accumulated = "";

      while (true) {
        if (cancelStreamRef.current) break;
        const { done, value } = await reader.read();
        if (done) break;
        if (cancelStreamRef.current) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (cancelStreamRef.current) break;
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const dataVal = trimmed.slice(6).trim();
          if (dataVal === "[DONE]") continue;
          try {
            const parsed = JSON.parse(dataVal);
            const token = parsed.choices?.[0]?.delta?.content || "";
            if (token) {
              accumulated += token;
              setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1].content = accumulated;
                return newMsgs;
              });
            }
          } catch {}
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setIsStreaming(false);
        return;
      }
      // Fallback
      let built = "";
      const fallbackMsg = getLocalResponse(query);
      const words = fallbackMsg.split(" ");
      for (let i = 0; i < words.length; i++) {
        if (cancelStreamRef.current) break;
        await new Promise(r => setTimeout(r, 45));
        if (cancelStreamRef.current) break;
        built += (i === 0 ? "" : " ") + words[i];
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = built;
          return newMsgs;
        });
      }
    }
    setIsStreaming(false);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
      
      {/* Scrollable Message Area */}
      <div className="flex-1 w-full max-w-4xl overflow-y-auto px-6 pt-24 pb-48 flex flex-col items-center custom-chat-scroll">
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center mt-auto mb-auto"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 opacity-90 drop-shadow-[0_0_40px_rgba(167,139,250,0.3)]">
              <DotLottieReact src="/ai_animation_Flow_1.lottie" loop autoplay />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white/90 tracking-wide mt-4">
              How can I help you today?
            </h2>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col gap-8">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} w-full`}
              >
                <div className="flex items-center gap-3 mb-2 px-2">
                  {msg.role === 'gamora' && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-cyan-400/40 flex items-center justify-center shadow-[0_0_8px_rgba(56,189,248,0.3)] flex-shrink-0">
                      <img src={profileImg} alt="Gamora" className="w-full h-full object-cover select-none" />
                    </div>
                  )}
                  <span className="text-xs tracking-widest font-mono uppercase text-white/40">
                    {msg.role === 'user' ? 'YOU' : 'GAMORA'}
                  </span>
                </div>
                <div className={`px-5 py-3.5 rounded-2xl max-w-[88%] text-[0.95rem] leading-relaxed font-sans ${
                  msg.role === 'user' 
                    ? 'bg-cyan-500/5 border border-cyan-400/20 text-white/90 rounded-tr-none shadow-[0_2px_12px_rgba(56,189,248,0.05)]' 
                    : 'bg-[#0d0b12]/80 border border-white/10 text-white/90 rounded-tl-none shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
                }`}>
                  {msg.role === 'gamora' ? highlightKeywords(msg.content) : msg.content}
                  {isStreaming && i === messages.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-cyan-400 ml-2 animate-pulse align-middle" />
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Bottom Chatbar */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#060408] via-[#060408]/90 to-transparent pt-12 pb-8 px-6 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col gap-3">
          
          {/* Stop Generating Button */}
          <AnimatePresence>
            {isStreaming && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex justify-center mb-1"
              >
                <button
                  type="button"
                  onClick={handleStopStreaming}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/35 bg-rose-950/45 backdrop-blur-md text-rose-300 text-[10px] font-mono tracking-wider uppercase hover:bg-rose-500/20 active:scale-95 transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)] cursor-pointer"
                >
                  <span className="w-2 h-2 rounded bg-rose-400 animate-pulse" />
                  Stop Generation
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
            {chips.map(chip => (
              <button
                key={chip.label}
                onClick={() => handleSend(undefined, chip.label)}
                disabled={isStreaming}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm text-white/70 whitespace-nowrap cursor-pointer"
              >
                <span className="text-white/50">{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <form 
            onSubmit={handleSend}
            className="flex items-center gap-3 bg-[#110e1b]/80 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl"
          >
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isStreaming}
              className="flex-1 bg-transparent border-none outline-none text-white px-4 py-2 font-sans placeholder:text-white/30"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isStreaming}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      <style>{`
        .custom-chat-scroll::-webkit-scrollbar { width: 6px; }
        .custom-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}


interface GamoraOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GamoraOverlay({ isOpen, onClose }: GamoraOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  
  const [mode, setMode] = useState<'voice'|'text'>('text');
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [captionText, setCaptionText] = useState<string>("Greetings. I am GAMORA. Tap the microphone below to speak, or switch to Text mode.");
  
  const rafRef = useRef<number>(0);
  const maskRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 800);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mounted || mode !== 'voice') return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        premultipliedAlpha: false,
      });
    } catch (err) {
      console.error("Three.js WebGLRenderer creation in Gamora failed:", err);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 0.2;

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(2, 5, 5);
    scene.add(dir);
    const blue = new THREE.PointLight(0x38bdf8, 4.0, 40);
    scene.add(blue);
    const purple = new THREE.PointLight(0x818cf8, 4.0, 40);
    scene.add(purple);

    const coreBackLight = new THREE.PointLight(0x38bdf8, 0, 15);
    coreBackLight.position.set(0, 0, -1.2);
    scene.add(coreBackLight);

    const glowUniforms = {
      uColor: { value: new THREE.Color(0x38bdf8) },
      uSpeech: { value: 0.0 },
      uTime: { value: 0.0 }
    };

    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: glowUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float uSpeech;
        uniform float uTime;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float alpha = smoothstep(0.5, 0.1, dist);
          float glow = pow(clamp(1.0 - dist * 2.0, 0.0, 1.0), 1.8);
          float wave = sin(dist * 35.0 - uTime * 6.0) * 0.03 * uSpeech;
          alpha = clamp(alpha + wave, 0.0, 1.0);
          vec3 finalColor = uColor * (1.2 + uSpeech * 0.8);
          gl_FragColor = vec4(finalColor, alpha * (0.10 + uSpeech * 0.65) * glow);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const glowGeometry = new THREE.PlaneGeometry(5.0, 5.0);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.position.set(0, -0.2, -1.1);
    scene.add(glowMesh);

    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshStandardMaterial({
        color: 0x000000, roughness: 0.85, metalness: 0.1,
        transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending
      })
    );
    wall.position.set(0, 0, -5);
    scene.add(wall);

    const texLoader = new THREE.TextureLoader();
    const roughMap = texLoader.load('https://miroleon.github.io/daily-assets/surf_imp_02.jpg');
    roughMap.wrapT = THREE.RepeatWrapping;
    roughMap.wrapS = THREE.RepeatWrapping;
    roughMap.colorSpace = THREE.NoColorSpace;

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x2b2b2b, roughness: 0.22, metalness: 1.0,
      roughnessMap: roughMap, envMapIntensity: 1.5,
      clearcoat: 0.92, clearcoatRoughness: 0.07, reflectivity: 0.82
    });

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/vendetta_mask.glb', (gltf) => {
      const mesh = gltf.scene;
      if (mesh) {
        mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = mat;
            child.geometry.computeBoundingBox();
          }
        });
        const box = new THREE.Box3().setFromObject(mesh);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 4.5 / (maxDim || 1);
        mesh.scale.setScalar(targetScale);

        mesh.position.x = -center.x * targetScale;
        mesh.position.y = -center.y * targetScale - 0.2;
        mesh.position.z = -center.z * targetScale;

        scene.add(mesh);
        maskRef.current = mesh;
      }
    });

    let time = 0;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      time += 0.016;
      
      const spk = isSpeaking ? 1.0 : 0.0;
      glowUniforms.uSpeech.value += (spk - glowUniforms.uSpeech.value) * 0.1;
      glowUniforms.uTime.value = time;

      if (maskRef.current) {
        maskRef.current.position.y = -0.2 + Math.sin(time * 1.5) * 0.05;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
    };
  }, [mounted, mode]); // Removed isSpeaking to prevent WebGL re-initialization and massive lag

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#060408',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Top Navigation / Mode Switcher */}
      <div className="absolute top-6 left-0 right-0 px-8 flex justify-between items-center z-[110] pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setMode('voice')}
              className={`px-6 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                mode === 'voice' ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.2)]' : 'text-white/40 hover:text-white/80'
              }`}
            >
              Voice
            </button>
            <button
              onClick={() => setMode('text')}
              className={`px-6 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                mode === 'text' ? 'bg-indigo-500/20 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]' : 'text-white/40 hover:text-white/80'
              }`}
            >
              Text
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs font-mono uppercase tracking-widest hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 transition-all cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Exit
        </button>
      </div>

      {/* MODE: VOICE */}
      <AnimatePresence>
        {mode === 'voice' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            
            {/* Header Title */}
            <div className="absolute top-[12vh] w-full text-center flex flex-col items-center gap-3">
              <span className="font-sans text-[clamp(1.6rem,4vw,2.8rem)] font-light tracking-[0.2em] uppercase bg-gradient-to-br from-white via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                GAMORA
              </span>
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-indigo-400 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
                <span className="font-mono text-[0.62rem] tracking-[0.18em] text-cyan-400/80 uppercase">
                  {isSpeaking ? 'SPEAKING' : 'LISTENING'}
                </span>
              </div>
            </div>

            {/* Instruction Text */}
            <div className="absolute bottom-10 w-full text-center font-mono text-[0.58rem] tracking-[0.25em] text-white/20 uppercase pointer-events-none">
              Press ESC or Exit button to close
            </div>

            {/* Subtitles Overlay */}
            <div className="absolute bottom-[16rem] w-full max-w-2xl left-1/2 -translate-x-1/2 text-center pointer-events-none px-6">
               <p className="font-sans text-[clamp(0.85rem,2.2vw,1.05rem)] font-light leading-relaxed text-white/90 drop-shadow-lg">
                 {captionText}
               </p>
            </div>

            {/* Voice Visualizer & Mic */}
            <div className="absolute bottom-20 w-full h-24 flex justify-center items-center pointer-events-none">
              <AIVoiceVisualizer isSpeaking={isSpeaking} isListening={isListening} />
            </div>

            <div className="absolute bottom-[9rem] left-1/2 -translate-x-1/2 pointer-events-auto">
              <CosmicAIVoice onSpeakingChange={setIsSpeaking} onListeningChange={setIsListening} onTextChange={setCaptionText} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODE: TEXT */}
      <AnimatePresence>
        {mode === 'text' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <TextModeInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
