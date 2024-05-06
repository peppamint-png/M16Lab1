import React from 'react';
import EmployeeFilter from './EmployeeFilter.jsx';
import EmployeeAdd from './EmployeeAdd.jsx';
import { Modal, Button } from 'react-bootstrap';  // Ensure React Bootstrap is correctly imported

class EmployeeRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible
        }));
    }

    render() {
        const { employee, onDelete } = this.props;
        return (
            <tr>
                <td>{employee.name}</td>
                <td>{employee.extension}</td>
                <td>{employee.email}</td>
                <td>{employee.title}</td>
                <td>{employee.dateHired}</td>
                <td>{employee.currentlyEmployed ? "Yes" : "No"}</td>
                <td>
                    <Button variant="danger" onClick={this.toggleModal}>Delete</Button>
                    <Modal show={this.state.modalVisible} onHide={this.toggleModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Employee?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.toggleModal}>Cancel</Button>
                            <Button variant="primary" onClick={() => {
                                onDelete(employee._id);
                                this.toggleModal();
                            }}>Yes</Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        );
    }
}

function EmployeeTable({ employees, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Extension</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Date Hired</th>
                    <th>Currently Employed?</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <EmployeeRow key={employee._id} employee={employee} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
}

class EmployeeList extends React.Component {
    state = {
        employees: [] // Initialize as an empty array, to be populated from the API
    };

    componentDidMount() {
        this.fetchEmployees();
    }

    fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employees');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const employees = await response.json();
            this.setState({ employees });
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        }
    };

    handleDelete = (id) => {
        // Ensure id is a string and is in the correct format
        if (typeof id !== 'string' || !id.match(/^[0-9a-fA-F]{24}$/)) {
            console.error("Invalid ID format or type:", id);
            return;
        }
    
        fetch(`/api/employees/${id}`, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                this.setState(prevState => ({
                    employees: prevState.employees.filter(employee => employee._id !== id)
                }));
            } else {
                response.text().then(text => console.error('Failed to delete the employee:', text));
            }
        }).catch(error => console.error('Error:', error));
    };    

    handleAddEmployee = (employee) => {
        // Implementation for adding an employee
        fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        }).then(response => response.json())
        .then(data => {
            this.setState(prevState => ({
                employees: [...prevState.employees, data.employee]
            }));
        }).catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <div>
                <h1>Employee Management Application</h1>
                <EmployeeFilter />
                <EmployeeAdd onEmployeeAdd={this.handleAddEmployee} />
                <EmployeeTable employees={this.state.employees} onDelete={this.handleDelete} />
            </div>
        );
    }
}

export default EmployeeList;
