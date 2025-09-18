import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { Group } from 'three';

interface LODWrapperProps {
  children: React.ReactNode;
  distances?: number[];
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export function LODWrapper({ 
  children, 
  distances = [0, 10, 20], 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1] 
}: LODWrapperProps) {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const [visible, setVisible] = useState(true);

  useFrame(() => {
    if (groupRef.current) {
      const distance = camera.position.distanceTo(groupRef.current.position);
      
      // Simple visibility culling based on distance
      const maxDistance = distances[distances.length - 1];
      setVisible(distance <= maxDistance);
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {children}
    </group>
  );
}

// Performance monitor hook
export function usePerformanceMonitor() {
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('low'); // Começar em low
  const frameTimeRef = useRef<number[]>([]);

  useFrame((_, delta) => {
    frameTimeRef.current.push(delta);
    
    // Keep only last 30 frames (reduzido de 60)
    if (frameTimeRef.current.length > 30) {
      frameTimeRef.current.shift();
    }
    
    // Calculate average frame time
    const avgFrameTime = frameTimeRef.current.reduce((a, b) => a + b, 0) / frameTimeRef.current.length;
    const fps = 1 / avgFrameTime;
    
    // Adjust performance level based on FPS - mais agressivo
    if (fps >= 55) { // Aumentado de 50
      setPerformanceLevel('high');
    } else if (fps >= 40) { // Aumentado de 30
      setPerformanceLevel('medium');
    } else {
      setPerformanceLevel('low');
    }
  });

  return performanceLevel;
}

// Responsive 3D hook
export function useResponsive3D() {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
        setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      } else if (width < 1024) {
        setDeviceType('tablet');
        setPixelRatio(Math.min(window.devicePixelRatio, 2));
      } else {
        setDeviceType('desktop');
        setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return { deviceType, pixelRatio };
}

// Adaptive quality settings
export function getQualitySettings(performanceLevel: 'high' | 'medium' | 'low', deviceType: 'desktop' | 'tablet' | 'mobile') {
  const baseSettings = {
    high: {
      particles: 300, // Reduzido drasticamente de 1000
      shadowMapSize: 1024, // Reduzido de 2048
      antialias: false, // Desabilitado para melhor performance
      postProcessing: false, // Desabilitado temporariamente
      animationSpeed: 0.8, // Reduzido para menos cálculos
    },
    medium: {
      particles: 150, // Reduzido de 500
      shadowMapSize: 512, // Reduzido de 1024
      antialias: false,
      postProcessing: false,
      animationSpeed: 0.6,
    },
    low: {
      particles: 50, // Reduzido drasticamente de 250
      shadowMapSize: 256, // Reduzido de 512
      antialias: false,
      postProcessing: false,
      animationSpeed: 0.4,
    },
  };

  const deviceModifiers = {
    mobile: {
      particles: 0.3, // Ainda mais agressivo para mobile
      shadowMapSize: 0.25,
      postProcessing: false,
    },
    tablet: {
      particles: 0.5, // Reduzido de 0.7
      shadowMapSize: 0.5, // Reduzido de 0.7
      postProcessing: false,
    },
    desktop: {
      particles: 1,
      shadowMapSize: 1,
      postProcessing: false, // Desabilitado temporariamente
    },
  };

  const settings = { ...baseSettings[performanceLevel] };
  const modifier = deviceModifiers[deviceType];

  settings.particles = Math.floor(settings.particles * modifier.particles);
  settings.shadowMapSize = Math.floor(settings.shadowMapSize * modifier.shadowMapSize);
  settings.postProcessing = settings.postProcessing && modifier.postProcessing;

  return settings;
}