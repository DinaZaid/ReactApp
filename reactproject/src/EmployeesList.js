import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class EmployeesList extends Component {

  constructor(props) {
    super(props);
    this.state = {employees: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/EmployeeController/employees')
      .then(response => response.json())
      .then(data => this.setState({employees: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/EmployeeController/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedEmployees = [...this.state.employees].filter(i => i.id !== id);
      this.setState({employees: updatedEmployees});
    });
  }

  render() {
    const {employees, isLoading} = this.state;
	const totalEmployees = employees.length;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const employeesList = employees.map(employee => {
      return <tr key={employee.id}>
        <td style={{whiteSpace: 'nowrap'}}>{employee.id}</td>
		<td style={{whiteSpace: 'nowrap'}}>{employee.firstName}</td>
		<td style={{whiteSpace: 'nowrap'}}>{employee.lastName}</td>
		<td style={{whiteSpace: 'nowrap'}}>{employee.email}</td>
		<td style={{whiteSpace: 'nowrap'}}>{employee.phoneNumber}</td>
		<td style={{whiteSpace: 'nowrap'}}>{employee.hireDate}</td>
		<td style={{whiteSpace: 'nowrap'}}>{employee.salary}</td>
		<td style={{whiteSpace: 'nowrap'}}>{employee.managerId}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/employees/" + employee.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(employee.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/employees/new">Add Employee</Button>
          </div>
          <h3>Employees List</h3>
          <Table className="mt-4">
            <thead>
            <tr>
			  <th width="5%">ID</th>
              <th width="10%">First Name</th>
              <th width="10%">Last Name</th>
              <th width="20%">Email</th>
			  <th width="10%">Phone Number</th>
			  <th width="20%">Hire Date</th>
			  <th width="5%">Salary</th>
			  <th width="10%">Manager Name</th>
            </tr>
            </thead>
            <tbody>
            {employeesList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default EmployeesList;