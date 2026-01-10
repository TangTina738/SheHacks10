import "./Style/Home.css";

import sunButton from "./assets/sunButton.png";
import hillLight from "./assets/hillLight.png";
import hillDark from "./assets/hillDark.png";

import cloud1 from "./assets/cloud1.png";
import cloud2 from "./assets/cloud2.png";
import cloud3 from "./assets/cloud3.png";

function Home() {
  return (
    <main className="home">
  {/* Full-bleed scene */}
  <div className="scene container-fluid p-0">
    {/* Clouds background layer */}
        <div className="cloud-layer" aria-hidden="true">
          {/* top-left cluster */}
          <img src={cloud1} alt="" className="cloud cloud--a" />
          <img src={cloud2} alt="" className="cloud cloud--b" />

          {/* top-right */}
          <img src={cloud3} alt="" className="cloud cloud--c" />

          {/* mid clouds (extra for prettiness) */}
          <img src={cloud2} alt="" className="cloud cloud--d" />
          <img src={cloud1} alt="" className="cloud cloud--e" />
        </div>
   <div className="container hero-wrap">
  <div className="row min-vh-75 align-items-start">
    <div className="col-12 col-md-8 col-lg-6 mx-auto hero-col">
      <section className="hero-content">
        <h1 className="hero-title">MINILINGO</h1>

        <p className="hero-subtitle">
          Learn French & English through play.
        </p>

        <div className="sun-wrap mt-3">
          <img src={sunButton} alt="Start" className="sun-img" />
        </div>
        
        <div className="info-marquee" aria-label="About Minilingo">
  <div className="info-track">
    {/* Set 1 */}
    <article className="info-card">
      <h3 className="info-title">WHAT</h3>
      <p className="info-text">
        Match French ↔ English words in fun multiple-choice questions (made by Gemini!).
      </p>
    </article>

    <article className="info-card">
      <h3 className="info-title">KID MODE</h3>
      <p className="info-text">
        Be a word explorer! Pick the right translation from silly choices.
      </p>
    </article>

    <article className="info-card">
      <h3 className="info-title">WHY</h3>
      <p className="info-text">
        Learning feels like a game—practice, get instant feedback, and grow confident!
      </p>
    </article>

    {/* Set 2 (duplicate for smooth loop) */}
    <article className="info-card" aria-hidden="true">
      <h3 className="info-title">WHAT</h3>
      <p className="info-text">
        Match French ↔ English words in fun multiple-choice questions (made by Gemini!).
      </p>
    </article>

    <article className="info-card" aria-hidden="true">
      <h3 className="info-title">KID MODE</h3>
      <p className="info-text">
        Be a word explorer! Pick the right translation from silly choices.
      </p>
    </article>

    <article className="info-card" aria-hidden="true">
      <h3 className="info-title">WHY</h3>
      <p className="info-text">
        Learning feels like a game—practice, get instant feedback, and grow confident!
      </p>
    </article>
  </div>
</div>
      </section>
    </div>
  </div>
</div>



    {/* Hill full width */}
    <div className="hill-wrap" aria-hidden="true">
    <img src={hillDark} alt="" className="hill-img hill-img--dark" />
    <img src={hillLight} alt="" className="hill-img hill-img--light" />
</div>
  </div>
</main>

  );
}

export default Home;
