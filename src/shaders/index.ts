import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Holographic shader material
export const HolographicMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.5, 1.0),
    opacity: 1.0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform float opacity;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      // Create holographic effect
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      
      // Animated waves
      float wave1 = sin(vPosition.y * 10.0 + time * 2.0) * 0.1;
      float wave2 = sin(vPosition.x * 8.0 + time * 1.5) * 0.1;
      float wave3 = sin(vPosition.z * 12.0 + time * 3.0) * 0.1;
      
      float waves = wave1 + wave2 + wave3;
      
      // Holographic lines
      float lines = sin(vUv.y * 50.0 + time * 5.0) * 0.5 + 0.5;
      lines = smoothstep(0.4, 0.6, lines);
      
      // Final color
      vec3 finalColor = color + vec3(waves * 0.5);
      finalColor = mix(finalColor, vec3(1.0), fresnel * 0.3);
      finalColor = mix(finalColor, vec3(0.0, 1.0, 1.0), lines * 0.2);
      
      float alpha = opacity * (fresnel + 0.3) * (1.0 + waves * 0.2);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

// Portal shader material
export const PortalMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.5, 0.3, 1.0),
    intensity: 1.0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 pos = vUv - center;
      
      float dist = length(pos);
      float angle = atan(pos.y, pos.x);
      
      // Rotating spiral
      float spiral = sin(angle * 8.0 + dist * 20.0 - time * 4.0) * 0.5 + 0.5;
      
      // Pulsing rings
      float rings = sin(dist * 30.0 - time * 6.0) * 0.5 + 0.5;
      
      // Energy waves
      float energy = sin(dist * 10.0 - time * 8.0) * 0.3 + 0.7;
      
      // Combine effects
      float pattern = spiral * rings * energy;
      
      // Fade from center
      float fade = 1.0 - smoothstep(0.0, 0.5, dist);
      
      vec3 finalColor = color * pattern * intensity;
      float alpha = fade * pattern * 0.8;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

// Particle shader material
export const ParticleMaterial = shaderMaterial(
  {
    time: 0,
    size: 1.0,
    color: new THREE.Color(1.0, 1.0, 1.0),
  },
  // vertex shader
  `
    uniform float time;
    uniform float size;
    
    attribute float aSize;
    attribute float aTimeOffset;
    
    varying float vOpacity;
    
    void main() {
      // Animate particle size
      float animatedSize = aSize * (1.0 + sin(time * 2.0 + aTimeOffset) * 0.3);
      
      // Calculate opacity based on distance and animation
      vOpacity = sin(time + aTimeOffset) * 0.5 + 0.5;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = animatedSize * size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // fragment shader
  `
    uniform vec3 color;
    varying float vOpacity;
    
    void main() {
      // Create circular particle
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      if (dist > 0.5) discard;
      
      float alpha = (1.0 - dist * 2.0) * vOpacity;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

// Extend materials so they can be used in JSX
extend({ HolographicMaterial, PortalMaterial, ParticleMaterial });