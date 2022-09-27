import React from "react";
import { Route, Redirect } from "react-router-dom";



//  i found this out fow to use function in reaction https://reacttraining.com/react-router/web/example/auth-workflow
export default function PrivateRoute({ component: Component, ...rest }) {
    return ( 
      <Route
        {...rest}
        render={props =>
        
            localStorage.getItem("IsLoggedIn")   
            ? ( <Component {...props} /> ) 
            : (alert('You must be logged in to do that!'),    
            <Redirect 
              to='/UserSignIn' 
            /> 
          ) 
        }
      />
    );
  }