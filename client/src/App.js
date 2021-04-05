import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SwitchHeader from "./components/header/";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { UserContext } from "./context/userContext";

import { API, setAuthToken } from "./config/api";

import { QueryClient, QueryClientProvider } from "react-query";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import AddLink from "./pages/user/AddLink";
import MyLinks from "./pages/user/MyLinks";
import Template from "./pages/user/Template";
import Profile from "./pages/user/Profile";

import "./styles/master.css";
import ErrorView from "./pages/error/404";
import { LinkContextProvider } from "./context/linkContext";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);
  const checkUser = async () => {
    try {
      const respone = await API.get("/check-auth");
      if (respone.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = respone.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();
  if (state?.loading) return <h1>Loading</h1>;
  return (
    <QueryClientProvider client={client}>
      <LinkContextProvider>
        <Router>
          {!state?.isLogin ? <SwitchHeader role="GUEST" /> : null}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/add/:id" component={AddLink} />
            <PrivateRoute exact path="/template" component={Template} />
            <PrivateRoute exact path="/short-list" component={MyLinks} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </LinkContextProvider>
    </QueryClientProvider>
  );
}

const Test = () => {
  //initiate FormData object
  const data = new FormData();

  //object with data

  const urlStuffs = {
    email: "hashimwarren@gmail.com",
    fname: "King",
    lname: "Hashim",
    links: [
      {
        title: "denny",
      },
      {
        title: "den",
      },
    ],
  };

  //Object.entries() method returns an array, forEach iterates over it, FormData.append inserts the key, value pairs

  Object.entries(urlStuffs).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.map((d, key1) => {
        Object.entries(value[key1]).forEach(([key1, value1]) => {
          data.append(key1, value1);
        });
      });
    } else {
      data.append(key, value);
    }
  });

  //Check to see if data made it into FormData
  console.log("iner", data);
};

// function Den() {
//   let data = {
//     links: [
//       {
//         id: 1,
//       },
//     ],
//   };

//   const denn = data.links.map((d, key) => {
//     return d;
//   });

//   console.log("den", denn[0].id);
// }

export default App;
