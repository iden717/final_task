import { faCubes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Route, Redirect, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import HeaderUser from "../header/HeaderUser";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);
  console.log("ini private", state?.isLogin);
  return (
    <Route
      {...rest}
      render={(props) =>
        state?.isLogin ? (
          <div className="container-fluid bg-dashboard">
            <div className="row main">
              <div className="col-md-2 bg-light">
                <HeaderUser />
              </div>
              <div className="col-md-10 bg-dashboard">
                <Component {...props} />
              </div>
            </div>
            <div className="row footer mb-4">
              <div className="col-md-2 bg-light">
                <Navbar expand="lg" className="flex-column">
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                      className="flex-column font-header"
                      style={{ width: "100%" }}
                    >
                      <Nav.Item className="mb-4">
                        <Nav.Link as={Link} to="/template">
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="mr-4"
                          />
                          Logout
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </div>
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
