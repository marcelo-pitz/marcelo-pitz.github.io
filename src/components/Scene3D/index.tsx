import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
  Stats,
  AdaptiveDpr,
  AdaptiveEvents
} from '@react-three/drei';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingScreen } from './LoadingScreen';
import { SceneContent } from './SceneContent';
import { UIOverlay } from './UIOverlay';
// import { PostProcessingEffects } from '../PostProcessing'; // Temporariamente desabilitado
import { CameraController } from '../CameraController';
import { useScene } from '../../context/SceneContext';
import styles from './styles.module.css';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className={styles.errorContainer}>
      <h2>Oops! Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  );
}

export function Scene3D() {
  const { state } = useScene();

  return (
    <div className={styles.container}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas
          className={styles.canvas}
          gl={{
            antialias: false, // Desabilitar antialiasing para melhor performance
            alpha: false, // Desabilitar transparência
            powerPreference: 'high-performance',
            stencil: false, // Desabilitar stencil buffer
            depth: true,
          }}
          dpr={[0.5, 1.5]} // Reduzir DPR para melhor performance
          performance={{ min: 0.1, max: 1, debounce: 200 }} // Performance mais agressiva
          frameloop="demand" // Renderizar apenas quando necessário
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          
          <PerspectiveCamera
            makeDefault
            position={[0, 5, 10]}
            fov={75}
            near={0.1}
            far={1000}
          />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            autoRotate={state.currentSection === 'home'}
            autoRotateSpeed={0.5}
          />
          
          <Environment preset="dawn" background={false} /> {/* Preset mais leve */}
          
          {/* Fog mais agressivo para melhor culling */}
          <fog attach="fog" args={['#1a1a2e', 20, 100]} />
          
          <CameraController />
          
          <Suspense fallback={<LoadingScreen />}>
            <SceneContent />
          </Suspense>
          
          {/* PostProcessing temporariamente desabilitado para melhor performance */}
          {/* <PostProcessingEffects /> */}
          
          <Stats />
        </Canvas>
        
        <UIOverlay />
      </ErrorBoundary>
    </div>
  );
}