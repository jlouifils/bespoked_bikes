import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


export default class Sales extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Sales: [] 
      };
    }   
  
    componentDidMount() {
      axios.get('http://localhost:5000/api/Sales')
      .then(results => { 
        this.setState({ 
         Sales: results.data
      })
      })
     }
     
     render() {
       const{Sales} = this.state;   
       return ( 
        <div className="bounds"> 
            {Sales.map(Sale => <div key={Sale.id} className="grid-33">
                <NavLink to={`/Sales/${Sale.id}`} className="Sale--module Sale--link" > 
                    <h4 className="Sale--label">Sale</h4>  
                    <h3 className="Sale--title">{Sale.title}</h3>  
                 </NavLink> 
         </div>
     )} 
         
<div className="grid-33">
        <NavLink to='/Sales/create' className="Sale--module Sale--add--module" >
            <h3 className="Sale--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" // to help me understand better about vectors https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Sale</h3>
        </NavLink>
     </div>
</div> 
         
       )
    } 
}