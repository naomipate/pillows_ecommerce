import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import DisplayAll from "./components/Pillows/DisplayAll/DisplayAll";
import DisplayOne from "./components/Pillows/DisplayOne/DisplayOne";
import Create from "./components/Pillows/Create/Create";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pillows" element={<DisplayAll />} />
          <Route path="/pillows/:id" element={<DisplayOne />} />
          <Route path="/pillows/create" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
