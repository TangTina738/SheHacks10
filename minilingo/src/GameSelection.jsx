import { useNavigate } from "react-router-dom";
import "./Style/GameSelection.css";

export default function GameSelection() {
  const navigate = useNavigate();

  const startGame = (topic) => {
    navigate("/lesson1", { state: { topic } });
  };

  return (
    <main className="selection-screen">
      <h1 className="selection-title">Select Game to Play!</h1>
      
      <div className="floating-container">
        {/* Each button gets a unique class for staggered positioning */}
        <button className="circle-btn left" onClick={() => startGame("animals")}>🦁</button>
        <button className="circle-btn right" onClick={() => startGame("food")}>🍎</button>
        <button className="circle-btn bottom" onClick={() => startGame("colors")}>🎨</button>
      </div>

      <div className="landscape">
        <div className="hill-light"></div>
        <div className="hill-dark"></div>
      </div>
    </main>
  );
}