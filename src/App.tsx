import "./App.css";
import { SceneProvider } from "./context/SceneContext";
import { Scene3D } from "./components/Scene3D";

function App() {
  return (
    <SceneProvider>
      <Scene3D />
    </SceneProvider>
  );
}

export default App;
