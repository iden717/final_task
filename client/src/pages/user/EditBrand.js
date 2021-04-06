import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import AddNewLink from "../../components/card/AddNewLink";
import { API } from "../../config/api";

import profile from "../../image/icon/profile.png";
import Template from "../template/mockup/Template";

const EditBrand = () => {
  const params = useParams();
  const { id } = params;
  const route = useHistory();

  const [file, setFile] = useState({ file: null });
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    links: [
      {
        id: 1,
        previewImg: null,
        title: "",
        url: "",
        image: null,
      },
    ],
  });

  const { title, description, image } = form;

  const {
    data: ShortData,
    refetch: refectchData,
    isLoading: shortLoading,
  } = useQuery("editBrand", async () => {
    const response = await API.get(`/brand/${id}`);

    return response;
  });

  const editBrand = useMutation(async () => {
    const { title, description, image } = form;
    const body = new FormData();

    body.append("title", title);
    body.append("description", description);
    body.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await API.patch(`/brand/${id}`, body, config);
    const uniqueBrand = response?.data?.data?.link?.uniqueLink;

    const addUnique = form.links.map((data) => {
      return {
        ...data,
        uniqueBrand,
      };
    });
    const numberDB = ShortData?.data?.data?.link?.links?.length;
    const additionalShortNumber = addUnique.length - numberDB;

    console.log("number", additionalShortNumber);

    if (additionalShortNumber > 0) {
      for (let i = 0; i < additionalShortNumber; i++) {
        addLinks.mutate(addUnique[i + numberDB]);
      }
    } else {
      form.links.map((i, key) => {
        editLinks.mutate(addUnique[key]);
      });
    }
  });

  const editLinks = useMutation(async (data) => {
    const { id, title, url, image, uniqueBrand } = data;
    const body = new FormData();

    body.append("title", title);
    body.append("url", url);
    body.append("image", image);
    body.append("uniqueBrand", uniqueBrand);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await API.patch(`/link/${id}`, body, config);
    refectchData();

    route.push("/short-list");
  });

  const addLinks = useMutation(async (data) => {
    const { title, url, image, uniqueBrand } = data;
    const body = new FormData();

    body.append("title", title);
    body.append("url", url);
    body.append("image", image);
    body.append("uniqueBrand", uniqueBrand);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await API.post("/links", body, config);
    refectchData();

    route.push("/short-list");
  });

  const onChangeLink = (e, id) => {
    e.preventDefault();
    const fileForm = { ...form };
    const fileLink = { ...form.links };
    const rowIndex = fileForm.links.findIndex((row) => row.id === id);
    fileLink[rowIndex][e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(fileForm);
  };

  const onChange = (e) => {
    const fileForm = { ...form };
    fileForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(fileForm);
  };

  const changeImg = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        file: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const changeImgLink = (e, id) => {
    let reader = new FileReader();
    let previewImg = e.target.files[0];

    reader.onload = () => {
      const fileForm = { ...form };
      const fileLink = { ...form.links };
      const index = fileForm.links.findIndex((row) => row.id === id);
      fileLink[index].previewImg = reader.result;

      setForm(fileForm);
    };

    reader.readAsDataURL(previewImg);
  };

  const addLink = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      links: [...form.links, { id: form.links.length + 1 }],
    });
  };

  const setFormByDb = () => {
    var imageUrl = ShortData?.data?.data?.link?.image?.split("/")[4];

    if (!shortLoading) {
      setFile({ file: ShortData?.data?.data?.link?.image });
      setForm({
        ...ShortData?.data?.data?.link,
        image: imageUrl,
        links: ShortData?.data?.data?.link?.links?.map((data) => ({
          ...data,
          image: data?.image?.split("/")[4],
          previewImg: data?.image,
        })),
      });
    }
  };

  useEffect(() => {
    setFormByDb();
  }, []);

  console.log(" ini short", ShortData);
  console.log("ini state", shortLoading);
  console.log("ini form", form);
  return (
    <div className="">
      <div className="row bg-light p-3 header">
        <div className="col-md-12 container-fuild ml-3">
          <h3 className="text center">Template</h3>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editBrand.mutate();
        }}
      >
        <div className="">
          <div className="row p-5">
            <div className="col">
              <h3>Create New Brand</h3>
            </div>
            <div className="col-md-2 d-flex justify-content-end">
              <button type="submit" className="font-weight-bold btn btn-app">
                Saved
              </button>
            </div>
          </div>
          <div className="row pr-5 pl-5 pb-5">
            <div className="col-md-6 mb-5">
              <div className="card shadow" style={{ borderRadius: "10px" }}>
                <div className="card-body">
                  <div className="container">
                    <h4>Template 1</h4>
                    <div className="row mt-4">
                      <div className="col">
                        <div class="mb-3">
                          <img
                            src={file.file ? file.file : profile}
                            style={{ width: "150px", objectFit: "cover" }}
                            className="mr-4"
                          />
                          <label class="form-label custom-file-upload">
                            <input
                              type="file"
                              name="image"
                              onChange={(e) => {
                                onChange(e);
                                changeImg(e);
                              }}
                            />
                            Upload
                          </label>
                        </div>
                        <div className="mb-3">
                          <lable>Title</lable>
                          <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => onChange(e)}
                            className="form-control input-dashboard form-control-lg"
                            placeholder="Your Title"
                          />
                        </div>
                        <div className="mb-3">
                          <lable>Description</lable>
                          <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => onChange(e)}
                            className="form-control input-dashboard form-control-lg"
                            placeholder="Your Description"
                          />
                        </div>
                        {form?.links?.map((data) => (
                          <AddNewLink
                            data={data}
                            onChangeLink={onChangeLink}
                            changeImgLink={changeImgLink}
                          />
                        ))}
                        <div className="mb-3">
                          <button
                            type="button"
                            onClick={(e) => addLink(e)}
                            className="font-weight-bold btn btn-app"
                            style={{ width: "100%" }}
                          >
                            Add New Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center mt-5">
              <Template file={file} form={form} formLinks={form?.links} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBrand;
