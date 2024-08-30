import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop';
import Loading from '../components/Loading';
import CustomToastContainer from '../components/CustomToastContainer';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const MyStaffPage = () => {
    const [loading , setloading] = useState(true);
    const [employees, setEmployees] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filterData, setFilterData] = useState({
        name: '',
        surname: '',
        email:'',
        regNo: '',
        identityNo: '',
        
    });
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        surname: '',
        email: '',
        registrationNumber: '',
        identityNumber: '',
        employmentType: '0'
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const filterEmployees = () => {
        setFilterData({
            name: '',
            surname: '',
            regNo: '',
            email: '',
            identityNo: ''
        });
        setTimeout(() => setShowFilterModal(true), 0);
    };
    const addEmployees = () => {
        setNewEmployee({
            name: '',
            surname: '',
            email: '',
            registrationNumber: '',
            identityNumber: '',
            employmentType:'',
        });
        setTimeout(() => setShowAddModal(true), 0);
    };

    const employmentTypeLabels = {
        'FullTime': 'Full Time',
        'PartTime': 'Part Time',
        'Intern': 'Internship'
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            setloading(true);
            try {
                const token = sessionStorage.getItem('token');
                const employerId = localStorage.getItem('employerId');
                if (employerId) {
                    const response = await axios.get(`https://localhost:7053/api/Employee/getEmployeesByEmployer/${employerId}`,{
                        headers:{
                            'Authorization':`Bearer ${token}`
                        }
                    });
                    setEmployees(response.data);
                }
            } catch (error) {
                console.error('An error occurred while fetching employees:', error);
            }
            finally{
                setloading(false);
            }
        };
        fetchEmployees();
    }, []);

    const filteredData = employees.map(({id,employerId,userId, ...rest}) => rest)

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Employees');
        XLSX.writeFile(wb, 'employees.xlsx');
        toast.success('Data exported to Excel successfully!');
    };

    if(loading){
        return <Loading />;
    }

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
            const token = sessionStorage.getItem('token');
            const employerId = localStorage.getItem('employerId');
            if (employerId && token) {
                const response = await axios.get('https://localhost:7053/api/Employee/getFilteredEmployees', {
                    params: { ...filterData, employerId },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
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
            const token = sessionStorage.getItem('token');
            const employerId = localStorage.getItem('employerId');
            if (employerId) {
                await axios.post('https://localhost:7053/api/Employee/addEmployee', { ...newEmployee, employerId } ,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                toast.success('Employee added successfully!');
                setShowAddModal(false);
                const response = await axios.get(`https://localhost:7053/api/Employee/getEmployeesByEmployer/${employerId}`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                setEmployees(response.data);
            }
        } catch (error) {
            console.error('An error occurred while adding an employee:', error);
            toast.error('An error occurred while adding an employee.');
        }
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowEditModal(true);
    };

    const handleUpdateEmployee = async (event) => {
        event.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            await axios.patch(`https://localhost:7053/api/Employee/updateEmployee/${selectedEmployee.id}`, {
                ...selectedEmployee,  
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            });
            toast.success('Employee updated successfully!');
            setShowEditModal(false);
            const employerId = localStorage.getItem('employerId');
            if (employerId) {
                const response = await axios.get(`https://localhost:7053/api/Employee/getEmployeesByEmployer/${employerId}`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                setEmployees(response.data);
            }
        } catch (error) {
            console.error('An error occurred while updating an employee:', error);
            toast.error('An error occurred while updating an employee.');
        }
    };

    const handleDeleteEmployee = async () => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`https://localhost:7053/api/Employee/deleteEmployee/${selectedEmployee.id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            toast.success('Employee deleted successfully!');
            setShowDeleteModal(false);
            const employerId = localStorage.getItem('employerId');
            if (employerId) {
                const response = await axios.get(`https://localhost:7053/api/Employee/getEmployeesByEmployer/${employerId}`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                setEmployees(response.data);
            }
        } catch (error) {
            console.error('An error occurred while deleting an employee:', error);
            toast.error('An error occurred while deleting an employee.');
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
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div
                className={`flex-1 flex flex-col bg-gray-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                onClick={handleContentClick}
            >
                <Navbar isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebarToggle} />
                <div className="p-6">
                    <div className="flex justify-between mb-6 items-center">
                        <h1 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">My Staff</h1>
                        <div className='flex space-x-4'>
                            <button
                                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition-colors"
                                onClick={addEmployees}
                            >
                                Add Employee
                            </button>
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                                onClick={filterEmployees}
                            >
                                Filter Employees
                            </button>
                            <button onClick={exportToExcel} className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition-colors">
                                Export to Excel
                            </button> 
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {employees.map(employee => (
                            <div key={employee.id} className="bg-white shadow-lg rounded-lg p-6 relative transition-transform duration-300 hover:scale-102">
                                <div className="absolute top-4 right-4 flex space-x-3">
                                    <button
                                        onClick={() => handleEditEmployee(employee)}
                                        className="text-blue-500 hover:text-blue-700 transition-colors"
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => confirmDeleteEmployee(employee)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold mb-2">{employee.name} {employee.surname}</h2>
                                <p className="text-gray-700 mb-1">Email: <b>{employee.email}</b></p>
                                <p className="text-gray-700 mb-1">Registration Number: <b>{employee.registrationNumber}</b></p>
                                <p className="text-gray-700">Identity Number: <b>{employee.identityNumber}</b></p>
                                <p className="text-gray-700">Employment Type: <b>{employmentTypeLabels[employee.employmentType]}</b></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for Filtering */}
            {showFilterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">Filter Employees</h2>
                        <form onSubmit={handleFilterSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={filterData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="surname"
                                value={filterData.surname}
                                onChange={handleInputChange}
                                placeholder="Surname"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="email"
                                value={filterData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="regNo"
                                value={filterData.regNo}
                                onChange={handleInputChange}
                                placeholder="Registration Number"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="identityNo"
                                value={filterData.identityNo}
                                onChange={handleInputChange}
                                placeholder="Identity Number"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowFilterModal(false)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Adding Employee */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
                        <form onSubmit={handleAddEmployee} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={newEmployee.name}
                                onChange={handleNewEmployeeChange}
                                placeholder="Name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                name="surname"
                                value={newEmployee.surname}
                                onChange={handleNewEmployeeChange}
                                placeholder="Surname"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={newEmployee.email}
                                onChange={handleNewEmployeeChange}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                name="registrationNumber"
                                value={newEmployee.registrationNumber}
                                onChange={handleNewEmployeeChange}
                                placeholder="Registration Number"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                name="identityNumber"
                                value={newEmployee.identityNumber}
                                onChange={handleNewEmployeeChange}
                                placeholder="Identity Number"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <select
                                name="employmentType"
                                value={newEmployee.employmentType}
                                onChange={handleNewEmployeeChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
                                >
                                <option value="">Select</option> 
                                <option value="0">Full Time</option>
                                <option value="1">Part Time</option>
                                <option value="2">Internship</option>
                            </select>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Add Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Editing Employee */}
            {showEditModal && selectedEmployee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
                        <form onSubmit={handleUpdateEmployee} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={selectedEmployee.name}
                                onChange={handleSelectedEmployeeChange}
                                placeholder="Name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                name="surname"
                                value={selectedEmployee.surname}
                                onChange={handleSelectedEmployeeChange}
                                placeholder="Surname"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={selectedEmployee.email}
                                onChange={handleSelectedEmployeeChange}
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                name="registrationNumber"
                                value={selectedEmployee.registrationNumber}
                                onChange={handleSelectedEmployeeChange}
                                placeholder="Registration Number"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                name="identityNumber"
                                value={selectedEmployee.identityNumber}
                                onChange={handleSelectedEmployeeChange}
                                placeholder="Identity Number"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Update Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Deleting Employee */}
            {showDeleteModal && selectedEmployee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete {selectedEmployee.name} {selectedEmployee.surname}?</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteEmployee}
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ScrollToTop />
            <CustomToastContainer />
        </div>
    );
};

export default MyStaffPage;
