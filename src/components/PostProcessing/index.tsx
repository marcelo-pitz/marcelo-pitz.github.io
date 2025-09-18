import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import type { EffectComposer as EffectComposerType } from 'postprocessing';

export function PostProcessingEffects() {
  const composerRef = useRef<EffectComposerType>(null);

  useFrame(() => {
    if (composerRef.current) {
      // Could add dynamic effect adjustments here
      // For example, changing bloom intensity based on interactions
    }
  });

  return (
    <EffectComposer ref={composerRef} multisampling={8}>
      <Bloom
        blendFunction={BlendFunction.ADD}
        intensity={0.3}
        width={300}
        height={300}
        kernelSize={5}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.025}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0005, 0.0012]}
      />
      <Vignette
        offset={0.1}
        darkness={0.3}
        blendFunction={BlendFunction.MULTIPLY}
      />
    </EffectComposer>
  );
}