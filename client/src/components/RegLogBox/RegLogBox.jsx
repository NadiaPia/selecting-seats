import React, { useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegLogBox() {
  const [showRegisterForm, setRegisterForm] = useState(false);
  return (
    <div className="regLogBoxSection">
      <div className="regLogBox">
        {showRegisterForm ? <RegisterForm /> : <>
          <Form label="Login" />
          <p>
            Don't have an account?
            <div
              className="signUpLink"
              onClick={() => setRegisterForm(!showRegisterForm)}
            >
              Sign Up
            </div>
            {/* {showRegisterForm && <RegisterForm />} */}
          </p>
        </>}
        
      </div>
    </div>
  );
}

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={() => console.log("Hello")}>
        <h2> {label} </h2>

        <div className="form-group">
          <label htmlFor="username"></label>
          <input type="text" id="username" />
        </div>

        <div className="form-group">
          <label htmlFor="username"></label>
          <input type="text" id="username" />
        </div>

        <button type="submit"> {label} </button>
      </form>
    </div>
  );
};

export default RegLogBox;
