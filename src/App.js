import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ContactList from "./components/ContactList";
import AddEditContact from "./components/AddEditContact";

function App() {
  return (
      <Router>

        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
                <a href="/" className="navbar-brand">
                    Simple Contact App
                </a>
                <div className="navbar-nav mr-auto">
                    <a href={"/add"} className=" btn btn-success">
                            New Contact
                    </a>
                </div>

            </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/contact"]} component={ContactList} />
            <Route exact path="/add" component={AddEditContact} />
            <Route path="/contact/:id" component={AddEditContact} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
