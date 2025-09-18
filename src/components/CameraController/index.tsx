import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScene } from '../../context/SceneContext';
import { gsap } from 'gsap';
import type { SceneState } from '../../types';

const cameraPositions: Record<SceneState['currentSection'], readonly [number, number, number]> = {
  home: [0, 5, 10],
  about: [-8, 3, 8],
  skills: [8, 6, 8],
  projects: [0, 8, 12],
  contact: [0, 2, 15],
} as const;

const cameraTargets: Record<SceneState['currentSection'], readonly [number, number, number]> = {
  home: [0, 0, 0],
  about: [-5, 1, 0],
  skills: [0, 2, 0],
  projects: [0, 1, -2],
  contact: [0, 0, 5],
} as const;

export function CameraController() {
  const { state } = useScene();
  const { camera } = useThree();
  const targetRef = useRef([0, 0, 0]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (isTransitioning.current) return;

    const currentSection = state.currentSection;
    const targetPosition = cameraPositions[currentSection];
    const targetLookAt = cameraTargets[currentSection];

    if (targetPosition && targetLookAt) {
      isTransitioning.current = true;

      // Animate camera position
      gsap.to(camera.position, {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
        duration: 2,
        ease: "power2.inOut",
      });

      // Animate camera target
      gsap.to(targetRef.current, {
        0: targetLookAt[0],
        1: targetLookAt[1],
        2: targetLookAt[2],
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          isTransitioning.current = false;
        },
      });
    }
  }, [state.currentSection, camera]);

  useFrame(() => {
    // Smooth camera look-at animation
    camera.lookAt(targetRef.current[0], targetRef.current[1], targetRef.current[2]);
    camera.updateProjectionMatrix();
  });

  return null;
}