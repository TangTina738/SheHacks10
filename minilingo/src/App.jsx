import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Nav from "./Nav.jsx";
import Home from "./Home.jsx";
import Lesson1 from "./lesson1.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson1" element={<Lesson1 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
