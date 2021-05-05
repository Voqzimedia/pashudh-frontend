import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import Cookie from "js-cookie";

import profileImg from "../../assets/images/avatar.jpg";

export default function Profile() {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    // console.log(user);
  }, []);

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
          <img
            src={
              user?.ProfilePic?.formats?.thumbnail?.url
                ? `${process.env.NEXT_PUBLIC_API_URL}${user.ProfilePic.formats.thumbnail.url}`
                : profileImg
            }
            alt="name"
          />
        </div>
      </div>
      <div className="content-holder">
        <p className="name">{user.username}</p>
        <p className="email">({user.email})</p>
      </div>
    </div>
  );
}
