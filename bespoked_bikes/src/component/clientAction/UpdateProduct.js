import React from 'react';
import  axios  from "axios";





export default class UpdateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        name: '', 
        manufacturer: '',
        style: '',
        purchasePrice: '',
        salePrice: '',
        qtyOnHand: '',
        commissionPercentage: '',
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
            url: `http://localhost:5000/api/product/${params.id}`,
            auth: {
              username: window.localStorage.getItem('Email'),
              password: window.localStorage.getItem('Password')
           },
            data: {
                name: this.state.name,
                manufacturer: this.state.manufacturer,
                style: this.state.style,
                purchasePrice: this.state.purchasePrice,
                salePrice: this.state.salePrice,
                qtyOnHand: this.state.qtyOnHand,
                commissionPercentage: this.state.commissionPercentage
                }
        }).then(response => { 
          if (response.status === 204) {
            alert(" product successfully updated!");
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
        var { product } = this.state;
        evt.preventDefault();
        history.push(`/product/${product.id}`)
    }
    componentDidMount() {
        const {match: { params }} = this.props;
        axios
      .get(`http://localhost:5000/api/product/${params.id}`)
      .then(results => {
          this.setState({
              product: results.data,
              client: results.data.client
          });
      });

    }

    render() {
      
   const errors = this.state.errors; 
   const errorList = errors.map((error) =>
     <li key={error.toString()}>{error}</li>);
     const { product, client } = this.state;

      return ( 
       <div>
       <hr />
       <div className="bounds product--detail">
         <h1>Update product</h1>
         <div className="validation-errors">
             <ul>{errorList}</ul>
           </div>
         <div>
           <form onSubmit={ this.handleSubmit}>
             <div className="grid-66">
               <div className="product--header">
                 <h4 className="product--label">product</h4>
                 <div><input id="name" name="name" type="text" className="input-name product--name--input" placeholder="product name..." defaultValue={product.name}  onChange={e => this.change(e)} /></div>
                 <p>By {client.firstName} {client.lastName}</p>
               </div>
               <div className="product--description">
                 <div><textarea id="description" name="description"  placeholder={this.state.product.description} onChange={e => this.change(e)}/> </div>
               </div>
             </div>
             <div className="grid-25 grid-right">
               <div className="product--stats">
                 <ul className="product--stats--list">
                   <li className="product--stats--list--item">
                     <h4>style</h4>
                     <div><input id="style" name="style" type="text" className="product--time--input" placeholder="Hours" defaultValue={this.state.product.style} onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="product--stats--list--item">
                     <h4>purchase price</h4>
                     <div><textarea id="purchasePrice" name="purchasePrice" placeholder={this.state.product.purchasePrice}  onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="product--stats--list--item">
                     <h4>sale price</h4>
                     <div><textarea id="salePrice" name="salePrice" placeholder={this.state.product.salePrice}  onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="product--stats--list--item">
                     <h4>Qty On Hand</h4>
                     <div><textarea id="qtyOnHand" name="qtyOnHand" placeholder={this.state.product.qtyOnHand}  onChange={e => this.change(e)} /></div>
                   </li>
                   <li className="product--stats--list--item">
                     <h4>Commission percentage</h4>
                     <div><textarea id="commissionPercentage" name="commissionPercentage" placeholder={this.state.product.commissionPercentage}  onChange={e => this.change(e)} /></div>
                   </li>
                 </ul>
               </div>
             </div>
             <div className="grid-100 pad-bottom"><button className="button" type="submit">Update product</button><button className="button button-secondary" onClick={this.handleCancel}>Cancel</button></div>
           </form>
         </div>
       </div>
     </div> 
    );
   } 
  }