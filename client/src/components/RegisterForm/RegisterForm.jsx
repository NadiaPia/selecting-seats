import React from 'react'

function RegisterForm() {
  return (
    <div className="regLogBoxSection">
    <div className="regLogBox">
      <>
        <Form label="Sign Up" />
        
      </>
      
    </div>
  </div>
  )
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

export default RegisterForm
