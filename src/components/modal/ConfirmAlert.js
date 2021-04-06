import { Modal } from "react-bootstrap";

const ConfirmAlert = ({
  setShow,
  setHandleClose,
  deleteById,
  message,
  data,
}) => {
  const setDelete = () => {
    if (data) {
      const { id } = data;
      deleteById(id);
    } else {
      deleteById();
    }
  };
  return (
    <Modal
      dialogClassName="modal-wd-lg"
      show={setShow}
      onHide={setHandleClose}
      centered
    >
      <Modal.Body>
        <div className="container text-center mt-5">
          <div className="row">
            <div className="col text center">
              <span className="text-success font-weight-bold h5">
                {message}
              </span>
            </div>
          </div>
          <div className="row mt-5 mb-2">
            <div className="col d-flex justify-content-end">
              <div className="col-8 d-flex justify-content-between">
                <button
                  onClick={setDelete}
                  className="btn btn-danger btn-lg"
                  style={{
                    fontSize: "16px",
                    width: "150px",
                    borderRadius: "15px",
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={setHandleClose}
                  className="btn btn-grey btn-lg"
                  style={{ fontSize: "16px", width: "150px" }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmAlert;
