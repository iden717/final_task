import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import img from "../../image/illustration.png";

import Alert from "../../components/alert/Alert";
import ConfirmAlert from "../../components/modal/ConfirmAlert";
import { useHistory } from "react-router";

const Profile = () => {
  const route = useHistory();
  const [showAlert, setAlert] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [confirmShow, setConfirmShow] = useState(false);
  const [form, setForm] = useState({
    fullname: state?.user?.fullname,
  });

  const { data: userData, refetch: userRefetch } = useQuery(
    "userQuery",
    async () => {
      const response = await API.get("/check-auth");
      return response;
    }
  );
  const edit = useMutation(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await API.patch("/user", form, config);
    userRefetch();
  });

  const deleteUserByAuth = useMutation(async () => {
    await API.delete("/user");
    dispatch({
      type: "LOGOUT",
    });
  });

  const onChange = (e) => {
    const fileForm = { ...form };
    fileForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(fileForm);
    setAlert(false);
  };

  const setEdit = async (e) => {
    e.preventDefault();
    try {
      edit.mutate();
      setAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserId = () => {
    try {
      deleteUserByAuth.mutate();
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = () => {
    setConfirmShow(true);
  };

  const handleClose = () => {
    setConfirmShow(false);
  };

  if (state?.loading) return <h1>loading</h1>;

  const { fullname } = form;
  return (
    <div>
      <div className="row bg-light p-3 header">
        <div className="col-md-12 container-fuild ml-3">
          <h3 className="text center">Template</h3>
        </div>
      </div>
      <div className="bg-dashboard pt-3">
        <div className="row p-5 bg-dashboard">
          <div className="col">
            <form onSubmit={(e) => setEdit(e)}>
              <div
                className="card shadow mb-4"
                style={{ borderRadius: "20px" }}
              >
                <div className="card-body">
                  <div className="col mb-5">
                    <div className="row mt-4">
                      <div className="col">
                        {showAlert ? (
                          <Alert
                            error={edit?.error}
                            message={edit?.error?.response?.data?.message}
                          />
                        ) : null}
                        <div className="mb-5">
                          <lable className="text-grey">Name</lable>
                          <input
                            type="text"
                            name="fullname"
                            value={fullname}
                            onChange={(e) => onChange(e)}
                            className="form-control input-dashboard form-control-lg"
                          />
                        </div>
                        <div className="mb-5">
                          <lable className="text-grey">Email</lable>
                          <input
                            type="text"
                            name="email"
                            className="form-control input-dashboard form-control-lg"
                            placeholder={state?.user?.email}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <div className="mb-3 mr-4">
                  <button
                    type="submit"
                    className="btn btn-app btn-lg font-weight-bold"
                    style={{
                      fontSize: "16px",
                      width: "170px",
                      borderRadius: "15px",
                    }}
                  >
                    Saved
                  </button>
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-danger btn-lg font-weight-bold"
                    onClick={handleShow}
                    style={{
                      fontSize: "16px",
                      width: "170px",
                      borderRadius: "15px",
                    }}
                  >
                    Delete Account
                  </button>
                </div>
                <ConfirmAlert
                  setShow={confirmShow}
                  deleteById={deleteUserId}
                  setHandleClose={handleClose}
                  message="You are sure want to remove this account ?"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
