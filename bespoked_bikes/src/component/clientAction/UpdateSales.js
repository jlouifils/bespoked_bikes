import React from 'react';
import  axios  from "axios";





export default class UpdateSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        sale: [],
        client: [],
        product: '', 
        salPerson: '',
        customer: '',
        saleDate: '',
        errors: []
        };
        // found out how to use this.handleSubmit/Cancel on stackoverflow https://stackoverflow.com/questions/41507337/in-redux-when-do-i-need-to-use-bindthis
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
// found a website that help better use of axios https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
        axios ({
            method: 'put',
            url: `http://localhost:5000/api/Sales/${params.id}`,
            auth: {
              username: window.localStorage.getItem('Email'),
              password: window.localStorage.getItem('Password')
           },
            data: {
                product: this.state.product,
                salPerson: this.state.salePerson,
                customer: this.state.customer,
                saleDate: this.state.saleDate
                }
        }).then(response => { 
          if (response.status === 204) {
            alert(" sale successfully updated!");
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
        var { sale } = this.state;
        evt.preventDefault();
        history.push(`/Sales/${sale.id}`)
    }
    componentDidMount() {
        const {match: { params }} = this.props;
        axios
      .get(`http://localhost:5000/api/Sales/${params.id}`)
      .then(results => {
          this.setState({
              sale: results.data,
              client: results.data.client
          });
      });

    }

    render() {
      
   const errors = this.state.errors; 
   const errorList = errors.map((error) =>
     <li key={error.toString()}>{error}</li>);
     const { sale, client } = this.state;

      return ( 
       <div>
       <hr />
       <div className="bounds sale--detail">
         <h1>Update sale</h1>
         <div className="validation-errors">
             <ul>{errorList}</ul>
           </div>
         <div>
           <form onSubmit={ this.handleSubmit}>
             <div className="grid-66">
               <div className="sale--header">
                 <h4 className="sale--label">sale</h4>
                 <div><input id="title" name="title" type="text" className="input-title sale--title--input" placeholder="sale title..." defaultValue={sale.title}  onChange={e => this.change(e)} /></div>
                 <p>By {client.firstName} {client.lastName}</p>
               </div>
               <div className="sale--description">
                 <div><textarea id="description" name="description"  placeholder={this.state.sale.description} onChange={e => this.change(e)}/> </div>
               </div>
             </div>
             <div className="grid-25 grid-right">
               <div className="sale--stats">
                 <ul className="sale--stats--list">
                   <li className="sale--stats--list--item">
                     <h4>customer</h4>
                     <div><input id="customer" name="customer" type="text" className="sale--time--input" placeholder="Hours" defaultValue={this.state.sale.customer} onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="sale--stats--list--item">
                     <h4>sale Date</h4>
                     <div><textarea id="saleDate" name="saleDate" placeholder={this.state.sale.saleDate}  onChange={e => this.change(e)} /></div>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="grid-100 pad-bottom"><button className="button" type="submit">Update sale</button><button className="button button-secondary" onClick={this.handleCancel}>Cancel</button></div>
           </form>
         </div>
       </div>
     </div> 
    );
   } 
  }