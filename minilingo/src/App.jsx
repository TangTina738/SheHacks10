import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Nav.jsx"; // This matches your <Nav /> usage
import Home from "./Home.jsx";
import GameSelection from "./GameSelection.jsx";
import Lesson1 from "./lesson1.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav /> {/* This will now work once the export in Nav.jsx is fixed below */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-game" element={<GameSelection />} />
        <Route path="/lesson1" element={<Lesson1 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;