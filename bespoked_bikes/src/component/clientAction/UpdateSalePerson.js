import React from 'react';
import  axios  from "axios";





export default class UpdateSalePerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        firstName: '', 
        lastName: '',
        address: '',
        phone: '',
        startDate: '',
        terminationDate: '',
        manager: '',
        errors: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    change = (event) => {
        this.setState({
        [event.target.name]: event.target.value
        })
    }
    handleSubmit = (e) => {
      const {match: { params }} = this.props;
      e.preventDefault();
        axios ({
            method: 'put',
            url: `http://localhost:5000/api/saleperson/${params.id}`,
            auth: {
              username: window.localStorage.getItem('Email'),
              password: window.localStorage.getItem('Password')
           },
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastNameName,
                manufacturer: this.state.manufacturer,
                address: this.state.address,
                phone: this.state.phone,
                startDate: this.state.startDate,
                terminationDate: this.state.terminationDate,
                Manager: this.state.Manager
                }
        }).then(response => { 
          if (response.status === 204) {
            alert(" saleperson successfully updated!");
            this.props.history.push("/");
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          console.log("CATCH =", err.response.data.errors);
          this.setState({
            errors: err.response.data.errors
          });
        });
    };

    handleCancel = (evt) => {
        var { history } = this.props;
        var { saleperson } = this.state;
        evt.preventDefault();
        history.push(`/saleperson/${saleperson.id}`)
    }
    componentDidMount() {
        const {match: { params }} = this.props;
        axios
      .get(`http://localhost:5000/api/saleperson/${params.id}`)
      .then(results => {
          this.setState({
              saleperson: results.data,
              client: results.data.client
          });
      });

    }

    render() {
      
   const errors = this.state.errors; 
   const errorList = errors.map((error) =>
     <li key={error.toString()}>{error}</li>);
     const { saleperson, client } = this.state;

      return ( 
       <div>
       <hr />
       <div className="bounds saleperson--detail">
         <h1>Update saleperson</h1>
         <div className="validation-errors">
             <ul>{errorList}</ul>
           </div>
         <div>
           <form onSubmit={ this.handleSubmit}>
             <div className="grid-66">
               <div className="saleperson--header">
                 <h4 className="saleperson--label">saleperson</h4>
                 <div><input id="firstName" name="firstName" type="text" className="input-firstName saleperson--firstName--input" placeholder="saleperson firstName..." defaultValue={saleperson.firstName}  onChange={e => this.change(e)} /></div>
                 <p>By {client.firstName} {client.lastName}</p>
               </div>
               <div className="saleperson--lastName">
                 <div><textarea id="lastName" name="lastName"  placeholder={this.state.saleperson.lastName} onChange={e => this.change(e)}/> </div>
               </div>
             </div>
             <div className="grid-25 grid-right">
               <div className="saleperson--stats">
                 <ul className="saleperson--stats--list">
                   <li className="saleperson--stats--list--item">
                     <h4>address</h4>
                     <div><input id="address" name="address" type="text" className="saleperson--time--input" placeholder="Hours" defaultValue={this.state.saleperson.address} onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="saleperson--stats--list--item">
                     <h4>phone</h4>
                     <div><textarea id="phone" name="phone" placeholder={this.state.saleperson.phone}  onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="saleperson--stats--list--item">
                     <h4>start Date</h4>
                     <div><textarea id="startDate" name="startDate" placeholder={this.state.saleperson.startDate}  onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="saleperson--stats--list--item">
                     <h4>Termination Date</h4>
                     <div><textarea id="terminationDate" name="terminationDate" placeholder={this.state.saleperson.terminationDate}  onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="saleperson--stats--list--item">
                     <h4>Manager</h4>
                     <div><textarea id="Manager" name="Manager" placeholder={this.state.saleperson.Manager}  onChange={e => this.change(e)} /></div>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="grid-100 pad-bottom"><button className="button" type="submit">Update saleperson</button><button className="button button-secondary" onClick={this.handleCancel}>Cancel</button></div>
           </form>
         </div>
       </div>
     </div> 
    );
   } 
  }