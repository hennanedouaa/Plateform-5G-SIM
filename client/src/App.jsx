import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { SideBar } from './Component/sidebar';
import TopologyConfig from './pages/TopologyConfig';
import SimulationConfig from './pages/SimulationConfig';
import RunSimulation from './pages/RunSimulation';
import Results from './pages/Results';
import LandingPage from './pages/landing';

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
<div className={`font-lora ${isLandingPage ? 'width-full' : 'flex flex-row'} w-full h-screen overflow-hidden`}>      {!isLandingPage && <SideBar />}
      <div className={`${isLandingPage ? 'w-full h-full' : 'flex-1'} overflow-y-auto`}>
        <Routes>
          <Route path="/TopologyConfig" element={<TopologyConfig />} />
          <Route path="/SimulationConfig" element={<SimulationConfig />} />
          <Route path="/RunSimulation" element={<RunSimulation />} />
          <Route path="/Results" element={<Results />} />
          <Route path="/" element={<LandingPage />} />
          {/* other routes */}
        </Routes>
      </div>
    </div>
  );
}

export default App;