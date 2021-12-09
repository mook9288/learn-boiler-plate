import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/view/LandingPage/LandingPage';
import LoginPage from './components/view/LoginPage/LoginPage';
import RegisterPage from "./components/view/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default App;
