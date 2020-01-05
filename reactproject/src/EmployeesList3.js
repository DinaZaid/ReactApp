import React, { Component } from 'react';
import './App.css';
import "react-table/react-table.css";
import ReactTable from 'react-table';

 
 
 class EmployeesList extends Component{
	 constructor(props){
		 super(props);
		 this.state={
			 employees:[]
		 }
	 }
	 
	 
	 componentDidMount(){
		 const url = "/EmployeeController/employees";
		 fetch(url,{ 
		 method:"GET"
		 }).then(response=>response.json()).then(employees=>{
			 this.setState({employees : employees})
		 })
		 }
	 render(){
		 const columns=[
		 {
			 Header : "User Id",
			 accessor:"id"
		 },
		 {
			 Header : "First Name",
			 accessor: "firstName"
		 },
		 {
			 Header : "Last Name",
			 accessor: "lastName"
		 }
		 ]
		  return(
		  <ReactTable
		  columns={columns}
		  >
		  
		  </ReactTable>
		  );
	 }
 }
 export default EmployeesList;