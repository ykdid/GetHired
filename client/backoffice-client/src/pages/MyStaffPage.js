import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop';

const MyStaffPage = () => {
    const [employees, setEmployees] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filterData, setFilterData] = useState({
        name: '',
        surname: '',
        regNo: '',
        identityNo: ''
    });
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        surname: '',
        email: '',
        registrationNumber: '',
        identityNumber: ''
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const employerId = localStorage.getItem('employerId');
                if (employerId) {
                    const response = await axios.get(`https://localhost:7053/api/Employee/getEmployeesByEmployer/${employerId}`);
                    setEmployees(response.data);
                }
            } catch (error) {
                console.error('An error occurred while fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilterData({ ...filterData, [name]: value });
    };

    const handleNewEmployeeChange = (event) => {
        const { name, value } = event.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSelectedEmployeeChange = (event) => {
        const { name, value } = event.target;
        setSelectedEmployee({ ...selectedEmployee, [name]: value });
    };

    const handleFilterSubmit = async (event) => {
        event.preventDefault();
        try {
            const employerId = localStorage.getItem('employerId');
            if (employerId) {
                const response = await axios.get('https://localhost:7053/api/Employee/getFilteredEmployees', { params: { ...filterData, employerId } });
                setEmployees(response.data);
                setShowFilterModal(false);
            }
        } catch (error) {
            console.error('An error occurred while filtering employees:', error);
        }
    };

    const handleAddEmployee = async (event) => {
        event.preventDefault();
        try {
            const employerId = localStorage.getItem('employerId');
            if (employerId) {
                await axios.post('https://localhost:7053/api/Employee/addEmployee', { ...newEmployee, employerId });
                alert('Employee added successfully!');
                setShowAddModal(false);
                const response = await axios.get(`https://localhost:7053/api/Employee/getEmployeesByEmployer/${employerId}`);
                setEmployees(response.data);
            }
        } catch (error) {
            console.error('An error occurred while adding an employee:', error);
            alert('An error occurred while adding an employee.');
        }
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowEditModal(true);
    };

    const handleUpdateEmployee = async (event) => {
        event.preventDefault();
        try {
            await axios.patch(`https://localhost:7053/api/Employee/updateEmployee/${selectedEmployee.id}`, selectedEmployee);
            alert('Employee updated successfully!');
            setShowEditModal(false);
            const employerId = localStorage.getItem('employerId');
            if (employerId) {
                const response = await axios.get(`https://localhost:7053/api/Employee/getEmployeesByEmployer/${employerId}`);
                setEmployees(response.data);
            }
        } catch (error) {
            console.error('An error occurred while updating an employee:', error);
            alert('An error occurred while updating an employee.');
        }
    };

    const handleDeleteEmployee = async () => {
        try {
            await axios.delete(`https://localhost:7053/api/Employee/deleteEmployee/${selectedEmployee.id}`);
            alert('Employee deleted successfully!');
            setShowDeleteModal(false);
            const employerId = localStorage.getItem('employerId');
            if (employerId) {
                const response = await axios.get(`https://localhost:7053/api/Employee/getEmployeesByEmployer/${employerId}`);
                setEmployees(response.data);
            }
        } catch (error) {
            console.error('An error occurred while deleting an employee:', error);
            alert('An error occurred while deleting an employee.');
        }
    };

    const confirmDeleteEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleContentClick = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div
                className={`flex-1 flex flex-col bg-gray-100 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                onClick={handleContentClick}
            >
                <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="p-6">
                    <div className="flex justify-between mb-4 items-center">
                        <div className='flex-1 text-center'>
                            <h1><strong>My Staff</strong></h1>
                        </div>
                        <div className='flex space-x-2'>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                                onClick={() => setShowFilterModal(true)}
                            >
                                Filter Employees
                            </button>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded"
                                onClick={() => setShowAddModal(true)}
                            >
                                Add Employee
                            </button>
                        </div>
                       
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {employees.map(employee => (
                            <div key={employee.id} className="z-10 bg-white shadow-md rounded-lg p-4 relative transition-transform duration-300 ease-in-out transform hover:scale-102">
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEditEmployee(employee)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => confirmDeleteEmployee(employee)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                                <p><strong>Name:</strong> {employee.name}</p>
                                <p><strong>Surname:</strong> {employee.surname}</p>
                                <p><strong>Email:</strong> {employee.email}</p>
                                <p><strong>Job Type:</strong> {employee.jobType}</p>
                                <p><strong>Registration Number:</strong> {employee.registrationNumber}</p>
                                <p><strong>Identity Number:</strong> {employee.identityNumber}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {showFilterModal && (
                    <div className="fixed p-20 inset-0 flex items-start justify-center bg-black bg-opacity-50 z-40">
                        <div className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl mb-4">Filter Employees</h2>
                            <form onSubmit={handleFilterSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={filterData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Surname</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={filterData.surname}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Registration Number</label>
                                    <input
                                        type="text"
                                        name="regNo"
                                        value={filterData.regNo}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Identity Number</label>
                                    <input
                                        type="text"
                                        name="identityNo"
                                        value={filterData.identityNo}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                                        onClick={() => setShowFilterModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {showAddModal && (
                    <div className="fixed p-20 inset-0 flex items-start justify-center bg-black bg-opacity-50 z-40">
                        <div className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl mb-4">Add Employee</h2>
                            <form onSubmit={handleAddEmployee}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newEmployee.name}
                                        onChange={handleNewEmployeeChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Surname</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={newEmployee.surname}
                                        onChange={handleNewEmployeeChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={newEmployee.email}
                                        onChange={handleNewEmployeeChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Registration Number</label>
                                    <input
                                        type="text"
                                        name="registrationNumber"
                                        value={newEmployee.registrationNumber}
                                        onChange={handleNewEmployeeChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Identity Number</label>
                                    <input
                                        type="text"
                                        name="identityNumber"
                                        value={newEmployee.identityNumber}
                                        onChange={handleNewEmployeeChange}
                                        className="mt-1 p-2 border rounded w-full"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-2 px-4 rounded"
                                    >
                                        Add Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {showEditModal && (
                    <div className="fixed p-20 inset-0 flex items-start justify-center bg-black bg-opacity-50 z-40">
                        <div className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl mb-4">Edit Employee</h2>
                            {selectedEmployee && (
                                <form onSubmit={handleUpdateEmployee}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={selectedEmployee.name}
                                            onChange={handleSelectedEmployeeChange}
                                            className="mt-1 p-2 border rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Surname</label>
                                        <input
                                            type="text"
                                            name="surname"
                                            value={selectedEmployee.surname}
                                            onChange={handleSelectedEmployeeChange}
                                            className="mt-1 p-2 border rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={selectedEmployee.email}
                                            onChange={handleSelectedEmployeeChange}
                                            className="mt-1 p-2 border rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Registration Number</label>
                                        <input
                                            type="text"
                                            name="registrationNumber"
                                            value={selectedEmployee.registrationNumber}
                                            onChange={handleSelectedEmployeeChange}
                                            className="mt-1 p-2 border rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Identity Number</label>
                                        <input
                                            type="text"
                                            name="identityNumber"
                                            value={selectedEmployee.identityNumber}
                                            onChange={handleSelectedEmployeeChange}
                                            className="mt-1 p-2 border rounded w-full"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white py-2 px-4 rounded"
                                        >
                                            Update Employee
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl mb-4">Confirm Delete</h2>
                            <p>Are you sure you want to delete this employee?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 text-white py-2 px-4 rounded"
                                    onClick={handleDeleteEmployee}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ScrollToTop />
        </div>
    );
};

export default MyStaffPage;
