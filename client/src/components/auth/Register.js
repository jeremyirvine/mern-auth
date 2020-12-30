import { PromiseProvider } from "mongoose";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const Register = (props) => {

  // Initial state
  const initialState = {
      name: "",
      email: "",
      password: "",
      password2: ""
  }

  const [state, setState] = useState(initialState)
  
  // onChange
  const onInput = e => {
    setState({
        ...state,
        [e.target.id]: e.target.value
    })
  }
  
  // onSubmit
  const onRegister = e => {
    e.preventDefault()

    const newUser = { 
        name: state.name,
        email: state.email,
        password: state.password,
        password2: state.password2
    }
    console.log(newUser)


  }
  
  return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={onRegister}>
              <div className="input-field col s12">
                <input
                  id="name"
                  type="text"
                  onChange={onInput}
                  value={state.name}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  onChange={onInput}
                  value={state.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  onChange={onInput}
                  value={state.password}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  id="password2"
                  type="password"
                  onChange={onInput}
                  value={state.password2}
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Register;