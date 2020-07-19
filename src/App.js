import React, { useEffect } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getData from "./ultils/getData";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import { Navbar, Nav } from "react-bootstrap";
import "./ultils/getData";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.isAuthenticated);

  const getCurrentUser = () => {
    let data = getData();
    if (data) {
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const ProtectedRoute = (props) => {
    if (user === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
  return (
    <div>
      <Navbar className="navbar-color" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand to="/" as={NavLink}>
          LunchMate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/profile" as={NavLink}>
              Profile
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link to="/login" as={NavLink}>
              Login
            </Nav.Link>
            <Nav.Link to="/register" as={NavLink}>
              Register
            </Nav.Link>
            {user ? (
              <Nav.Link to="/logout" as={NavLink}>
                Logout
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Route exact path="/register" component={Register}></Route>
        <ProtectedRoute
          path="/profile"
          render={(props) => <Profile {...props} user={user} />}
        />
      </Switch>
    </div>
  );
}

export default App;
