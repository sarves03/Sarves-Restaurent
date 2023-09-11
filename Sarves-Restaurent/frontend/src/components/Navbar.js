import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import "./Home Page/home.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { gapi } from "gapi-script";
// import FacebookLogin from "react-facebook-login";
const clientId =
  "948377682368-hirm0bnmuc8vcn7r1e82u2opi0tvlmem.apps.googleusercontent.com";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "antiquewhite",
    border: "solid 1px brown",
    height: "350px",
  },
};

export default function Navbar() {
  const history = useHistory();
  const path = history.location.pathname;
  const [backgroundColor, setBackgroundColor] = useState("");
  const [display, setDisplay] = useState("none");
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [googleUserImage, setgoogleUserImage] = useState(undefined);
  const [Facebookimg, setFacebookimg] = useState(undefined);
  const setAttributes = (path) => {
    let bg, displayValue;
    if (path === "/") {
      bg = "transparent";
      displayValue = "none";
    } else {
      bg = "#ff0000";
      displayValue = "inline-block";
    }
    setBackgroundColor(bg);
    setDisplay(displayValue);
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  useEffect(() => {
    setAttributes(path);
  }, [path]);
  const navigateToHome = () => {
    history.push("/");
  };
  const handleLogin = () => {
    setLoginModalIsOpen(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(undefined);
  };
  const handleCancel = () => {
    setLoginModalIsOpen(false);
  };

  const onSuccess = (response) => {
    setIsLoggedIn(true);
    setLoggedInUser(response.profileObj.name);
    setLoginModalIsOpen(false);
    setgoogleUserImage(response.profileObj.imageUrl);
    console.log(
      "Loged Successfully! Current User : " +
        JSON.stringify(response.profileObj)
    );
  };
  const onFailure = (response) => {
    console.log("Login Failed : " + response);
  };

  const onFbSuccess = (response) => {
    setIsLoggedIn(true);
    setLoggedInUser(response.data.name);
    setLoginModalIsOpen(false);
    setFacebookimg(response.data.picture.data.url);
    console.log(
      "Loged Fb Successfully! Current User : " +
        JSON.stringify(response.data.picture.data.url)
    );
  };
  const onFbFail = (response) => {
    console.log("Login Failed : " + response);
  };
  return (
    <div>
      <div className="navbar" style={{ backgroundColor: backgroundColor }}>
        <div
          className="signup"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            class="logo"
            style={{
              marginLeft: "10px",
              display: display,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={navigateToHome}
          >
            e!
          </div>
          <div>.</div>
          {!isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <a className="loginHome anchor" onClick={handleLogin}>
                Login
              </a>
              <a className="createAnAccount anchor">create an account</a>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <a style={{ color: "white", marginRight: "10px" }}>
                {loggedInUser}
              </a>
              <img
                src={
                  googleUserImage === undefined ? Facebookimg : googleUserImage
                }
                alt="userImg"
                width={"40"}
                height={"40px"}
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <a
                style={{
                  color: "white",
                  border: "3px solid white",
                  cursor: "pointer",
                  padding: "3px",
                  borderRadius: "5px",
                }}
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>{" "}
        <Modal isOpen={loginModalIsOpen} style={customStyles}>
          <div>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <div style={{ width: "250px", margin: "auto" }}>
              <input type="text" placeholder="Email" className="modalEmail" />
              <br />
              <br></br>
              <input
                type="password"
                placeholder="Password"
                className="modalPassword"
              />
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "8px",
                  width: "80px",
                  cursor: "pointer",
                }}
              >
                Log in
              </button>

              <button
                style={{ padding: "8px", width: "80px", cursor: "pointer" }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>{" "}
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="google online">
              <GoogleLogin
                clientId={clientId}
                buttonText="Continue with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={isLoggedIn}
              />
            </div>
            <br />
            <div className="facebook online">
              <LoginSocialFacebook
                appId="1021424135676971"
                onResolve={onFbSuccess}
                onReject={onFbFail}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook>
            </div>

            {/* <FacebookLogin
              appId="155579894261426"
              textButton="Continue with Facebook"
              autoLoad={true}
              fields="name,email,picture"
              icon="fa-facebook"
              callback={responseFacebook}
            /> */}
          </div>
        </Modal>
      </div>
    </div>
  );
}
