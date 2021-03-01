import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationContainer from "./navigation/navigation-container";
import About from "./pages/about";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      pageNum: 1,
      totalPages: 0
    }
  }

  componentDidMount() {
    this.changePage(this.state.pageNum);
  }

  changePage(pageNum) {
    const url = `https://reqres.in/api/users?page=${pageNum}`;

    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({ users: res.data, pageNum: pageNum, totalPages: res.total_pages }))
  }
  


  render() {
    const { users } = this.state;

    return (
      <div className="container">
        
        <Router>
          <div>
            <NavigationContainer />

            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/about" componet={About} />
            </Switch>

          </div>
        </Router>

        <div className="jumbotron">
          <h1 className="display-4">Users of reqres! Join Us!</h1>
        </div>
        
        <div className="users">
          {users.map((user) => (
            <div className="card" key={user.id}>
              <img src={user.avatar} className="card-img-top" alt={`${user.email} avatar`} />
              <div className="card-body">
                <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                <p className="card-text">{user.email}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-group" role="group" aria-label="Basic example">
          <button 
            type="button" 
            disabled={this.state.pageNum === 1 ? true : false}
            className="btn btn-secondary" 
            onClick={() => this.changePage(this.state.pageNum - 1)}
          >Prev</button>

          <button 
            type="button" 
            className="btn btn-secondary" 
          >
            {this.state.pageNum}
          </button>

          <button 
            type="button" 
            className="btn btn-secondary"
            disabled={this.state.pageNum >= this.state.totalPages ? true : false} 
            onClick={() => this.changePage(this.state.pageNum + 1)}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
  
}

export default App;
