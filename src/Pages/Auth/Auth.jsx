import React, { useState } from "react";
import classes from "./signUp.module.css";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { auth } from "../../Utility/firebase";

function Auth() {
  // Empty string three states for email, password, and error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // console.log (password, email)  // you will see in the console email and pw values entered in the browser
  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
          alt=""
        />
        {/* https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png */}
      </Link>

      {/* div : for title of form (h1), form, agreement, and acctCrtgBtn  */}
      <div className={classes.login_container}>
        <h1> Sign-In</h1>
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
          <button className={classes.login_signInButton}>sign In</button>
        </form>
        {/* agreement as p element   */}
        <p>
          By signing in, you agree to the Conditions of Use & Sale for this
          non-commercial, educational Amazon Clone. Please review our Privacy
          Notice, Cookies Notice, and Interest-Based Ads Notice
        </p>
        {/* create an account btn  */}
        <button className={classes.login_registerButton}>
          Create Your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
