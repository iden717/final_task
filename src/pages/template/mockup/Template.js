import profile from "../../../image/icon/profile.png";
import phone1 from "../../../image/template/blank.png";

const Template = ({ file, form, formLinks }) => {
  const { title, description, image } = form;
  return (
    <div className="row">
      <div className="col">
        <div className="group">
          <div className="content-template text-center position-absolute">
            <img
              src={file.file ? file.file : profile}
              className="rounded-circle mt-5"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
              }}
            />
            <p className="font-weight-bold mt-3">
              {title ? title : "Your Brain Name"}
            </p>
            <p style={{ maxWidth: "300px" }}>
              {description
                ? description
                : "Add multiple links for your Instagram Bio and optimising your Instagram traffic using InstaBio"}
            </p>
            {formLinks?.map((i) => (
              <a
                className="btn btn-dark mb-2"
                style={{ width: "100%" }}
                href={i.url}
                target="_blank"
              >
                <div className="row">
                  <div className="col-1 ml-2">
                    <img
                      src={
                        i.previewImg
                          ? i.previewImg
                          : i.image
                          ? i.image
                          : profile
                      }
                      className="rounded-circle d-flex justify-content-start mt-1 mb-1"
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-9 mt-1">
                    {i.title ? i.title : "Button"}
                  </div>
                </div>
              </a>
            ))}
          </div>
          <img
            src={phone1}
            className="image-fluid"
            style={{ width: "300px" }}
          />
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Template;
