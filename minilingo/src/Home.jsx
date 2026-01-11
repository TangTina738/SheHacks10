import React, { useState } from "react"; // Added useState import
import "./Style/Home.css";
import { Link } from "react-router-dom";
import treeButton from "./assets/treeButton.png";

// Asset imports
import sunButton from "./assets/sunButton.png";
import hillLight from "./assets/hillLight.png";
import cloud1 from "./assets/cloud1.png";
import cloud2 from "./assets/cloud2.png";
import cloud3 from "./assets/cloud3.png";
import cloud4 from "./assets/cloud4.png";

import card1 from "./assets/card1.png";
import card2 from "./assets/card2.png";
import card3 from "./assets/card3.png";
import card4 from "./assets/card4.png";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const cards = [
    { img: card1},
    { img: card2},
    { img: card3 },
    { img: card4},
  ];

// Triple the array to ensure there is always a buffer for seamless looping
const loopCards = [...cards, ...cards, ...cards]; 

const nextCard = () => {
  setCurrentIndex((prev) => {
    // If we reach the end of the original set, loop back to the start
    if (prev >= cards.length - 1) {
      return 0;
    }
    return prev + 1;
  });
};

  return (
    <main className="home">
      <div className="scene container-fluid p-0">
        <div className="cloud-container">
          <img src={cloud2} alt="" className="cloud cloud-pos-2" />
          <img src={cloud1} alt="" className="cloud cloud-pos-1" />
          <img src={cloud4} alt="" className="cloud cloud-pos-4" />
          <img src={cloud3} alt="" className="cloud cloud-pos-3" />
        </div>

        <div className="container hero-wrap">
          <div className="row">
            <div className="col-md-5 offset-md-4 hero-col">
              <section className="hero-content">
                <h1 className="hero-title">MINILINGO</h1>
                <p className="hero-text">
                  Assist <br />
                  Ready to learn some French? <br />
                  Click the sun to begin!
                </p>
              </section>
            </div>
          </div>

          <div className="row">
            <div className="col-2 offset-5">
              <div className="sun-wrap mt-3">
                <Link to="/select-game">
                  <img src={sunButton} alt="Go to selection screen" className="sun-img" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hill-wrap">
          <img src={hillLight} alt="" className="hill-img" />
        </div>
      </div>

      <section className="about-section">
        <div className="container overflow-hidden"> 
          <div 
            className="card-slider-track" 
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }} 
          >
            {loopCards.map((card, index) => (
              <div className="slider-item" key={index}>
                <img src={card.img} alt="" className="card-slider-img" />
              </div>
            ))}
          </div>

          {/* 2. Replace button row: span columns 6-7 using col-2 and offset-5 */}
          <div className="row mt-5">
            <div className="col-2 offset-5">
              <button className="btn-tree-slider" onClick={nextCard}>
                <img src={treeButton} alt="Next" className="tree-btn-img" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;