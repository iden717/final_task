import { Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { useHistory } from "react-router";

import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/userContext";

const Register = ({ setShow, setHandleClose, setHandleShow }) => {
  const [form, setForm] = useState();
  const route = useHistory();

  const SetLogin = async (e) => {
    const [state, dispatch] = useContext(UserContext);
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response?.data?.data?.user,
      });

      setAuthToken(response?.data?.data?.user?.token);
      route.push("/template");
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal
      show={setShow}
      onHide={setHandleClose}
      dialogClassName="modal-wd"
      centered
    >
      <Modal.Body>
        <div className="container">
          <form onSubmit={(e) => SetLogin()}>
            <div className="row mt-4">
              <div className="col">
                <form>
                  <h2>
                    <strong>Register</strong>
                  </h2>
                  <div className="mb-3 mt-4">
                    <input
                      type="text"
                      name="fullname"
                      onChange={(e) => onChange(e)}
                      className="form-control input-app form-control-lg"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => onChange(e)}
                      className="form-control input-app form-control-lg"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => onChange(e)}
                      className="form-control input-app form-control-lg"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-app btn-lg">Register</button>
                  </div>
                  <div className="mb-3">
                    <p
                      className="mt-2 text-center"
                      style={{ color: "#B1B1B1" }}
                    >
                      Already have an account ? click{" "}
                      <a onClick={setHandleShow} style={{ cursor: "pointer" }}>
                        <strong>Here</strong>
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
