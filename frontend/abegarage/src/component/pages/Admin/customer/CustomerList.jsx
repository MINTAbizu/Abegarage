import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CustomerList() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch customers
    const fetchCustomers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/customers/customerlist');
            setCustomers(response.data.data);
            setFilteredCustomers(response.data.data);
        } catch (err) {
            setError('Failed to fetch customers');
            console.error('Error fetching customers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredCustomers(customers);
            return;
        }

        const searchTermLower = searchTerm.toLowerCase();
        const filtered = customers.filter(customer => 
            customer.customer_first_name.toLowerCase().includes(searchTermLower) ||
            customer.customer_last_name.toLowerCase().includes(searchTermLower) ||
            customer.customer_email.toLowerCase().includes(searchTermLower) ||
            customer.customer_phone_number.includes(searchTerm)
        );
        setFilteredCustomers(filtered);
    }, [searchTerm, customers]);

    // Delete customer
    const handleDelete = async (customerId) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/customers/customer/${customerId}`);
            // Refresh the list after deletion
            fetchCustomers();
        } catch (err) {
            setError('Failed to delete customer');
            console.error('Error deleting customer:', err);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Customer List</h2>
                    <Button 
                        variant="light" 
                        onClick={fetchCustomers}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Refreshing...
                            </>
                        ) : (
                            'Refresh'
                        )}
                    </Button>
                </div>
                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Search by name, email, or phone..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear
                                </Button>
                            )}
                        </InputGroup>
                    </div>

                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : filteredCustomers.length === 0 ? (
                        <div className="alert alert-info">
                            {searchTerm ? 'No customers found matching your search.' : 'No customers found.'}
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map(customer => (
                                        <tr key={customer.customer_id}>
                                            <td>{customer.customer_id}</td>
                                            <td>{`${customer.customer_first_name} ${customer.customer_last_name}`}</td>
                                            <td>{customer.customer_email}</td>
                                            <td>{customer.customer_phone_number}</td>
                                            <td>
                                                <span className={`badge ${customer.active_customer_status === 1 ? 'bg-success' : 'bg-danger'}`}>
                                                    {customer.active_customer_status === 1 ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <Button
                                                        variant="info"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => navigate(`/customer/${customer.customer_id}`)}
                                                    >
                                                        View Details
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => window.location.href = `/vehicle-registration/${customer.customer_id}`}
                                                    >
                                                        Add Vehicle
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(customer.customer_id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomerList;