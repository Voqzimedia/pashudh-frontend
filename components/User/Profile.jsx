import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import Cookie from "js-cookie";

import profileImg from "../../assets/images/avatar.jpg";

export default function Profile() {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const token = Cookie.get("token");

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();

        setUser(user);
      });
    }
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
