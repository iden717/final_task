import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../context/userContext";
import img from "../image/PC.png";
import phone from "../image/Phone.png";

const Home = () => {
  const route = useHistory();
  const [state] = useContext(UserContext);

  if (state?.isLogin) {
    route.push("/template");
  }
  return (
    <div className="container-fluid mt-5 p-5 pt-5 pb-5">
      <div className="row mt-5">
        <div className="col-md-1"></div>
        <div className="col-md-5">
          <div className="row">
            <div className="col">
              <p className="font-weight-bold text-white font-app">
                The Only Link
                <br /> You’ll Ever Need
              </p>
              <p className="text-white font-app-small">
                Add a link for your Social Bio and optimize your
                <br /> social media traffic.
              </p>
              <p className="text-white font-app-small">
                safe, fast and easy to use
              </p>
            </div>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col">
              <button className="btn btn-dark btn-app-lg mt-5">
                Get Started For Free
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-5 mb-5">
          <img src={phone} className="position-absolute img-phone" />
          <div className="d-flex justify-content-end">
            <img src={img} className="image-fuild img-home" />
          </div>
        </div>
        <div className="col-md-1 mb-5"></div>
      </div>
    </div>
  );
};

export default Home;
