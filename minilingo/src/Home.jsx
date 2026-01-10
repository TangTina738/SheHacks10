import "./Style/Home.css";
import { Link } from "react-router-dom";


import sunButton from "./assets/sunButton.png";
import hillLight from "./assets/hillLight.png";


import cloud1 from "./assets/cloud1.png";
import cloud2 from "./assets/cloud2.png";
import cloud3 from "./assets/cloud3.png";

function Home() {
  return (
    <main className="home">
  {/* Full-bleed scene */}
  <div className="scene container-fluid p-0">


   <div className="container hero-wrap">
  <div className="row min-vh-75 align-items-start">
    <div className="col-md-5 offset-md-4 hero-col">
      <section className="hero-content">
        <h1 className="hero-title">MINILINGO</h1>

        <p className="hero-text">
          Assist <br />
          abcdefghijklmnop0osadjasdddd <br />
          ddddddddddddddddddddddddd
        </p>

        <div className="sun-wrap mt-3">
            <Link to="/lesson1">
                <img src={sunButton} alt="Start Lesson 1" className="sun-img" />
            </Link>
            </div>

      </section>
    </div>
  </div>
</div>


    {/* Hill full width */}
    <div className="hill-wrap">
      <img src={hillLight} alt="" className="hill-img" />
    </div>
  </div>
</main>

  );
}

export default Home;
