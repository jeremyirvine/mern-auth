import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/private-route/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode'
import { logoutUser, setCurrentUser } from './actions/auth';

function App(props) {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (localStorage.jwtToken)
    {
      let token = localStorage.jwtToken
      setAuthToken(token)

      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))

      const currentTime = Date.now() / 1000

      if (decoded.exp < currentTime)
      {
        dispatch(logoutUser())
        props.history.push('/login')
      }
    }
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default withRouter(App);