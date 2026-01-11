import { useNavigate } from "react-router-dom";
import "./Style/GameSelection.css";
import hillLight from "./assets/hillLight.png";
import cloud1 from "./assets/cloud1.png";
import cloud2 from "./assets/cloud2.png";
import cloud3 from "./assets/cloud3.png";
import cloud4 from "./assets/cloud4.png";
import Tree1 from "./assets/Tree1.png";
import Tree2 from "./assets/Tree2.png";
import Tree4 from "./assets/Tree4.png";
import Tree3 from "./assets/Tree3.png";

export default function GameSelection() {
  const navigate = useNavigate();

  const startGame = (topic) => {
    navigate("/lesson1", { state: { topic } });
  };

  return (
    <main className="selection-screen">

       <div style={{ position: "absolute", top: "20px", left: "50px", zIndex: 20 }}>

  {/* BACK animation: Tina... kinda finicky*/}
  <div className="back-btn-container">
    <img
      src={Tree3}
      alt="Back to Home"
      className="tree-back-img" 
      onClick={() => navigate("/")}
      style={{ 
        width: "70px", 
        height: "70px", 
        cursor: "pointer" 
      }}
    />
  </div>
</div>
      <h1 className="selection-title">Select Game to Play!</h1>
      
      <div className="floating-container">

        {/* Game option buttons, ++ add more in future maybe? Curr, animals, food, colour */}
        <button className="circle-btn left" onClick={() => startGame("animals")}>🦁</button>
        <button className="circle-btn right" onClick={() => startGame("food")}>🍎</button>
        <button className="circle-btn bottom" onClick={() => startGame("colors")}>🎨</button>
      </div>

      <div className="hill-wrap">
        <img src={hillLight} alt="" className="hill-img" />
        <img src={Tree1} alt="" className="tree-img" />
        <img src={Tree2} alt="" className="tree-img-2" />
        <img src={Tree4} alt="" className="tree-img-4" />

      </div>

        <div className="cloud-container">
           {/* Cloud 2: span 1-2 */}
          <img src={cloud2} alt="" className="cloud cloud-pos-2" />

          {/* Cloud 1: spans columns 2-4 */}
          <img src={cloud1} alt="" className="cloud cloud-pos-1" />

          {/* Cloud 4: spans columns 6-7 */}
          <img src={cloud4} alt="" className="cloud cloud-pos-4" />

          {/* Cloud 3: spans columns 11-12 */}
          <img src={cloud3} alt="" className="cloud cloud-pos-3" />
        </div>

      <section className="fill">
      
      </section>
      
      
    </main>
  );
}