import profile from "../../image/icon/profile.png";

const AddNewLink = ({ file, onChangeLink, changeImgLink, data }) => {
  const { title, url, image } = data;
  return (
    <div className="card shadow mt-5 mb-4">
      <div className="card-body">
        <div className="container">
          <div className="mb-3">
            <div className="">
              <h5>Link {data ? data.id : "1"}</h5>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mt-4">
                  <div class="mb-3">
                    <img
                      src={
                        data.previewImg
                          ? data.previewImg
                          : image
                          ? image
                          : profile
                      }
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="mr-4 mb-4"
                    />
                    <label
                      class="form-label text-center custom-file-upload"
                      style={{ width: "100%" }}
                    >
                      <input
                        type="file"
                        name="image"
                        onChange={(e) => {
                          onChangeLink(e, data.id);
                          changeImgLink(e, data.id);
                        }}
                      />
                      Upload
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 ml-4">
                <div className="mb-3 mt-4">
                  <label>Title Link</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => onChangeLink(e, data.id)}
                    className="form-control input-dashboard form-control-lg ms-2"
                    placeholder="Your Title"
                  />
                </div>
                <div className="mb-3 mt-4">
                  <label>Url Link</label>
                  <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => onChangeLink(e, data.id)}
                    className="form-control input-dashboard form-control-lg ms-2"
                    placeholder="Your Url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewLink;
