import React from "react";
import "@reach/combobox/styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Logout from "./pages/logout";
import Account from "./pages/Account";
import NoMatch from "./pages/NoMatch"
import UserProvider from "./utils/UserContext";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {

// here is the pathing for the whole app we use react router Switch and Routes to make it possible to navigate the site
  return (

    <React.Fragment>
      <UserProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <Navigation />
            <div className="container">
              <Switch>

                <Route exact path="/">
                  <Signin />
                </Route>

                <Route exact path="/signup" >
                  <Signup />
                </Route>

                <Route exact path="/home" >
                  <Home />
                </Route>

                <Route exact path="/account">
                  <Account />
                </Route>

                <Route exact path="/logout" >
                  <Logout />
                </Route>

                <Route>
                  <NoMatch />
                </Route>

              </Switch>
            </div>
          
          </Router>
        </MuiPickersUtilsProvider>
      </UserProvider>
    </React.Fragment>
  );
}


export default App;
