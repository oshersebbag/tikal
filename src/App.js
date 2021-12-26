import './App.css';
import React from 'react';
import TopVehicle from './components/TopVehicle/TopVehicle';
import PopulationChart from './components/PopulationChart/PopulationChart';
import Intro from './components/Intro/Intro';

function App() {
  return (
    <div className="App">
      <Intro />
      <TopVehicle />
      <PopulationChart />

    </div>
  );
}

export default App;
