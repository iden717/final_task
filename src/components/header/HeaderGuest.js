import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../../image/logo.png";

import Login from "../../components/modal/Login";
import Register from "../../components/modal/Register";

const HeaderGuest = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShow = (data) => {
    if (data === "login") {
      setShowLogin(true);
      setShowRegister(false);
    } else {
      setShowRegister(true);
      setShowLogin(false);
    }
  };

  const handleClose = (data) => {
    data === "login" ? setShowLogin(false) : setShowRegister(false);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="mt-2 mb-2">
        <Nav className="mr-auto padding-header-l">
          <img src={logo} />
        </Nav>
        <div className="mr-4">
          <button
            onClick={() => handleShow("login")}
            className="btn btn-light font-weight-bold"
            style={{ width: "100px" }}
          >
            Login
          </button>
        </div>
        <div className="padding-header-r">
          <button
            onClick={() => handleShow("register")}
            className="btn btn-app font-weight-bold"
            style={{ width: "100px" }}
          >
            Register
          </button>
        </div>
        <Login
          setShow={showLogin}
          setHandleShow={() => handleShow("register")}
          setHandleClose={() => handleClose("login")}
        />
        <Register
          setShow={showRegister}
          setHandleShow={() => handleShow("login")}
          setHandleClose={() => handleClose("register")}
        />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderGuest;
