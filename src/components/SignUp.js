import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const history = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //handleChange
  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  //handleSubmit
  const handleSubmit = async (e) => {
    const { username, email, password, confirmPassword } = signupData;
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords must be same");
    } else if (password.length < 8) {
      alert("Password must be greater than 8");
    } else {
      //   console.log(signupData);
      console.log(process.env.REACT_APP_SERVERURLREGISTER);
      setisLoading(true);
      await axios
        .post(`${process.env.REACT_APP_SERVERURLREGISTER}`, {
          username: username,
          password: password,
          email: email,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.msg === "Registered successfully.") {
            history("/login");
          }
          setisLoading(false);

          alert(res.data.msg);
        })
        .catch((e) => {
          console.log("ERROR");
          setisLoading(false);
        });
    }
  };

  return (
    <div className="signup">
      {!isLoading ? (
        <div className="box">
          <span>SignUp</span>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              required
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              onChange={handleChange}
            />
            <button type="submit">SignUp</button>
          </form>
          <Link to={"/login"}>Already have an account?</Link>
        </div>
      ) : (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
