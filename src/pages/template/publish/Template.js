import { useQuery } from "react-query";
import { useParams } from "react-router";
import { API } from "../../../config/api";
import profile from "../../../image/icon/profile.png";
import Loading from "../../../components/loading/Loading";
import ErrorComponent from "../../error/404";
const Template = () => {
  const params = useParams();
  const { id } = params;

  const { data: BrandData, isLoading } = useQuery(
    "BrandDetailCache",
    async () => {
      const respone = await API.get(`/brand/${id}`);
      return respone;
    },
    { retry: 1 }
  );

  const brand = BrandData?.data?.data?.link;
  console.log("error");
  if (isLoading) return <Loading />;
  if (!brand) return <ErrorComponent />;
  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <div className="container p-5">
        <div className="ml-5 mr-5">
          <div className="row d-flex justify-content-center">
            <img
              className="rounded-circle"
              src={brand?.image ? brand?.image : profile}
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <div className="row pt-3 d-flex justify-content-center">
            <h2>{brand?.title ? brand?.title : "Your Brand Name"}</h2>
          </div>
          <div className="row pt-3 d-flex justify-content-center">
            <p className="text-center" style={{ fontSize: "24px" }}>
              {brand?.description
                ? brand?.description
                : "Add multiple links for your Instagram Bio and optimising your Instagram traffic using InstaBio"}
            </p>
          </div>
          <div className="row pt-3 d-flex justify-content-center">
            {brand?.links?.map((link) => (
              <a
                href={link?.url ? link?.url : null}
                className="btn btn-dark mb-4"
                style={{ width: "100%", height: "70px", fontSize: "24px" }}
                target="_blank"
              >
                <div className="row">
                  <div className="col-2 ml-2 d-flex justify-content-start">
                    <img
                      src={link?.image ? link?.image : profile}
                      className="rounded-circle mt-1 mb-1"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-8 mt-2 d-flex justify-content-center">
                    {link?.title ? link?.title : "Button"}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
