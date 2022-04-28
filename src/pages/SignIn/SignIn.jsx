import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../features/login";
import { apiResponseLogin } from "../../features/apiResponse";
import { profileLogin } from "../../features/profile";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (localStorage.login) {
      let localStorageLogin = JSON.parse(localStorage.login);
      setEmail(localStorageLogin.email);
      setPassword(localStorageLogin.password);
      setChecked(true);
    }
  }, []);

  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  function remenberMe() {
    if (checked) {
      localStorage.setItem("login", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("login");
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function requestForProfile(token) {
    const requestForProfileHeaders = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        requestForProfileHeaders
      );
      const res = await response.json();
      dispatch(profileLogin(res));
    } catch (error) {
      console.log(error);
    }
  }

  async function requestForLogin() {
    const requestForLoginHeaders = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/login",
        requestForLoginHeaders
      );
      const res = await response.json();
      if (res.status !== 200) {
        dispatch(apiResponseLogin(res));
        setIsError(true);
      } else {
        dispatch(apiResponseLogin(res));
        dispatch(userLogin({ email, password }));
        requestForProfile(res.body.token);
        remenberMe();
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    requestForLogin();
  }

  return (
    <div>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                {...{ checked }}
                onChange={handleCheckbox}
                type="checkbox"
                id="remember-me"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {isError && <div className="errorInfo">Invalid data</div>}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
