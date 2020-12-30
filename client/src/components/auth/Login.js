import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classnames from 'classnames'
import { loginUser } from '../../actions/auth'

const Login = (props) => {
  

  // Initial state
  const initialState = {
      email: "",
      password: ""
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
  const onLogin = e => {
    e.preventDefault()
    
    const user = {
      email: state.email,
      password: state.password
    }

    dispatch(loginUser(user))
  }
  
  return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={onLogin}>
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  value={state.email}
                  onChange={onInput}
                  error={errors.email}
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  value={state.password}
                  onChange={onInput}
                  error={errors.password}
                  className={classnames("", {
                    invalid: errors.password || errors.incorrectcredentials
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.incorrectcredentials}
                </span>
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
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Login;