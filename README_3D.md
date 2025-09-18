# 🎮 Portfólio 3D Gamificado - Marcelo Pitz

Um portfólio interativo e imersivo construído com **Three.js**, **React** e **TypeScript**, oferecendo uma experiência 3D gamificada única para apresentar habilidades, projetos e informações profissionais.

## ✨ Características Principais

### 🎯 Sistema Gamificado
- **Sistema de Achievements**: Conquistas desbloqueáveis baseadas em interações
- **Contador de Interações**: Rastreamento de engajamento do usuário
- **Progress Tracking**: Barra de progresso visual para completar todas as conquistas
- **Notificações Animadas**: Alertas visuais quando conquistas são desbloqueadas

### 🌐 Navegação 3D Imersiva
- **Portais Interativos**: Navegação entre seções através de objetos 3D flutuantes
- **Transições Suaves**: Animações de câmera com GSAP para mudanças de seção
- **Controles Orbitais**: Rotação, zoom e pan da câmera com Three.js
- **Auto-rotação**: Rotação automática na seção home para demonstração

### 🎨 Efeitos Visuais Avançados
- **Shaders Customizados**: Materiais holográficos e efeitos de portal
- **Post-Processing**: Bloom, chromatic aberration e vinheta
- **Sistema de Partículas**: Background animado com 1000+ partículas responsivas
- **Iluminação Dinâmica**: Luzes direcionais, pontuais e ambiente

### 🚀 Performance e Responsividade
- **Level of Detail (LOD)**: Otimização baseada na distância da câmera
- **Performance Monitoring**: Ajuste automático de qualidade baseado no FPS
- **Responsive Design**: Adaptação para desktop, tablet e mobile
- **Adaptive DPR**: Ajuste automático da densidade de pixels

## 🛠️ Tecnologias Utilizadas

### Core
- **React 19.1.1** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **Three.js 0.180.0** - Engine 3D

### 3D & Graphics
- **@react-three/fiber** - React renderer para Three.js
- **@react-three/drei** - Componentes e helpers úteis
- **@react-three/postprocessing** - Efeitos de pós-processamento
- **GSAP** - Animações suaves e transições

### Development
- **ESLint** - Linting de código
- **CSS Modules** - Estilos modulares
- **PNPM** - Gerenciador de pacotes

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Scene3D/                 # Componente principal da cena 3D
│   │   ├── LoadingScreen/       # Tela de carregamento animada
│   │   ├── SceneContent/        # Conteúdo principal da cena
│   │   │   ├── NavigationPortals/    # Portais de navegação 3D
│   │   │   ├── ParticleSystem3D/     # Sistema de partículas
│   │   │   ├── SkillsGalaxy/         # Representação 3D das habilidades
│   │   │   ├── ProjectsShowcase/     # Vitrine de projetos
│   │   │   └── ContactSphere/        # Esfera de contato interativa
│   │   └── UIOverlay/           # Interface sobreposta
│   │       ├── AchievementNotification/  # Notificações de conquistas
│   │       ├── NavigationMenu/           # Menu de navegação
│   │       └── ProgressIndicator/        # Indicador de progresso
│   ├── PostProcessing/          # Efeitos de pós-processamento
│   └── CameraController/        # Controle avançado de câmera
├── context/
│   └── SceneContext.tsx         # Estado global da aplicação
├── types/
│   └── index.ts                 # Definições de tipos TypeScript
├── shaders/
│   └── index.ts                 # Shaders customizados
├── utils/
│   └── performance.tsx          # Utilitários de performance
└── App.tsx                      # Componente raiz
```

## 🎮 Sistema de Conquistas

### Conquistas Disponíveis:
1. **🎯 First Steps** - Clique no primeiro objeto 3D
2. **🗺️ Explorer** - Visite todas as seções do portfólio
3. **🔍 Curious Mind** - Interaja com 10 objetos diferentes
4. **⏰ Dedicated Visitor** - Explore por 2 minutos

### Mecânicas Gamificadas:
- Contador de interações em tempo real
- Sistema de progresso visual
- Notificações animadas para novas conquistas
- Persistência de estado durante a sessão

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- PNPM (recomendado) ou npm/yarn

### Instalação e Execução
```bash
# Clone o repositório
git clone https://github.com/marcelo-pitz/marcelo-pitz.github.io.git

# Entre na pasta do projeto
cd marcelo-pitz.github.io

# Instale as dependências
pnpm install

# Execute em modo de desenvolvimento
pnpm run dev

# Build para produção
pnpm run build

# Deploy para GitHub Pages
pnpm run deploy
```

## 📱 Compatibilidade

### Dispositivos Suportados:
- **Desktop**: Experiência completa com todos os efeitos
- **Tablet**: Qualidade média com otimizações
- **Mobile**: Qualidade adaptada para performance

### Navegadores Suportados:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Customização

### Ajustando Qualidade:
```typescript
// src/utils/performance.tsx
const qualitySettings = getQualitySettings(performanceLevel, deviceType);

// Modificar número de partículas
settings.particles = 500; // Padrão: 1000

// Ajustar qualidade de sombras
settings.shadowMapSize = 1024; // Padrão: 2048
```

### Personalizando Conquistas:
```typescript
// src/context/SceneContext.tsx
const achievements = [
  {
    id: 'nova-conquista',
    title: 'Título da Conquista',
    description: 'Descrição detalhada',
    icon: '🏆',
    requirement: { type: 'interaction', value: 5 }
  }
];
```

## 🔧 Otimizações Implementadas

### Performance:
- **Frustum Culling**: Objetos fora da vista não são renderizados
- **Adaptive Quality**: Ajuste automático baseado no FPS
- **LOD System**: Diferentes níveis de detalhe por distância
- **Efficient Particles**: Sistema otimizado para diferentes dispositivos

### Memory Management:
- **Geometry Pooling**: Reutilização de geometrias
- **Texture Optimization**: Compressão automática de texturas
- **Cleanup on Unmount**: Limpeza adequada de recursos

## 📊 Métricas de Performance

- **FPS Target**: 60fps em desktop, 30fps em mobile
- **Memory Usage**: < 100MB para experiência completa
- **Load Time**: < 3 segundos para assets principais
- **Bundle Size**: ~2MB gzipped

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Marcelo Pitz**
- Portfolio: [marcelo-pitz.github.io](https://marcelo-pitz.github.io)
- LinkedIn: [linkedin.com/in/marcelo-pitz](https://linkedin.com/in/marcelo-pitz)
- GitHub: [@marcelo-pitz](https://github.com/marcelo-pitz)

---

⭐ Se você gostou deste projeto, não esqueça de dar uma estrela!

🎮 **Explore, Interaja, Conquiste!**