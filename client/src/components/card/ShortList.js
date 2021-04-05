import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";

import profile from "../../image/icon/profile.png";

function ShortList({ short, onShow }) {
  const route = useHistory();

  const { id, title, viewCount, uniqueLink, image } = short;
  const link = `http://localhost:3000/${uniqueLink}`;

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <td className="text-center">
              {" "}
              <img
                src={image ? image : profile}
                className="rounded-circle "
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
            </td>
            <td className="">
              <h3 className="">{title}</h3>
              <a
                className=""
                href={link}
                target="_blank"
                style={{ fontSize: "20px" }}
              >
                {link}
              </a>
            </td>
            <td className="text-center">
              {" "}
              <h3 className="">Visitor</h3>
              <span style={{ fontSize: "20px" }}>{viewCount}</span>
            </td>
            <td
              className="d-flex justify-content-end"
              style={{ height: "100px" }}
            >
              <button
                onClick={() => route.push(`/${uniqueLink}`)}
                type="submit"
                className="btn btn-lg btn-app-icon mr-4"
                style={{ width: "70px" }}
              >
                <FontAwesomeIcon icon={faEye} s />
              </button>
              <button
                type="submit"
                className="btn btn-lg btn-app-icon mr-4"
                style={{ width: "70px" }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                onClick={onShow}
                type="submit"
                className="btn btn-lg btn-app-icon mr-4"
                style={{ width: "70px" }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ShortList;
