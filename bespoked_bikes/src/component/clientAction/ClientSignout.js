import React from "react";
import {Redirect} from "react-router-dom";


// This component logs out the client
export default class ClientSignOut extends React.Component {
logOut = () => {
    window.localStorage.removeItem('FirstName')
    window.localStorage.removeItem('LastName')
    window.localStorage.removeItem('Email')
    window.localStorage.removeItem('Password')
    window.localStorage.removeItem('ClientId')
    window.localStorage.removeItem('IsLoggedIn')
    window.location.assign('/ClientSignIn')
    
  }
    componentDidMount() {
        this.logOut();
    }

    // Redirects to "/ClientSignIn" after logging out client
    render(){
        return(
            <Redirect to="/ClientSignIn" />
        )
    }
}