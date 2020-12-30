import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/auth";
import classnames from 'classnames'

const Register = (props) => {
  const { history } = props



  // Initial state
  const initialState = {
      name: "",
      email: "",
      password: "",
      password2: ""
  }

  const [state, setState] = useState(initialState)

  const dispatch = useDispatch()
  
  const auth = useSelector(state => state.auth)
  const errors = useSelector(state => state.errors)

  useEffect(() => {
    if(auth.isAuthenticated) props.history.push("/dashboard")
  }, [auth.isAuthenticated, props.history])
  
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
    dispatch(registerUser(newUser, history))
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
                  error={errors.name}
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  onChange={onInput}
                  value={state.email}
                  error={errors.email}
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  onChange={onInput}
                  value={state.password}
                  error={errors.password}
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  id="password2"
                  type="password"
                  onChange={onInput}
                  value={state.password2}
                  error={errors.password2}
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
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