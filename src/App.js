import React from 'react'
import "./App.css";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import Dashboard from "./dashboard";

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

import Halls from './hall';
import CreateHall from './createhall';
import EditHall from './edithall';
import Customer from './Customer';
import CreateCustomer from './CreateCustomer';
import EditCustomer from './EditCustomer';
import BookCustomer from './Booking';
import Batch from './Batch';

function App() {
  const history = useHistory();
  return (
    <Router>
      <div>
        <div id="wrapper">
          <Sidebar></Sidebar>
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Topbar></Topbar>
              <div class="container-fluid">
                <Switch>
                  <Route path="/" component={Dashboard} exact={true} />
                  <Route path="/hall" component={Halls} exact={true} />
                  <Route path="/create-hall" component={CreateHall} exact={true} />
                  <Route path="/hall/edit/:id" component={EditHall} exact={true} />
                  <Route path="/hall/book/:id" component={BookCustomer} exact={true} />
                    <Route path="/Customer" component={Customer} exact={true} />
                    <Route path="/create-Customer" component={CreateCustomer} exact={true} />
                    <Route path="/Customer/edit/:id" component={EditCustomer} exact={true} />
                    <Route path="/Customer/detail/:id" component={Batch} exact={true} />
                </Switch>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Router>
  )
}

export default App;


