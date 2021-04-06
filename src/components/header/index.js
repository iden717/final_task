import Guest from "./HeaderGuest";
import User from "./HeaderUser";

const index = ({ role }) => {
  switch (role) {
    case "USER":
      return <User />;
    default:
      return <Guest />;
  }
};

export default index;
