import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const history = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [loginData, setloginData] = useState({
    username: "",
    password: "",
  });

  //handleChange
  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = loginData;
    setisLoading(true);
    await axios
      .post(`${process.env.REACT_APP_SERVERURLLOGIN}`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "Login Successful.") {
          localStorage.setItem("token", res.data.token);
          setisLoading(false);
          history("/");
        } else {
          alert(res.data.msg);
          setisLoading(false);
        }
      })
      .catch((e) => {
        console.log("ERROR");
        setisLoading(false);
      });
  };
  return (
    <div className="login">
      {!isLoading ? (
        <div className="box">
          <span>Login</span>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              required
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>
          <Link to={"/signup"}>Register Now?</Link>
        </div>
      ) : (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
