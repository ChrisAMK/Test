// Navigation is a consistent component that is always rendered to the top of the app
import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserProvider from '../utils/UserContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Navigation() {
  // Accessing the user Information to display a greeting with the user's name
  const userData = useContext(UserProvider.context);

  // We are conditionally rendering a link to sign in or log out depending on the user's sign-in status
  // also condionally displaying the user's name in a greeting or telling the user that they are not logged in
  return (
    <div className="navbar navbar-expand navigationBar navbar-light" id="navigation">
      <div className="container-fluid">
        <div className="imgWrapper">
          <a className="navbar-brand imgWrapper" href="/home"><img src={require("../assets/TFlogo.png")} className="logo" alt="Logo" title="Click to go to Homepage" /></a>
        </div>
        <div className="listContainer">
          <ul className="navbar-nav ml-auto">
            <li>
              {(userData.firstname === undefined) ? <p className="nav-link">You are Signed out</p> : <Link to="/account"><p className="nav-link"> {userData.firstname} <AccountCircleIcon /> </p></Link>}
              </li>
              {(userData.firstname === undefined) ? 
              <li>
                <Link to="/"><p className="nav-link">Sign in</p></Link>
              </li>
              :
              <li>
                <Link to="/logout"><p className="nav-link">Log out</p></Link>
              </li>
              }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navigation