import { Nav, Navbar } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubes,
  faUserCircle,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

import logo from "../../image/logo.png";

const HeaderUser = () => {
  const params = useParams();
  const { id } = params;
  console.log("param", params);
  return (
    <Navbar expand="lg" className="flex-column">
      <Navbar.Brand className="mb-5">
        <img src={logo} style={{ width: "120px" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          defaultActiveKey="/template"
          className="flex-column font-header"
          style={{ width: "100%" }}
        >
          <Nav.Item className="mb-4">
            <Nav.Link as={Link} to="/template" eventKey="/template">
              <FontAwesomeIcon icon={faCubes} className="mr-4" />
              Template
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="mb-4">
            <Nav.Link as={Link} to="/profile" eventKey="/profile">
              <FontAwesomeIcon icon={faUserCircle} className="mr-4" />
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="mb-4">
            <Nav.Link as={Link} to="/short-list" eventKey="/my-link">
              <FontAwesomeIcon icon={faLink} className="mr-4" />
              My Link
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderUser;
