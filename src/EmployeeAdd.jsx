import React, { Component } from 'react';

class EmployeeAdd extends Component {
    state = {
        name: '',
        title: '',
        email: '',
        extension: '',
        dateHired: '',
        currentlyEmployed: true
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        const newValue = name === 'currentlyEmployed' ? event.target.checked : value;
        this.setState({ [name]: newValue });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onEmployeeAdd({
            name: this.state.name,
            title: this.state.title,
            email: this.state.email,
            extension: this.state.extension,
            dateHired: this.state.dateHired,
            currentlyEmployed: this.state.currentlyEmployed
        });
        this.setState({ 
            name: '', 
            title: '', 
            email: '', 
            extension: '', 
            dateHired: '',
            currentlyEmployed: true
        }); // Reset form fields
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    placeholder="Email"
                />
                <input
                    type="text"
                    name="extension"
                    value={this.state.extension}
                    onChange={this.handleInputChange}
                    placeholder="Extension"
                />
                <input
                    type="date"
                    name="dateHired"
                    value={this.state.dateHired}
                    onChange={this.handleInputChange}
                    placeholder="Date Hired"
                />
                <label>
                    Currently Employed:
                    <input
                        type="checkbox"
                        name="currentlyEmployed"
                        checked={this.state.currentlyEmployed}
                        onChange={this.handleInputChange}
                    />
                </label>
                <button type="submit">Add Employee</button>
            </form>
        );
    }
}

export default EmployeeAdd;
