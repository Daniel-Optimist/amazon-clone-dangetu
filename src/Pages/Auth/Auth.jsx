import React, { useState, useContext } from "react";
import classes from "./signUp.module.css";
import Layout from "../../components/Layout/Layout";
import { Link , useNavigate, useLocation} from "react-router-dom";
import { auth } from "../../Utility/firebase"; //importing it from the configuration file (firebase.js)
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"; //importing it from firbase package we installed
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import {ClipLoader} from "react-spinners";



function Auth() {
  // Empty string three states for email, password, and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,//means sign-in isn't in progress
    signUp: false,//means sign-up isn't in progress
  });  //initially set not to spin!
  // console.log (password, email)  // you will see in the console email and pw values entered in the browser
  const [{ user }, dispatch] = useContext(DataContext); //using the useContext hook to access the context value provided by the DataContext from DataProvider component
  const navigate = useNavigate()  // store useNavigate() hook in navigate and use in payment and protectedRoute components 
  const navStateData=useLocation() // this hook helps to access msg and redirect states from ProtectedRoute component 
  console.log(navStateData) // note the values assigned to navigationState at ProtectedRoute will be shown (inspect the app)

  // function for sgnIn and sgnUp
  console.log (user)
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signIn") {
      setLoading({ ...loading, signIn: true }); //load spinner if sign-in is in progress. 
      //firebase auth(from configuration)
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          //  console.log(userInfo);
          dispatch({
            // Dispatch an action to the reducer function
            type: Type.SET_USER, // Specify the action type as 'SET_USER' to update the user state

            user: userInfo.user,
            // Pass the user information from 'userInfo.user' to the action payload
          });
          setLoading({ ...loading, signIn: false }); //no spin coz signIn is false(not in progress)
          navigate(navStateData?.state?.redirect || "/"); // Redirects the user to the redirect("/payment") or "/" home route after signing in.
          
        })
        .catch((error) => {
          // console.log(error.message);
          setError(error.message);
          setLoading({ ...loading, signIn: false }); //no spin coz signIn is false(not in progress)
        });
    } else {
      setLoading({ ...loading, signUp: true})//spin when singUp true(inProgress);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false }); //no spin when signUp=false(notInProgress);
          navigate(navStateData?.state?.redirect || "/"); // Redirects the user to the redirect("/payment") or "/" home route after signing up.
        })
        .catch((error) => {
          // console.log(error);
          setError(error.message);
          setLoading({ ...loading, signUp: false }); //no spin when signUp=false(notInProgress);
        });
    }
  };
  return (
    // parent section (Login) for logo in Link and the div
    <section className={classes.login}>
      {/* Logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
          alt=""
        />
        {/* https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png */}
      </Link>

      {/* div : for title of form (h1), form, agreement, and acctCrtgBtn  */}
      <div className={classes.login_container}>
        <h1> Sign-In</h1>
        {/* ensure optional chaining to avoid error when data is unavailable  */}
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}

        <form action="">
          {/* div for email */}
          <div>
            <label htmlFor="email"> Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          {/* div for password  */}
          <div>
            <label htmlFor="password"> Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          {/* button for  */}
          <button
            className={classes.login_signInButton}
            type="submit"
            name="signIn"
            onClick={authHandler}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        {/* agreement as p element   */}
        <p>
          By signing in, you agree to the Conditions of Use & Sale for this
          non-commercial, educational Amazon Clone. Please review our Privacy
          Notice, Cookies Notice, and Interest-Based Ads Notice
        </p>
        {/* create an account btn  */}
        <button
          className={classes.login_registerButton}
          type="submit"
          name="signUp"
          onClick={authHandler}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {/* If 'error' exists (is truthy), render a small element displaying the
        error message */}
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}> {error}</small>
        )}
        {/* same expression as : {error ? <small>{error}</small> : null} */}
      </div>
    </section>
  );
}

export default Auth;
