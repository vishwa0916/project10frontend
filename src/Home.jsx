import { useEffect, useState } from "react";
// import "./App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [RegUserName, setRegUserName] = useState("");
  const [RegEmailId, setRegEmailId] = useState("");
  const [RegPassword, setRegPassword] = useState("");

  const [LoginEmailid, setLoginEmailid] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  const [token, setToken] = useState("");

  const [userdetails, setUserdetails] = useState("");

  const [regStatus, setRgStatus] = useState("");
  const [loginStatus, setloginStatus] = useState("");

  const [loginserverStatus, setloginserverStatus] = useState("");

  const [resetMessage, setresetMessage] = useState("");

  const navigate = useNavigate();

  console.log("recive token  in FE >", token);

  const handleRegUserInp = (e) => {
    setRegUserName(e.target.value);
  };

  const handleRegEmailInp = (e) => {
    setRegEmailId(e.target.value);
  };

  const handleRegPasswordInp = (e) => {
    setRegPassword(e.target.value);
  };

  const handleLoginEmailInp = (e) => {
    setLoginEmailid(e.target.value);
  };

  const handleLoginPasswordInp = (e) => {
    setLoginPassword(e.target.value);
  };

  //REG btn

  const handleRegBtn = async () => {
    if (RegUserName == "" || RegEmailId == "" || RegPassword == "") {
      setRgStatus("Please enter the required details");
      setTimeout(() => {
        setRgStatus("");
      }, 3000);

      return;
    }

    const requestBody = JSON.stringify({
      username: RegUserName,
      emailid: RegEmailId,
      password: RegPassword,
    });
    //password-reset-ze4r.onrender.com

    https: try {
      const regResponce = await fetch(
        "https://one0-53cx.onrender.com/api/user/register",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: requestBody,
        }
      );

      const regResDetails = await regResponce.json();

      const message = regResDetails.message;

      if (regResDetails) {
        setRgStatus(message);
      }
      console.log("REG STATUS", regStatus);
      setTimeout(() => {
        setRgStatus("");
      }, 3000);
    } catch (error) {
      console.log("error in reg>>", error);
    }
  };

  const handleLoginBtn = async () => {
    if (LoginEmailid == "" || LoginPassword == "") {
      setloginStatus("Please enter the required details");
      setTimeout(() => {
        setloginStatus("");
      }, 3000);

      return;
    }

    const loginRes = await fetch(
      "https://one0-53cx.onrender.com/api/user/login",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          emailid: LoginEmailid,
          password: LoginPassword,
        }),
      }
    );
    console.log(loginRes);
    const data = await loginRes.json();
    setToken(data.token);
    setloginserverStatus(data.message);
    setTimeout(() => {
      setloginserverStatus("");
    }, 3000);
    console.log(data.token);
  };

  const handleForget = async () => {
    try {
      if (LoginEmailid == "") {
        setloginStatus("Please enter the Login id");

        setTimeout(() => {
          setloginStatus("");
        }, 3000);

        return;
      }

      const forgetFetch = await fetch(
        "https://one0-53cx.onrender.com/api/resetpassword",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            emailid: LoginEmailid,
          }),
        }
      );

      const responce = await forgetFetch.json();

      if (responce) {
        setresetMessage(responce.message);

        console.log(responce.message);
      }

      if (responce.message == "mail sent successfully to emailid") {
        setTimeout(() => {
          navigate("/Preset");
        }, 2000);

        console.log(resetMessage);
      }

      setTimeout(() => {
        setresetMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [token]);

  const fetchdata = async () => {
    try {
      const responce = await fetch(
        "https://one0-53cx.onrender.com/api/getuser",
        {
          method: "get",
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        }
      );

      const data = await responce.json();

      if (data) {
        setUserdetails(data);
      }
    } catch (error) {
      console.log("errorrr>>>>>", error);
    }
  };

  return (
    <>
      <div className="main container-fluid text-center py-3">
        <div className="register container-fluid d-flex flex-column align-items-center justify-content-center ">
          <h1>REGISTER</h1>
          <div className="form-group mt-3 mx-5 ">
            <input
              className="form-control "
              type="text"
              value={RegUserName}
              onChange={handleRegUserInp}
              placeholder="Enter usename"
            />

            <input
              className="form-control mt-3"
              type="text"
              value={RegEmailId}
              onChange={handleRegEmailInp}
              placeholder="Enter EmailId"
            />

            <input
              className="form-control mt-3"
              type="text"
              value={RegPassword}
              onChange={handleRegPasswordInp}
              placeholder="Enter Password"
            />

            <button className="btn btn-primary mt-3" onClick={handleRegBtn}>
              register
            </button>
          </div>

          {<p>{regStatus}</p>}

          {/*       
          {setTimeout(()=>{

            setRgStatus(null);


          },3000)} */}
        </div>

        <div className="login container-fluid d-flex flex-column align-items-center justify-content-center mt-5">
          <h1>LOGIN</h1>

          <div className="form-group mt-3 ">
            <input
              type="text"
              className="form-control"
              value={LoginEmailid}
              onChange={handleLoginEmailInp}
              placeholder="Enter EmailId"
            />
            <input
              type="text"
              className="form-control mt-2 "
              value={LoginPassword}
              onChange={handleLoginPasswordInp}
              placeholder="Enter Password"
              required
            />
            <div className="login-forget-btn container-fluid f-flex mx-3">
              <button className="btn btn-success mt-2" onClick={handleLoginBtn}>
                login
              </button>
              <a className="mx-2 forget" onClick={handleForget}>
                {" "}
                Forget password?{" "}
              </a>
            </div>

            {<p>{loginStatus}</p>}
            {<p>{loginserverStatus}</p>}
          </div>
          {resetMessage ? <div>{resetMessage}</div> : null}

          {userdetails == "" ? (
            <ul>
              <h4>USER DETAILS</h4>

              <li>{userdetails.username}</li>
              <li>{userdetails.password}</li>
              <li>{userdetails.emailid}</li>
              <li>{userdetails._id}</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
