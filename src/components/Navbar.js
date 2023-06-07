import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <>
      <nav>
        <Link className="OMDB">OMDB</Link>
        <div>
          <Link to="/" className="links">
            HOME
          </Link>
          {!localStorage.getItem("token") ? (
            <>
              <Link to="/login" className="links">
                LOGIN
              </Link>
              <Link to="/signup" className="links">
                SIGN UP
              </Link>
            </>
          ) : (
            <Link to="/" className="links" onClick={logout}>
              LOGOUT
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
