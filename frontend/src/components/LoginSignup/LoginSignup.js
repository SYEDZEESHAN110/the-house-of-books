import React from "react";
import "./LoginSignup.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { login } from "./LoginSignup.reducer";
import { useSignIn } from "react-auth-kit";

function LoginSignUp() {
  const signIn = useSignIn();
  const [isActive, setIsActive] = useState(false);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");
  const { isLoggedIn, user, id, name, email, password, password2 } =
    useSelector((state) => ({
      isLoggedIn: state.LoginSignupFormReducer.isLoggedIn,
      user: state.LoginSignupFormReducer.user,
      id: state.LoginSignupFormReducer.id,
      name: state.LoginSignupFormReducer.name,
      email: state.LoginSignupFormReducer.email,
      password: state.LoginSignupFormReducer.password,
      password2: state.LoginSignupFormReducer.password2,
    }));

  let navigate = useNavigate();
  // const { data } = useQuery("Login", async () => {
  //   return await axios.get("http://localhost:6000/");
  // });
  const [errorMessage, setErrorMessage] = useState("");

  // Login React-Query
  let mutationLogin = useMutation({
    mutationFn: () => {
      axios
        .post("http://localhost:9000/userLogin", {
          email: email,
          password: password,
        })
        .then((res) => {

          // -----React-auth-kit -- auth protection------// 

          // signIn({
          //   token: res.data.token,
          //   expiresIn: 3600,
          //   tokenType: "Bearer",
          //   authState: { email: email },
          // });
          
          if (res.status === 200 || 201) {
            const user = res.data.token;
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(login(true));
            dispatch({ type: "INCREMENT_USER", payload: user });
            navigate(`/Dashboard`);
          } else if (res.status === 400 || 401) {
            setErrorMessage(res.data.message);
          } else {
            console.log(res.data);
          }
        });
    },
    onSuccess: () => {},
  });

  // Register React-Query
  let mutationSignup = useMutation({
    mutationFn: () => {
      axios
        .post("http://localhost:9000/userSignup", {
          name: name,
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status === 200 || 201) {
            navigate(`/`);
          } else {
            console.log(res.error);
          }
        });
    },
    onSuccess: () => {},
  });

  // Get user from local storage which will be a response of login api
  // const user = JSON.parse(localStorage.getItem(user));

  console.log(user, name, email, password);
  const dispatch = useDispatch();

  const signupBtnonClick = function () {
    setIsActive(true);
  };

  const signinBtnonClick = function () {
    setIsActive(false);
  };

  //Register onClick Function
  const additionSignup = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password does not match");
    } else {
      mutationSignup.mutate();
    }
    dispatch({ type: "INCREMENT_ID" });
  };

  // Login onClick Function
  const additionLogin = (e) => {
    e.preventDefault();

    mutationLogin.mutate();
  };

  return (
    <div className={`parent ${isActive ? "active" : ""}`}>
      <div className="container">
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="blueBg">
          <div className="box signin">
            <h2>Already have an Account ?</h2>
            <button className="signinBtn" onClick={signinBtnonClick}>
              Sign in
            </button>
          </div>
          <div className="box signup">
            <h2>Don't have an Account ?</h2>
            <button className="signupBtn" onClick={signupBtnonClick}>
              Sign up
            </button>
          </div>
        </div>
        <div className={`formBx ${isActive ? "active" : ""}`}>
          <div className={`form signinForm `}>
            <form>
              <h3>Sign In</h3>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  dispatch({
                    type: "INCREMENT_EMAIL",
                    payload: e.target.value,
                  });
                }}
                placeholder="Email"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  dispatch({
                    type: "INCREMENT_PASSWORD",
                    payload: e.target.value,
                  });
                }}
              />
              <input
                type="submit"
                value="Login"
                onClick={(e) => {
                  return additionLogin(e);
                }}
              />
              <a href="a" className="forget">
                Forget Password
              </a>
            </form>
          </div>

          <div className={`form signupForm `}>
            <form>
              <h3>Sign Up</h3>
              <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => {
                  dispatch({ type: "INCREMENT_NAME", payload: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  dispatch({
                    type: "INCREMENT_EMAIL",
                    payload: e.target.value,
                  });
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  dispatch({
                    type: "INCREMENT_PASSWORD",
                    payload: e.target.value,
                  });
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => {
                  dispatch({
                    type: "INCREMENT_PASSWORD2",
                    payload: e.target.value,
                  });
                }}
              />
              <input
                type="submit"
                value="Register"
                onClick={(e) => {
                  return additionSignup(e);
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
