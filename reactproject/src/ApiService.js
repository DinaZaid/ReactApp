import axios from 'axios'

const BASE_API_URL = 'http://localhost:8080'
const EMPLOYEE_API_URL = BASE_API_URL + '/EmployeeController/employees'
const DEPARTMENT_API_URL = BASE_API_URL + '/DepartmentController'

class ApiService {

    retrieveAllEmployees() {
        //console.log('executed service retrieveAllEmployees')
        return axios.get(EMPLOYEE_API_URL);
    }

    retrieveEmployee(id) {
        //console.log('executed service retrieveEmployee')
        return axios.get(EMPLOYEE_API_URL + '/' + id);
    }

    deleteEmployee(id) {
        //console.log('executed service deleteEmployee')
        return axios.delete(EMPLOYEE_API_URL + '/' + id);
    }

    updateEmployee(id, employee) {
        //console.log('executed service')
        return axios.put(EMPLOYEE_API_URL + '/' + id, employee);
    }

    createEmployee(employee) {
        //console.log('executed service')
        return axios.post(EMPLOYEE_API_URL, employee);
    }
}

export default new ApiService()