import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //...note is spread operator means values of note remain add extra note which we will get as input
  };

  const { username, email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      // console.log(json);
      if (data.success) {
        // save the token and redirect
        localStorage.setItem("token", data.authtoken);
        localStorage.setItem("userId", data?.user._id);
        navigate("/");
        toast.success("Succesfully created your account");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
          <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="text-center mb-4">Welcome to Blogify </h4>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Your Username"
              className="form-control"
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              aria-describedby="usernameHelp"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter Your Passowrd"
              className="form-control"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
              required
              minLength={8}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              autoComplete="confirm-password"
              onChange={onChange}
              required
              minLength={8}
            />
          </div>
          <div className="text-center mb-2 mt-2">
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </div>
          <p className="text-center text-dark">
            Already have an account?
            <Link style={{ textDecoration: "none"}} className="gotologin" to="/login">
              click here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;