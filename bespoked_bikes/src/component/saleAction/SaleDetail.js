import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; 
import ReactMarkdown from "react-markdown"

export default class SaleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      Sale: [],
      Client: []
    };
    this.handleDelete = this.handleDelete.bind(this); 
  }

  // got this info from erik from the slack that he post about Route Params https://scotch.io/Sales/using-react-router-4/route-params
  componentDidMount() {
    const {
      match: { params }
    } = this.props;  
  
    axios
      .get(`http://localhost:5000/api/Sales/${params.id}`)
      .then(results => {

        this.setState({

          Sale: results.data,
          client: results.data.client
        });

      });
  }

  //this method will be for deleting a Sale
  handleDelete() {
    const {
      match: { params },
      history
    } = this.props;

    axios
      .delete(`http://localhost:5000/api/Sales/${params.id}`, {
        auth: {
          username: window.localStorage.getItem("Email"),
          password: window.localStorage.getItem("Password")
        }
      })
      .then(() => {
        history.push("/");
      });
  }

  render() {
    const { Sale, client } = this.state;
    const isLoggedIn = localStorage.getItem("IsLoggedIn");
    const clientId = JSON.parse(localStorage.getItem("clientId"));
    
    return (//JSX inside
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                {(isLoggedIn && client.id === clientId) ? ( 
                  <span>
                    <NavLink
                      to={`/Sales/${Sale._id}/update`}
                      className="button"
                    >
                      Update Sale
                    </NavLink>
                    <NavLink
                      to={"#"}
                      className="button"
                      onClick={this.handleDelete}
                    >
                      Delete Sale
                    </NavLink>
                  </span>
                ) : null} 
              </span>
              <NavLink
                to="/"
                className="button button-secondary"
                href="index.html"
              >
                Return to List
              </NavLink>
            </div>
          </div>
        </div>
        <div className="bounds Sale--detail">
          <div className="Sale--header">
            <h4 className="Sale--label">Sale</h4>
            <h3 className="Sale--title">{Sale.title}</h3>
            <p>
              This Sale was created by: {client.firstName} {client.lastName}
            </p>
            <div className="Sale--description">
               <ReactMarkdown source={Sale.description} /> 
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="Sale--stats">
              <ul className="Sale--stats--list">
                <li className="Sale--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{Sale.estimatedTime} hours</h3>
                </li>
                <li className="Sale--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                   <ReactMarkdown source={` * ${Sale.materialsNeeded}`} /> 
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}