import './App.css';
import React from 'react';
import TopVehicle from './components/TopVehicle/TopVehicle';
import PopulationChart from './components/PopulationChart/PopulationChart';
import Intro from './components/Intro/Intro';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Intro />
      <TopVehicle />
      <PopulationChart />
      <Footer />
    </div>
  );
}

export default App;