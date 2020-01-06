import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import DatePicker from 'react-date-picker';
import AppNavbar from './AppNavbar';
import ReactNextPaging from "react-next-paging";
import { DropDownList } from '@progress/kendo-react-dropdowns';
import Select from "react-select";

class DepartmentEdit extends Component {

  emptyItem = {
    name: '',
    managers: [],
	selectedManager:''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
	  isLoading: false,
	  selectedManager: "",
	  managerList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async componentDidMount() {
	  
	if (this.props.match.params.id !== 'new') {
      const dep = await (await fetch(`/DepartmentController/departments/${this.props.match.params.id}`)).json();
      this.setState({item: dep});
	  
    }
	   this.setState({managerList:await (await fetch(`/EmployeeController/allEmployees`)).json()})
	   
	this.emptyItem.managers =await (await fetch(`/EmployeeController/allEmployees`)).json();
	
  }
  
  onDropdownSelected(event) {
	    
	alert("onDropdownSelected", event.target);
	
    //here you will see the current selected value of the select input
}

  handleChange(event) {
	 const valueSelected = document.getElementById('manager');
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
	
	
	if(!item.name) {
		alert("Department name is Required.");
	} else if(item.name.length <= 2 ) {
		alert("Department nameshould be more than 2 characters.");
	}  else {	
		var url = '/DepartmentController/departments';
		
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
		this.props.history.push('/departments');
	}
  }

  render() {
	const {item, managers} = this.state;
    const title = <h2>{item.id ? 'Edit Department' : 'Add Department'}</h2>;
	
	
    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Department Name</Label>
            <Input type="text" name="name" id="name"  onChange={this.handleChange}/>
          </FormGroup>
		  
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/departments">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(DepartmentEdit);