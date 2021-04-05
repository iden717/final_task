import { Nav } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import phone1 from "../../image/template/phone1.png";
import phone2 from "../../image/template/phone2.png";
import phone3 from "../../image/template/phone3.png";
import phone4 from "../../image/template/phone4.png";
const Template = () => {
  const route = useHistory();
  return (
    <div>
      <div className="row bg-light p-3 header">
        <div className="col-md-12 container-fuild ml-3">
          <h3 className="text center">Template</h3>
        </div>
      </div>
      <div className="bg-dashboard pt-3">
        <div className="row p-5 bg-dashboard">
          <div className="col mb-5">
            <Nav.Link as={Link} to="/add/template">
              <img src={phone3} />
            </Nav.Link>
          </div>
          <div className="col mb-5">
            <Nav.Link as={Link} to="/add/">
              <img src={phone1} />
            </Nav.Link>
          </div>
          <div className="col mb-5">
            <Nav.Link as={Link} to="/add/">
              <img src={phone2} />
            </Nav.Link>
          </div>
          <div className="col mb-5">
            <Nav.Link as={Link} to="/add/">
              <img src={phone4} />
            </Nav.Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
