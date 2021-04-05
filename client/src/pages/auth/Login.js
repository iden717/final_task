import { useContext, useState } from "react";
import { useHistory } from "react-router";

import ModalLogin from "../../components/modal/Login";
import { API, setAuthToken } from "../../config/api";

import { UserContext } from "../../context/userContext";

const Login = () => {
  const route = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const setLogin = async (e) => {
    e.preventDefault();

    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  console.log("form", form);

  return <ModalLogin onChange={onChange} setLogin={setLogin} />;
};

export default Login;
