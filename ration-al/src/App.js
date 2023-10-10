import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./users/pages/Login";
import Signup from "./users/pages/Signup";
import Display from "./Display";
import ItemsList from "./items/pages/ItemsList";
import Contact from "./Contact";
import { AuthContext } from "./shared/context/AuthContext";
import { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";

import AddItem from "./items/pages/AddItem";
import Cart from "./items/pages/Cart";
import TotalAmount from "./items/pages/TotalAmount";
import Logout from "./users/pages/Logout";
import Navigation from "./shared/Navigation/Navigation";
const App = () => {
  const [userId, setUserId] = useState(false);
  const [email, setemail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((uid, email) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setemail(email);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <Display />
        </Route>
        <Route path="/addItem" exact>
          <AddItem />
        </Route>
        <Route  path="/items" exact>
          <ItemsList />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/usercart/:userId" exact>
          <Cart />
        </Route>
        <Route path="/totalAmount/:userId" exact>
          <TotalAmount />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/home" exact>
          <Display />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/items" exact>
          <ItemsList />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          email: email,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <Navigation />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </>
  );
};

export default App;
