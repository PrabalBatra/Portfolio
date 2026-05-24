import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 🌟 Persistent Global Cache to reuse the exact same WebGL Canvas & Context across page mounts
let globalCanvas: HTMLCanvasElement | null = null;
let globalRenderer: THREE.WebGLRenderer | null = null;
let globalScene: THREE.Scene | null = null;
let globalCamera: THREE.PerspectiveCamera | null = null;
let globalMask: THREE.Object3D | null = null;
let globalPointLight: THREE.PointLight | null = null;
let globalPointLight2: THREE.PointLight | null = null;
let globalCoreBackLight: THREE.PointLight | null = null;
let globalGlowMesh: THREE.Mesh | null = null;
let globalGlowUniforms: any = null;
let globalCustomUniforms: any = null;
let globalSpeechClock = 0;
let globalTheta = 0;
let globalMouse = { x: 0, y: 0 };
let hasInitialized = false;

// Global reference for speaking state to avoid React closure traps
const globalSpeakingState = { current: false };

export function CyberMask({ isSpeaking = false }: { isSpeaking?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep global speaking state in sync with React prop
  useEffect(() => {
    globalSpeakingState.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId = 0;

    // 1. Initial setup helper
    const setupThree = () => {
      globalCanvas = document.createElement('canvas');
      globalCanvas.style.width = '100%';
      globalCanvas.style.height = '100%';
      globalCanvas.style.display = 'block';

      try {
        globalRenderer = new THREE.WebGLRenderer({
          canvas: globalCanvas,
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          premultipliedAlpha: false
        });
      } catch (err) {
        console.error("Three.js WebGLRenderer creation failed inside CyberMask:", err);
        return false;
      }

      globalRenderer.setClearColor(0x000000, 0); // Transparent background
      globalRenderer.setPixelRatio(1);
      globalRenderer.shadowMap.enabled = false;
      globalRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      globalRenderer.toneMappingExposure = 1.05;
      globalRenderer.outputColorSpace = THREE.SRGBColorSpace;

      globalScene = new THREE.Scene();
      
      globalCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
      globalCamera.position.z = 10;
      globalCamera.position.y = 0.2;

      // Lighting Setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      globalScene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(2, 5, 5);
      globalScene.add(dirLight);

      // Neon lights
      globalPointLight = new THREE.PointLight(0x38bdf8, 3.5, 30);
      globalPointLight.position.set(0, 3, 2);
      globalScene.add(globalPointLight);

      globalPointLight2 = new THREE.PointLight(0x818cf8, 3.5, 30);
      globalPointLight2.position.set(0, 3, 2);
      globalScene.add(globalPointLight2);

      // Neon rim lights for premium aesthetics
      const rimLight1 = new THREE.DirectionalLight(0x38bdf8, 1.5);
      rimLight1.position.set(-5, 4, -5);
      globalScene.add(rimLight1);

      const rimLight2 = new THREE.DirectionalLight(0x818cf8, 1.2);
      rimLight2.position.set(5, -4, -5);
      globalScene.add(rimLight2);

      // Core Back Light
      globalCoreBackLight = new THREE.PointLight(0x38bdf8, 0, 15);
      globalCoreBackLight.position.set(0, 0, -1.2);
      globalScene.add(globalCoreBackLight);

      // Shader Glow
      globalGlowUniforms = {
        uColor: { value: new THREE.Color(0x38bdf8) },
        uSpeech: { value: 0.0 },
        uTime: { value: 0.0 }
      };

      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: globalGlowUniforms,
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

      globalGlowMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 5.0), glowMaterial);
      globalGlowMesh.position.set(0, -0.2, -1.1);
      globalScene.add(globalGlowMesh);

      // Back Wall
      const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(45, 45),
        new THREE.MeshStandardMaterial({
          color: 0x000000,
          roughness: 0.85,
          metalness: 0.1,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        })
      );
      wall.position.set(0, 0, -2.6);
      globalScene.add(wall);

      // Model Material
      const roughnessMap = new THREE.TextureLoader().load('https://miroleon.github.io/daily-assets/surf_imp_02.jpg');
      roughnessMap.wrapT = THREE.RepeatWrapping;
      roughnessMap.wrapS = THREE.RepeatWrapping;
      roughnessMap.colorSpace = THREE.NoColorSpace;

      const maskMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2b2b2b,
        roughness: 0.22,
        metalness: 1.0,
        roughnessMap: roughnessMap,
        envMapIntensity: 1.4,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
        reflectivity: 0.8
      });

      globalCustomUniforms = {
        uSpeech: { value: 0.0 }
      };

      // Load GLTF Model
      new GLTFLoader().load(import.meta.env.BASE_URL + 'vendetta_mask.glb', (gltf) => {
        globalMask = gltf.scene;
        if (globalMask) {
          globalMask.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = maskMaterial;
            }
          });

          const box = new THREE.Box3().setFromObject(globalMask);
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          const maxDim = Math.max(size.x, size.y, size.z);
          const targetScale = 4.5 / (maxDim || 1);
          globalMask.scale.setScalar(targetScale);

          globalMask.position.x = -center.x * targetScale;
          globalMask.position.y = -center.y * targetScale - 0.2;
          globalMask.position.z = -center.z * targetScale;

          globalScene?.add(globalMask);
        }
      }, undefined, (err) => {
        console.error("Error loading GLTF model in CyberMask:", err);
      });

      hasInitialized = true;
      return true;
    };

    // Initialize once globally
    if (!hasInitialized) {
      const ok = setupThree();
      if (!ok) return;
    }

    // Append persistent Canvas to parent page container
    if (globalCanvas) {
      container.appendChild(globalCanvas);
    }

    // Mouse tracker
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.x = (e.clientX / window.innerWidth) - 0.5;
      globalMouse.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    const tick = () => {
      if (!globalRenderer || !globalScene || !globalCamera) return;

      const speaking = globalSpeakingState.current;
      const currentSpeed = speaking ? 0.04 : 0.007;
      globalTheta += currentSpeed;

      if (speaking) {
        globalSpeechClock += 0.45;
        globalCustomUniforms.uSpeech.value = Math.abs(Math.sin(globalSpeechClock));
      } else {
        globalSpeechClock = 0;
        globalCustomUniforms.uSpeech.value = THREE.MathUtils.lerp(globalCustomUniforms.uSpeech.value, 0.0, 0.65);
      }

      const speechAmp = globalCustomUniforms.uSpeech.value;

      // Stable camera
      globalCamera.position.set(0, 0.2, 10);

      // Light glow modulation
      if (globalPointLight && globalPointLight2) {
        globalPointLight.intensity = speaking ? 5.5 + Math.sin(globalTheta * 12) * 2.5 : 3.5;
        globalPointLight2.intensity = speaking ? 5.5 + Math.cos(globalTheta * 15) * 2.5 : 3.5;

        globalPointLight.position.x = Math.sin(globalTheta + 1) * 11;
        globalPointLight.position.z = Math.cos(globalTheta + 1) * 11;
        globalPointLight.position.y = 2 * Math.cos(globalTheta - 3) + 3;

        globalPointLight2.position.x = -Math.sin(globalTheta + 1) * 11;
        globalPointLight2.position.z = -Math.cos(globalTheta + 1) * 11;
        globalPointLight2.position.y = 2 * -Math.cos(globalTheta - 3) - 6;
      }

      // Backlight modulation
      if (globalCoreBackLight) {
        if (speaking) {
          globalCoreBackLight.intensity = 15.0 + speechAmp * 25.0;
          globalCoreBackLight.color.setHex(speechAmp > 0.5 ? 0x818cf8 : 0x38bdf8);
        } else {
          globalCoreBackLight.intensity = THREE.MathUtils.lerp(globalCoreBackLight.intensity, 0, 0.1);
        }
      }

      // Halo Shader Update
      if (globalGlowUniforms && globalGlowMesh) {
        globalGlowUniforms.uSpeech.value = speechAmp;
        globalGlowUniforms.uTime.value = globalTheta;

        const currentGlowColor = new THREE.Color();
        currentGlowColor.lerpColors(new THREE.Color(0x38bdf8), new THREE.Color(0x818cf8), speechAmp);
        globalGlowUniforms.uColor.value.copy(currentGlowColor);

        const targetGlowScale = 1.0 + speechAmp * 0.40;
        globalGlowMesh.scale.set(targetGlowScale, targetGlowScale, 1.0);
      }

      // Model rotation follow
      if (globalMask) {
        globalMask.position.y = -0.2;
        globalMask.rotation.z = 0;
        
        const targetRotY = globalMouse.x * 0.6;
        const targetRotX = globalMouse.y * 0.4;
        globalMask.rotation.y = THREE.MathUtils.lerp(globalMask.rotation.y, targetRotY, 0.05);
        globalMask.rotation.x = THREE.MathUtils.lerp(globalMask.rotation.x, targetRotX, 0.05);
      }

      globalCamera.lookAt(0, 0, 0);
      globalRenderer.render(globalScene, globalCamera);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      tick();
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!globalCamera || !globalRenderer) return;
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      globalCamera.aspect = w / h;
      globalCamera.updateProjectionMatrix();
      globalRenderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize(); // Execute once to align size

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Cleanly un-mount from parent page DOM container without losing the WebGL context
      if (globalCanvas && globalCanvas.parentElement === container) {
        container.removeChild(globalCanvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      aria-label="3D CyberMask React interactive visualizer"
    />
  );
}

export default CyberMask;
