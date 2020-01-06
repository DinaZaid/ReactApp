import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
		<div class="container">
          <div class="button button-2"><Link to="/employees">Manage Employees</Link></div>
          <div class="button button-2"><Link to="/departments">View Departments</Link></div>
		  </div>
		  </Container>
      </div>
    );
  }
}

export default Home;