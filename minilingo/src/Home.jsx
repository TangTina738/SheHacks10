import "./Style/Home.css";

import sunButton from "./assets/sunButton.png";
import cloud1 from "./assets/cloud1.png";
import cloud2 from "./assets/cloud2.png";
import cloud3 from "./assets/cloud3.png";

function Home() {
  return (
    <main className="home">
      <img className="cloud cloud-left" src={cloud1} alt="" />
      <img className="cloud cloud-top" src={cloud2} alt="" />
      <img className="cloud cloud-right" src={cloud3} alt="" />

      <div className="container hero-wrap">
        <div className="row min-vh-75 flex-column justify-content-between">
          {/* TEXT CONTENT */}
          <div className="col">
            <section className="hero-content">
              <h1 className="hero-title">MINILINGO</h1>
              <p className="hero-text">
                Assist <br />
                abcdefghijklmnop0osadjasdddd <br />
                ddddddddddddddddddddddddd
              </p>
            </section>
          </div>

          {/* SUN IMAGE BUTTON */}
          <div className="col-auto d-flex justify-content-center pb-5">
              <img src={sunButton} alt="Start" className="sun-img" />
         
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
