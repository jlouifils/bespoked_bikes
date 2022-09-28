import React from "react";
import "./global.css";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Sales from "./component/saleAction/Sales";
import SaleDetail from "./components/courseAction/SaleDetail";
import ClientSignIn from "./component/ClientAction/ClientSignIn";
import ClientSignUp from "./component/ClientAction/ClientSignUp";
import CreateSales from "./component/ClientAction/CreateSales";
import UpdateSalePerson from "./component/ClientAction/UpdateSalePerson";
import UpdateSales from "./component/ClientAction/UpdateSales";
import UpdateProduct from "./component/ClientAction/UpdateProduct";
import PrivateRoute from "./component/ClientAction/PrivateRoute"
import ClientSignOut from "./components/ClientAction/ClientSignOut";


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.signIn = this.signIn.bind(this);
  }

  // also found this on a different website https://medium.com/technoetics/create-basic-login-forms-using-create-react-app-module-in-reactjs-511b9790dede
  // @EmmaW told me that moving my signIn method to my app.js was better
  signIn(clientInfo) {
    axios.get("http://localhost:5000/api/Clients", {
      auth: {
        username: userInfo.emailAddress,
        password: userInfo.password
      }
    }).then(results => { console.log(results.data)
      //brain ball help undertand how to use windoow.localStorage in my projrect https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
      window.localStorage.setItem('FirstName',results.data.firstName)
      window.localStorage.setItem('LastName', results.data.lastName)
      window.localStorage.setItem('Email',clientInfo.emailAddress)
      window.localStorage.setItem('Password',clientInfo.password)
      window.localStorage.setItem('clientId', JSON.stringify(results.data._id))
      window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
      window.location.assign('/')
    })

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header  />
          <Switch>
            <Route exact path="/" component={Client} />
            <Route exact path="/" component={Sales} />
            <PrivateRoute path="/Client/create/Sales"  component={CreateSales} /> 
            <PrivateRoute path="/Sales/:id/update" component={UpdateSales} />
            <PrivateRoute path="/SalePerson/:id/update" component={UpdateSalePerson} />
            <PrivateRoute path="/Product/:id/update" component={UpdateProduct} /> 
            <Route exact path="/Sales/:id" component={SaleDetail} />
            <Route exact path="/ClientsignIn" component={() => <ClientSignIn  signIn={this.signIn}/>} /> 
            <Route exact path="/ClientSignUp" component={ClientSignUp} />
            <Route exact path="/ClientSignOut" component={ClientSignOut} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}