import "./Style/Nav.css";
import { NavLink } from "react-router-dom";


function Nav() {
  return (
    <header className="site-header">
      <div className="container">
        <div className="row align-items-start">

          {/* LEFT: Name + role */}
          <div className="col-auto d-flex align-items-baseline">
            <h2 className="header-name m-0">MiniLingo</h2>
            <span className="header-designer ms-3">Learn!</span>
          </div>

          {/* RIGHT: Nav */}
          <div className="col d-flex justify-content-end align-items-start">
             <NavLink
                to="/"
                className="nav-link-custom me-4"
              >
                ABOUT
              </NavLink>
              <NavLink
                  to="/"
                  className="btn-homepage"
                >
                  HOMEPAGE
                </NavLink>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Nav;
