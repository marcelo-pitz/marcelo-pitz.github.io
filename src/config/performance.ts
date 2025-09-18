// Configurações de performance para facilitar ajustes rápidos

export const PERFORMANCE_CONFIG = {
  // Partículas
  PARTICLES: {
    HIGH: 150,
    MEDIUM: 75,
    LOW: 25,
    MOBILE_MULTIPLIER: 0.3,
    TABLET_MULTIPLIER: 0.5,
  },
  
  // FPS thresholds
  FPS: {
    HIGH_THRESHOLD: 55,
    MEDIUM_THRESHOLD: 40,
    TARGET_FPS: 60,
  },
  
  // Rendering
  RENDERING: {
    DPR_MIN: 0.5,
    DPR_MAX: 1.5,
    SHADOW_MAP_SIZE: 512,
    ANTIALIAS: false,
    ALPHA: false,
  },
  
  // Animações
  ANIMATIONS: {
    FRAME_SKIP: 2, // Atualizar a cada N frames
    ROTATION_SPEED: 0.3,
    FLOAT_DISABLED: true,
  },
  
  // LOD
  LOD: {
    DISTANCES: [0, 15, 30],
    MAX_RENDER_DISTANCE: 50,
  },
  
  // Post-processing
  POST_PROCESSING: {
    ENABLED: false, // Desabilitado para melhor performance
    BLOOM_INTENSITY: 0.1,
    BLOOM_THRESHOLD: 0.9,
  }
};

// Função para aplicar configurações baseadas no dispositivo
export function getOptimizedConfig(deviceType: 'desktop' | 'tablet' | 'mobile') {
  const config = { ...PERFORMANCE_CONFIG };
  
  switch (deviceType) {
    case 'mobile':
      config.PARTICLES.HIGH = Math.floor(config.PARTICLES.HIGH * 0.3);
      config.PARTICLES.MEDIUM = Math.floor(config.PARTICLES.MEDIUM * 0.3);
      config.PARTICLES.LOW = Math.floor(config.PARTICLES.LOW * 0.3);
      config.RENDERING.DPR_MAX = 1;
      config.ANIMATIONS.FRAME_SKIP = 3;
      break;
      
    case 'tablet':
      config.PARTICLES.HIGH = Math.floor(config.PARTICLES.HIGH * 0.6);
      config.PARTICLES.MEDIUM = Math.floor(config.PARTICLES.MEDIUM * 0.6);
      config.PARTICLES.LOW = Math.floor(config.PARTICLES.LOW * 0.6);
      config.RENDERING.DPR_MAX = 1.2;
      config.ANIMATIONS.FRAME_SKIP = 2;
      break;
      
    default: // desktop
      // Manter configurações padrão
      break;
  }
  
  return config;
}