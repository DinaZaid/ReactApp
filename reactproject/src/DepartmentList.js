import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';



class DepartmentList extends Component {

  constructor(props) {
    super(props);
    this.state = {deps: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/DepartmentController/allDepartments')
      .then(response => response.json())
      .then(data => this.setState({deps: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/DepartmentController/deleteDepartment/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedDeps = [...this.state.deps].filter(i => i.id !== id);
      this.setState({deps: updatedDeps});
    });
  }

  render() {
    const {deps, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const departmentsList = deps.map(dep => {
      return <tr key={dep.id}>
        <td style={{whiteSpace: 'nowrap'}}>{dep.id}</td>
		<td style={{whiteSpace: 'nowrap'}}>{dep.name}</td>
		<td style={{whiteSpace: 'nowrap'}}>{dep.manager.firstName}</td>
		
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/departments/" + dep.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(dep.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/departments/new">Add Department</Button>
          </div>
          <h3>Employees List</h3>
          <Table className="mt-4">
            <thead>
            <tr>
			  <th width="5%">ID</th>
              <th width="10%">Department Name</th>
			  <th width="10%">Manager Name</th>
            </tr>
            </thead>
            <tbody>
            {departmentsList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default DepartmentList;