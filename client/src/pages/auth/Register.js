import { useContext, useState } from "react";
import { useHistory } from "react-router";

import { API, setAuthToken } from "../../config/api";
import ModalRegister from "../../components/modal/Register";
import { UserContext } from "../../context/userContext";
const Register = ({ setShow }) => {
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
  return <ModalRegister onChange={onChange} SetLogin={SetLogin} />;
};

export default Register;
