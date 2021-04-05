import CardShort from "../../components/card/ShortList";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ConfirmAlert from "../../components/modal/ConfirmAlert";

const ShortList = () => {
  const [confirmShow, setConfirmShow] = useState(false);
  const [form, setForm] = useState({ search: "" });
  const { data: ShortData, refetch: ShortRefectch } = useQuery(
    "shortListCache",
    async () => {
      const response = await API.get("/brands");
      return response;
    }
  );

  const deleteShort = useMutation(async (id) => {
    await API.delete(`/brand/${id}`);
    ShortRefectch();
  });

  const deleteShortById = async (id) => {
    await deleteShort.mutate(id);
  };
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleShow = () => {
    setConfirmShow(true);
  };

  const handleClose = () => {
    setConfirmShow(false);
  };

  return (
    <div>
      <div className="row bg-light p-3 header">
        <div className="col-md-12 container-fuild ml-3">
          <h3 className="text center">My Link</h3>
        </div>
      </div>
      <div className="bg-dashboard pt-3">
        <div className="row p-5">
          <div className="col-2 mt-2">
            <h3 className="ml-3">
              All Links{" "}
              <span className="badge badge-warning text-white">
                {ShortData?.data?.data?.shortlinks?.length}
              </span>
            </h3>
          </div>
          <div className="col-8">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>
              <input
                type="text"
                name="search"
                onChange={(e) => onChange(e)}
                class="form-control input-dashboard form-control-lg"
                id="inlineFormInputGroupUsername"
                placeholder="Find your link"
              />
            </div>
          </div>
          <div className="col-2">
            <button
              className="btn btn-app btn-lg"
              style={{ width: "120px", borderRadius: "15px" }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="row pl-5 bg-dashboard">
          <div className="col-md-11">
            {ShortData?.data?.data?.links?.map((short) => (
              <div>
                <CardShort key={short.id} onShow={handleShow} />
                <ConfirmAlert
                  setShow={confirmShow}
                  deleteById={deleteShortById}
                  setHandleClose={handleClose}
                  data={short}
                  message="You are sure want to remove this account ?"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    // <div className="container mt-5 mb-5">
    //   <div className="d-flex justify-content-center">
    //     <div className="col-md-10">
    //       {ShortData?.data?.data?.shortlinks?.map((short) => (
    //         <CardShort
    //           short={short}
    //           key={short.id}
    //           deleteShort={deleteShortById}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ShortList;
