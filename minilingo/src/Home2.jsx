import "./Style/Home.css";

import hillLight from "./assets/hillLight.png";
import hillDark from "./assets/hillDark.png";



function Home2() {
  return (
   <main className="home">
  {/* FULL-BLEED background layers */}
  <img className="bg bg-hill-light" src={hillLight} alt="" />
  <img className="bg bg-hill-dark" src={hillDark} alt="" />
</main>

  );
}

export default Home2;
