import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  //we are using instead of navigate because it deprecetaed in v6
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //...note is spread operator means values of note remain add extra note which we will get as input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();

      console.log(data);
      if (data.success) {
        //save the token and redirect
        localStorage.setItem("token", data?.authtoken);
        localStorage.setItem("userId", data?.user._id);
        toast.success("Succesfully Login");
        navigate("/");
      } else {
        toast.error("Please Login using valid credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <div className="form-container">
         
          <form onSubmit={handleSubmit} className="login-form">
          <h4 className="text-center mb-4">Login to Blogify</h4>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              id="email"
              name="email"
              autoComplete="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter Your Passowrd"
              className="form-control"
              id="password"
              name="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={onChange}
              required
              minLength={8}
            />
          </div>
          <div className="text-center mb-2 mt-4">
            <button type="submit" className="btn">
            Login
            </button>
          </div>
            <p className="text-center text-dark">
              Don't have an account ?
              <Link style={{ textDecoration: "none" }} className="gotologin" to="/signup">
                {" "}
                click here
              </Link>
            </p>
          </form>
        </div>
    
    </>
  );
};

export default Login;