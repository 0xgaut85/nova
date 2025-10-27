'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const BRAND = '#b2a962';

export default function NovaHero() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    console.log('NovaHero: Initializing...');

    // ----- Renderer -----
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Style canvas
    const c = renderer.domElement;
    c.style.position = 'absolute';
    c.style.inset = '0';
    c.style.width = '100%';
    c.style.height = '100%';
    c.style.display = 'block';
    el.appendChild(c);

    console.log('NovaHero: Renderer ready');

    // ----- Scenes -----
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color('#191304'), 0.018);

    const backScene = new THREE.Scene();
    const backCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Camera
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 2000);
    camera.position.set(0, 26, 112);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    console.log('NovaHero: Scene ready');

    // ----- Background gradient -----
    const gradientUniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uBrand: { value: new THREE.Color(BRAND) },
    };
    
    const gradientMat = new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: false,
      transparent: true,
      uniforms: gradientUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform vec3 uBrand;
        
        void main() {
          vec2 uv = vUv;
          
          // Diagonal gradient
          float diag = clamp((uv.x - uv.y) * 0.9 + 0.55, 0.0, 1.0);
          vec3 col0 = vec3(0.10, 0.08, 0.03);
          vec3 col1 = vec3(0.18, 0.14, 0.05);
          vec3 lin = mix(col0, col1, diag);
          
          // Off-center radial glow
          vec2 center = vec2(0.30, 0.41);
          float dist = distance(uv, center);
          float rad = smoothstep(0.95, 0.0, dist * 1.25);
          vec3 glow = pow(uBrand, vec3(2.2)) * (0.15 + 0.65 * rad);
          
          // Animated grain
          float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233)) + uTime * 0.45) * 43758.5453) * 0.03;
          
          vec3 col = mix(vec3(0.03, 0.02, 0.01), lin + glow + grain, 0.85);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    
    const gradientQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), gradientMat);
    backScene.add(gradientQuad);

    console.log('NovaHero: Background ready');

    // ----- Grid geometry for particles -----
    const GRID_W = 300, GRID_D = 200, SEG_X = 256, SEG_Z = 128;
    const gridGeo = new THREE.PlaneGeometry(GRID_W, GRID_D, SEG_X, SEG_Z);
    gridGeo.rotateX(-Math.PI / 2);

    console.log('NovaHero: Grid geometry ready');

    // ----- Node points (at every grid vertex) -----
    const makeGridPoints = (geo: THREE.PlaneGeometry) => {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const pts: number[] = [];
      // Use EVERY vertex (not skipping any)
      for (let i = 0; i < pos.count; i++) {
        pts.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      return g;
    };
    
    const pointsGeo = makeGridPoints(gridGeo);
    const pointsUniforms = {
      uTime: { value: 0 },
      uBrand: { value: new THREE.Color(BRAND) },
    };
    
    const pointsMat = new THREE.ShaderMaterial({
      uniforms: pointsUniforms,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        // Simplex 3D noise (same as grid)
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          vec4 j = p - 49.0 * floor(p * (1.0 / 49.0));
          vec4 x_ = floor(j * (1.0 / 7.0));
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = (x_ * 2.0 + 0.5) / 7.0 - 1.0;
          vec4 y = (y_ * 2.0 + 0.5) / 7.0 - 1.0;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a1.xy, h.y);
          vec3 p2 = vec3(a0.zw, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        uniform float uTime;
        varying float vDepth;
        varying float vPhase;
        
        void main() {
          vec3 pos = position;
          float t = uTime;
          
          // EXACT SAME displacement as grid shader
          float n1 = snoise(vec3(pos.x * 0.03 + t * 0.015, pos.z * 0.05, t * 0.05));
          float n2 = snoise(vec3(pos.x * 0.08 + 20.0, pos.z * 0.02 - 17.0, t * 0.09)) * 0.5;
          float wave = sin(pos.x * 0.08 + t * 0.6) * 0.4 + sin(pos.z * 0.11 + t * 0.45) * 0.3;
          
          // Same far-field attenuation as grid
          float depthAtten = smoothstep(-80.0, 80.0, pos.z);
          float amp = mix(1.0, 0.2, depthAtten);
          pos.y += (n1 + n2 + wave) * 3.0 * amp;
          
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          
          // Adjust point size based on distance from camera
          float size = 2.8 * (400.0 / -mv.z);
          gl_PointSize = clamp(size, 1.0, 8.0);
          vDepth = -mv.z;
          vPhase = fract(sin(dot(pos.xz, vec2(12.9898, 78.233))) * 43758.5453);
        }
      `,
      fragmentShader: `
        precision highp float;
        
        uniform float uTime;
        uniform vec3 uBrand;
        varying float vDepth;
        varying float vPhase;
        
        void main() {
          vec2 uv = gl_PointCoord * 2.0 - 1.0;
          float r = dot(uv, uv);
          if (r > 1.0) discard;
          
          float core = exp(-3.5 * r);
          float halo = exp(-1.5 * r) * 0.35;
          float tw = 0.78 + 0.22 * sin(uTime * 0.6 + vPhase * 6.28318);
          float att = clamp(vDepth / 240.0, 0.2, 1.0);
          
          vec3 col = uBrand * (0.65 * core + 0.45 * halo) * tw * att;
          gl_FragColor = vec4(col, (0.7 * core + 0.4 * halo) * tw);
        }
      `,
    });
    
    const nodes = new THREE.Points(pointsGeo, pointsMat);
    nodes.position.set(0, -6, 50);
    scene.add(nodes);

    console.log('NovaHero: Nodes ready');

    // ----- Sizing -----
    const sizeToEl = () => {
      const w = el.clientWidth || window.innerWidth || 1500;
      const h = el.clientHeight || window.innerHeight || 500;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      gradientUniforms.uResolution.value.set(w, h);
      return { w, h };
    };
    
    const { w, h } = sizeToEl();

    // ----- Post FX -----
    const composer = new EffectComposer(renderer);
    composer.setSize(w, h);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.85, 1.0, 0.74);
    composer.addPass(bloom);

    console.log('NovaHero: Composer ready');

    // ----- Resize -----
    const onSize = () => {
      const { w, h } = sizeToEl();
      composer.setSize(w, h);
      bloom.setSize(w, h);
    };
    const ro = new ResizeObserver(onSize);
    ro.observe(el);

    // ----- Loop -----
    const clock = new THREE.Clock();
    let raf = 0;
    
    const loop = () => {
      const t = clock.getElapsedTime();
      
      // Update all uniforms
      gradientUniforms.uTime.value = t;
      pointsUniforms.uTime.value = t;
      
      // Animate particles
      nodes.position.x = Math.sin(t * 0.1) * 2.0;
      
      // Render: background first, then scene with bloom
      renderer.autoClear = true;
      renderer.clear();
      renderer.render(backScene, backCam);
      renderer.autoClear = false;
      composer.render();
      
      raf = requestAnimationFrame(loop);
    };
    
    console.log('NovaHero: Starting loop');
    raf = requestAnimationFrame(loop);

    // ----- Cleanup -----
    return () => {
      console.log('NovaHero: Cleanup');
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      if (wrapRef.current && c.parentNode === wrapRef.current) {
        wrapRef.current.removeChild(c);
      }
      gridGeo.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      gradientQuad.geometry.dispose();
      gradientMat.dispose();
    };
  }, []);

  return <div ref={wrapRef} className="absolute inset-0" />;
}
