import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Card } from 'react-bootstrap';
import axios from 'axios';

function CustomerSearchResults() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('query');

        if (!searchTerm) {
            navigate('/customer-list');
            return;
        }

        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/admin/customerlist`);
                const allCustomers = response.data.data;
                
                // Filter customers based on search term
                const searchTermLower = searchTerm.toLowerCase();
                const filteredCustomers = allCustomers.filter(customer => 
                    customer.customer_first_name.toLowerCase().includes(searchTermLower) ||
                    customer.customer_last_name.toLowerCase().includes(searchTermLower) ||
                    customer.customer_email.toLowerCase().includes(searchTermLower) ||
                    customer.customer_phone_number.includes(searchTerm)
                );
                
                setCustomers(filteredCustomers);
            } catch (err) {
                setError('Failed to fetch search results');
                console.error('Error fetching search results:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [location.search, navigate]);

    const handleDelete = async (customerId) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/admin/customer/${customerId}`);
            // Remove the deleted customer from the list
            setCustomers(customers.filter(customer => customer.customer_id !== customerId));
        } catch (err) {
            setError('Failed to delete customer');
            console.error('Error deleting customer:', err);
        }
    };

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <Card className="shadow">
                <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">Search Results</h2>
                        <Button 
                            variant="light" 
                            onClick={() => navigate('/customer-list')}
                        >
                            Back to Customer List
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {customers.length === 0 ? (
                        <div className="alert alert-info">
                            No customers found matching your search criteria.
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
                                    {customers.map(customer => (
                                        <tr key={customer.customer_id}>
                                            <td>{customer.customer_id}</td>
                                            <td>
                                                <Button variant="link" className="p-0" onClick={() => navigate(`/customer/${customer.customer_id}`)}>
                                                    {`${customer.customer_first_name} ${customer.customer_last_name}`}
                                                </Button>
                                            </td>
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
                                                        variant="primary"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => navigate(`/vehicle-registration/${customer.customer_id}`)}
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
                </Card.Body>
            </Card>
        </div>
    );
}

export default CustomerSearchResults; 