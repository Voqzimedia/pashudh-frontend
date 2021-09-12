import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Alert } from "reactstrap";

import { toBase64 } from "../../helper/functions";
import { uploadImg, changeProfileImg, getUser } from "../../helper/auth";

import { icons } from "feather-icons";

import dynamic from "next/dynamic";

const SvgIcon = dynamic(() => import("../../components/utils/SvgIcon"));

import profileImg from "../../assets/images/avatar.jpg";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload">
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} />
    </div>
    <input
      id="photo-upload"
      type="file"
      onChange={onChange}
      accept="image/png, image/jpeg"
    />
    <div className="uploadIcon">
      <SvgIcon icon={icons.upload.toSvg()} />
    </div>
  </label>
);

export default function Profile() {
  const { user, setUser } = useContext(AppContext);

  const [profilePic, setProfilePic] = useState(
    user?.ProfilePic?.formats?.thumbnail?.url
      ? `${user.ProfilePic.formats.thumbnail.url}`
      : profileImg
  );

  const [imgFIle, setimgFIle] = useState(null);
  const [error, setError] = useState(null);
  const [uploadRes, setUploadRes] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDismiss = () => setError(false);

  useEffect(() => {
    getUser().then((res) => (res?.data ? setUser(res.data) : null));
  }, [user]);

  const onChange = async (e) => {
    const rawImg = await toBase64(e.target.files[0]);

    // console.log(rawImg);

    rawImg ? setProfilePic(rawImg) : null;
    e.target.files.length > 0 ? setimgFIle(e.target.files) : null;
  };

  const onSubmit = () => {
    setLoading(true);

    const formData = new FormData();

    Array.from(imgFIle).forEach((image) => {
      formData.append("files", image);
    });

    uploadImg(formData)
      .then((res) => {
        // setOrderList(() => res.data);

        if (res.data) {
          if (res.data.length > 0) {
            changeProfileImg(user.id, res.data[0].id)
              .then((res) => {
                setLoading(false);
                // console.log(res.data);
                setUploadRes(true);
                setUser(res.data);
              })
              .catch((error) => {
                setLoading(false);
                setError(error.response.data);
              });
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data);
      });
  };

  //   console.log(user);

  return (
    <div className={`user-profile`}>
      <div className="greetings">
        <center>
          <h4>Welcome Back !</h4>
        </center>
      </div>

      <div className="profile-img">
        <div className="image-holder">
          <ImgUpload src={profilePic} onChange={onChange} />
        </div>
      </div>
      {imgFIle && (
        <div className="profile-action">
          {uploadRes ? (
            <Alert color="success">Image Updated</Alert>
          ) : (
            <button className={`btn`} onClick={onSubmit}>
              {loading ? "Uploading" : "Upload"}{" "}
              <SvgIcon icon={icons.upload.toSvg()} />
            </button>
          )}
        </div>
      )}

      <div className="content-holder">
        <p className="name">{user.username}</p>
        <p className="email">({user.email})</p>
      </div>
    </div>
  );
}
