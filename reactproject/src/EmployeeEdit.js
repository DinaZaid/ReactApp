import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from 'react-date-picker';
import AppNavbar from './AppNavbar';
import ReactNextPaging from "react-next-paging";

class EmployeeEdit extends Component {

  emptyItem = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
	salary: '',
	hireDate: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const employee = await (await fetch(`/EmployeeController/employees/${this.props.match.params.id}`)).json();
      this.setState({item: employee});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
	
	var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	var phoneRegex = /^[0-9-]*$/;
	
	if(!item.firstName) {
		alert("First Name is Required.");
	} else if(item.firstName.length <= 2 ) {
		alert("First Name should be more than 2 characters.");
	} else if(!item.lastName) {
		alert("Last Name is Required.");
	} else if(item.lastName.length <= 2) {
		alert("Last Name should be more than 2 characters.");
	} else if(!emailRegex.test(item.email)) {
		alert("Please enter a valid email format.");
	} else if(!parseFloat(item.salary) || item.salary <= 0) {
		alert("Please enter a valid salary.");
	} else if(!phoneRegex.test(item.phoneNumber)) {
		alert("Phone Number should contains numbers and dashs only.");
	} else {	
		var url = '/EmployeeController/employees';
		
		if(item.id){
			url = url + '/' + item.id;
		}
		
		await fetch(url, {
		  method: (item.id) ? 'PUT' : 'POST',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(item),
		});
		this.props.history.push('/employees');
	}
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Employee' : 'Add Employee'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
		  <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" value={item.lastName || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" name="email" id="email" value={item.email || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input type="text" name="phoneNumber" id="phoneNumber" value={item.phoneNumber || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
		  <FormGroup>
            <Label for="salary">Salary</Label>
            <Input type="text" name="salary" id="salary" value={item.salary || ''}
                   onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/employees">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(EmployeeEdit);