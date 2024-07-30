import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

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

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://localhost:7053/api/Employee/getEmployeesByEmployer/19');
                setEmployees(response.data);
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

    const handleFilterSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('https://localhost:7053/api/Employee/getFilteredEmployees', { params: filterData });
            setEmployees(response.data);
            setShowFilterModal(false);
        } catch (error) {
            console.error('An error occurred while filtering employees:', error);
        }
    };

    const handleAddEmployee = async (event) => {
        event.preventDefault();
        try {
            await axios.post('https://localhost:7053/api/Employee/addEmployee', newEmployee);
            alert('Employee added successfully!');
            setShowAddModal(false);
            const response = await axios.get('https://localhost:7053/api/Employee/getEmployeesByEmployer/19');
            setEmployees(response.data);
        } catch (error) {
            console.error('An error occurred while adding an employee:', error);
            alert('An error occurred while adding an employee.');
        }
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
                    <div className="flex justify-end mb-4">
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
                    <div className="grid grid-cols-1 gap-4">
                        {employees.map(employee => (
                            <div key={employee.id} className="bg-white shadow-md rounded-lg p-4">
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
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                                <div className="mt-6">
                                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                                        Apply Filters
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                                        onClick={() => setShowFilterModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showAddModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                                        type="email"
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
                                <div className="mt-6">
                                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                                        Add Employee
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyStaffPage;
