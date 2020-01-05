import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from "react-table";  

import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeesList from './EmployeesList';
import EmployeeEdit from './EmployeeEdit';
import DepartmentList from './DepartmentList';
import DepartmentEdit from './DepartmentEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/employees' exact={true} component={EmployeesList}/>
		  <Route path='/employees/:id' exact={true} component={EmployeeEdit}/>
		   <Route path='/departments' exact={true} component={DepartmentList}/>
		   <Route path='/departments/:id' exact={true} component={DepartmentEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
