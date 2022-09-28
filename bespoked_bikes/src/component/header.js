import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => 

{
    if(JSON.parse(localStorage.getItem('IsLoggedIn'))){
       return ( 
        <div className="header"> 
            <div className="bounds">
                <NavLink to='/' className="header--logo">Sales</NavLink>
              <nav>
                  <span>{`what's crakin ${localStorage.getItem('FirstName')}  ${localStorage.getItem('LastName')}`}!</span><Link className='signup' to={'/ClientsignOut'}>Sign out</Link>
                </nav>
            </div>
         </div> 
      ) 
    } else {
        return ( 
        <div className="header"> 
            <div className="bounds">
                <NavLink to='/' className="header--logo">Sale</NavLink>
                    <nav>
                    <Link className="signin" to={'/ClientSignIn'}>Sign In</Link>
                    <Link className="signup" to={'/ClientSignUp'}>Sign Up</Link>
                    </nav>
            </div>
        </div>
      )
    }
    
}



export default Header;