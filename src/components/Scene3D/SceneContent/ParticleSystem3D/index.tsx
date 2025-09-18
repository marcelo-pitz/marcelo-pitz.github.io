import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { usePerformanceMonitor, useResponsive3D, getQualitySettings } from '../../../../utils/performance';
import type { Points as ThreePoints } from 'three';

export function ParticleSystem3D() {
  const pointsRef = useRef<ThreePoints>(null);
  const performanceLevel = usePerformanceMonitor();
  const { deviceType } = useResponsive3D();
  const qualitySettings = getQualitySettings(performanceLevel, deviceType);
  
  const particleCount = qualitySettings.particles;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere - otimizado
      const radius = Math.random() * 30 + 15; // Reduzido de 50+10
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);
      
      // Cores pré-calculadas para evitar cálculos em runtime
      const colorVariation = Math.random();
      colors[i3] = 0.4 + colorVariation * 0.4; // R
      colors[i3 + 1] = 0.4 + colorVariation * 0.6; // G
      colors[i3 + 2] = 0.8 + colorVariation * 0.2; // B
    }
    
    return { positions, colors };
  }, [particleCount]);

  // Otimizar animações - menos cálculos por frame
  const frameCount = useRef(0);
  
  useFrame((state) => {
    if (pointsRef.current) {
      frameCount.current++;
      
      // Reduzir frequência de atualizações
      if (frameCount.current % 2 === 0) { // Atualizar apenas a cada 2 frames
        const speed = qualitySettings.animationSpeed * 0.5; // Ainda mais lento
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 * speed; // Reduzido de 0.1
        pointsRef.current.rotation.x = state.clock.elapsedTime * 0.025 * speed; // Reduzido de 0.05
      }
      
      // Remover animação individual de partículas - muito custosa
      // Apenas rotação básica do grupo
    }
  });

  return (
    <Points ref={pointsRef} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        size={deviceType === 'mobile' ? 0.03 : 0.06} // Reduzido ainda mais
        vertexColors
        transparent={false} // Desabilitar transparência
        opacity={1} // Opacidade total
        sizeAttenuation={false} // Desabilitar atenuação por distância
        alphaTest={0} // Remover alpha test
      />
    </Points>
  );
}