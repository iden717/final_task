import { Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { useHistory } from "react-router";

import { API, setAuthToken } from "../../config/api";

import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";

const Login = ({ setShow, setHandleClose, setHandleShow }) => {
  const route = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = useMutation(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(form);

    const response = await API.post("/login", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response?.data?.data?.user,
    });

    setAuthToken(response?.data?.data?.user?.token);
    route.push("/template");
    setHandleClose();
  });

  console.log("ini contet", state?.isLogin);

  const setLogin = async (e) => {
    e.preventDefault();

    try {
      await login.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("login", login);
  return (
    <Modal
      dialogClassName="modal-wd"
      show={setShow}
      onHide={setHandleClose}
      centered
    >
      <Modal.Body>
        <div className="container mt-3">
          <form onSubmit={(e) => setLogin(e)}>
            <h2>
              <strong>Login</strong>
            </h2>
            <div className="mb-3 mt-4">
              <input
                type="email"
                name="email"
                onChange={(e) => onChange(e)}
                className="form-control input-app form-control-lg"
                placeholder="Email"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                name="password"
                onChange={(e) => onChange(e)}
                className="form-control input-app form-control-lg"
                placeholder="Password"
              />
            </div>
            <label className="text-danger">
              {login?.error ? login?.error?.response?.data?.message : null}
            </label>
            <div className="mb-3">
              <button type="submit" className="btn btn-app btn-lg">
                Login
              </button>
            </div>
            <div className="mb-3">
              <p className="mt-2 text-center" style={{ color: "#B1B1B1" }}>
                Don't have an account ? click{" "}
                <a onClick={setHandleShow} style={{ cursor: "pointer" }}>
                  <strong>Here</strong>
                </a>
              </p>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
