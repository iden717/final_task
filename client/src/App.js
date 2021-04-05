import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";

import SwitchHeader from "./components/header/";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { UserContext } from "./context/userContext";

import { API, setAuthToken } from "./config/api";

import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/Home";
import AddLink from "./pages/user/AddLink";
import MyLinks from "./pages/user/MyLinks";
import TemplateMockup from "./pages/user/Template";
import TemplatePublish from "./pages/template/publish/Template";
import Profile from "./pages/user/Profile";

import "./styles/master.css";
import Loading from "./components/loading/Loading";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const pink = useHistory();
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
  if (state?.loading) return <Loading />;
  console.log(state.isLogin);
  return (
    <QueryClientProvider client={client}>
      <Router>
        {!state?.isLogin ? <SwitchHeader role="GUEST" /> : null}
        <Switch>
          <Route exact path="/" component={Home} isLogin="denny" />
          <PrivateRoute exact path="/add/:id" component={AddLink} />
          <PrivateRoute exact path="/template" component={TemplateMockup} />
          <PrivateRoute exact path="/short-list" component={MyLinks} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/:id" component={TemplatePublish} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
