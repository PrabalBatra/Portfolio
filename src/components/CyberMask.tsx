import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export function CyberMask({ isSpeaking = false }: { isSpeaking?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isSpeakingRef = useRef(isSpeaking);

  // Keep ref in sync with prop for the animation loop
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Renderer Setup with Photorealistic Tone Mapping, Transparency, and Soft Shadows
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false
    });
    renderer.setClearColor(0x000000, 0); // Transparent backdrop
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Enable clean cinematic soft shadow maps
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Subdued, cinematic filmic tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 2. Scene Setup
    const scene = new THREE.Scene();

    // 3. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 0.2;

    // 4. Moody Studio Lighting (Soft Stealth Setup with Shadow Casting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(2, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.bias = -0.001;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Neon Blue orbit light casting dynamic shadows
    const pointlight = new THREE.PointLight(0x38bdf8, 3.5, 30); 
    pointlight.position.set(0, 3, 2);
    pointlight.castShadow = true;
    pointlight.shadow.bias = -0.002;
    pointlight.shadow.mapSize.width = 1024;
    pointlight.shadow.mapSize.height = 1024;
    scene.add(pointlight);

    // Neon Purple orbit light casting dynamic shadows
    const pointlight2 = new THREE.PointLight(0x818cf8, 3.5, 30); 
    pointlight2.position.set(0, 3, 2);
    pointlight2.castShadow = true;
    pointlight2.shadow.bias = -0.002;
    pointlight2.shadow.mapSize.width = 1024;
    pointlight2.shadow.mapSize.height = 1024;
    scene.add(pointlight2);

    // Backing Wall Projector: Receives neon light pools and shadows, Additive blending
    const wallGeometry = new THREE.PlaneGeometry(45, 45);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.85,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(0, 0, -2.6);
    wall.receiveShadow = true;
    scene.add(wall);

    // 5. Stealth Dark Gunmetal Material with 🌟 Precision Lower-Lip WebGL Deformer!
    const textureLoader = new THREE.TextureLoader();
    const roughnessMap = textureLoader.load('https://miroleon.github.io/daily-assets/surf_imp_02.jpg');
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

    // Custom shader uniform for lower lip articulation
    const customUniforms = {
      uSpeech: { value: 0.0 }
    };

    maskMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uSpeech = customUniforms.uSpeech;
      
      shader.vertexShader = `
        uniform float uSpeech;
        ${shader.vertexShader}
      `;

      // Modify vertex coordinates inside Three.js standard begin_vertex chunk
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        vec3 transformed = vec3( position );
        
        // 🌟 PRECISION BOUNDING BOX: Strictly below Y = -0.35 (untouched nose and upper lip), down to chin (-0.8), across mouth width (-0.35 to 0.35)
        if (transformed.y < -0.35 && transformed.y > -0.8 && abs(transformed.x) < 0.35) {
           // Smooth falloff starting precisely at the lip parting line
           float lipMask = smoothstep(-0.35, -0.65, transformed.y) * smoothstep(0.35, 0.0, abs(transformed.x));
           
           // Pull ONLY the lower lip & chin downward and slightly outward when speaking
           transformed.y -= uSpeech * lipMask * 0.18;
           transformed.z += uSpeech * lipMask * 0.06;
        }
        `
      );
    };

    let mask: THREE.Object3D | null = null;
    const fbxLoader = new FBXLoader();
    fbxLoader.setPath('https://miroleon.github.io/daily-assets/');
    fbxLoader.load('MASK_02.fbx', (object) => {
      mask = object.children[0];
      if (mask) {
        mask.position.set(0, -0.2, 0);
        mask.scale.setScalar(2.1);
        
        mask.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = maskMaterial;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(mask);
      }
    }, undefined, (err) => {
      console.error("Error loading cyber mask FBX model:", err);
    });

    const hdrLoader = new HDRLoader();
    hdrLoader.setPath('https://miroleon.github.io/daily-assets/');
    hdrLoader.load('gradient_13.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // 6. Mouse Tracker Logic
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation & Camera orbits
    let theta1 = 0;
    let speechClock = 0;
    let animationFrameId: number;

    const update = () => {
      const speaking = isSpeakingRef.current;
      const currentSpeed = speaking ? 0.04 : 0.007;
      theta1 += currentSpeed;

      if (speaking) {
        speechClock += 0.45; // Syllable oscillation speed
        customUniforms.uSpeech.value = Math.abs(Math.sin(speechClock));
      } else {
        speechClock = 0;
        customUniforms.uSpeech.value = THREE.MathUtils.lerp(customUniforms.uSpeech.value, 0.0, 0.65); // Instantly and crisply shut mouth
      }

      // Orbit camera
      camera.position.x = Math.sin(theta1) * 2;
      camera.position.y = 2.5 * Math.cos(theta1) + 1;

      // Dynamic light intensity modulation while speaking
      const blueIntensity = speaking ? 5.5 + Math.sin(theta1 * 12) * 2.5 : 3.5;
      const purpleIntensity = speaking ? 5.5 + Math.cos(theta1 * 15) * 2.5 : 3.5;
      pointlight.intensity = blueIntensity;
      pointlight2.intensity = purpleIntensity;

      // Orbit revolving point lights
      pointlight.position.x = Math.sin(theta1 + 1) * 11;
      pointlight.position.z = Math.cos(theta1 + 1) * 11;
      pointlight.position.y = 2 * Math.cos(theta1 - 3) + 3;

      pointlight2.position.x = -Math.sin(theta1 + 1) * 11;
      pointlight2.position.z = -Math.cos(theta1 + 1) * 11;
      pointlight2.position.y = 2 * -Math.cos(theta1 - 3) - 6;

      camera.lookAt(0, 0, 0);

      // Interactive mouse follow with ZERO head nodding (pure lower-lip gestures only!)
      if (mask) {
        mask.position.y = -0.2; // Perfectly locked head position
        mask.rotation.z = 0;    // Perfectly locked head tilt

        const targetRotY = mouseX * 0.6;
        const targetRotX = mouseY * 0.4;
        mask.rotation.y = THREE.MathUtils.lerp(mask.rotation.y, targetRotY, 0.05);
        mask.rotation.x = THREE.MathUtils.lerp(mask.rotation.x, targetRotX, 0.05);
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (window.scrollY < window.innerHeight * 1.2) {
        update();
        renderer.render(scene, camera);
      }
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. Teardown
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      const gl = renderer.getContext();
      const ext = gl?.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
