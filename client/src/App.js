import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;