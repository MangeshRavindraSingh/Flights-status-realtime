import { Routes, Route } from "react-router-dom";
import './App.css'
import FlightList from './compoonents/FlightList/FlightList';
import FlightDetails from './compoonents/FlightDetails/FlightDetails';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<FlightList />}/>
        <Route path="/details/:id" element={<FlightDetails />} />
      </Routes>
    </>
  )
}

export default App
