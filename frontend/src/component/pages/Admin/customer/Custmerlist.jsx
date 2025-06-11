import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'

function Customerlist() {
    const [customers, setCustomers] = useState([])
    const [error, setError] = useState(null)

    const getAllCustomers = async () => {
        const response = await fetch('http://localhost:5000/admin/customerlist')
        if (!response.ok) throw new Error('Failed to fetch customers')
        const data = await response.json()
        return data.data || []
    }

    useEffect(() => {
        getAllCustomers()
            .then(data => setCustomers(data))
            .catch(err => setError(err.message))
    }, [])

    // Delete customer handler
    const handleDelete = async (customer_id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;
        try {
            const response = await fetch(`http://localhost:5000/admin/customer/${customer_id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete customer');
            setCustomers(customers.filter(cust => cust.customer_id !== customer_id));
        } catch (err) {
            setError(err.message);
        }
    };

    // Edit customer handler (placeholder)
    const handleEdit = (customer_id) => {
        // You can navigate to an edit page or open a modal here
        alert(`Edit customer ${customer_id}`);
    };

    return (
        <div>
            <h1>Customer List</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(cust => (
                        <tr key={cust.customer_id}>
                            <td>{cust.customer_id}</td>
                            <td>{cust.customer_email}</td>
                            <td>{cust.customer_phone_number}</td>
                            <td>{cust.customer_first_name}</td>
                            <td>{cust.customer_last_name}</td>
                            <td>{cust.active_customer_status === 1 ? "active" : "inactive"}</td> 
                             <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => handleEdit(cust.customer_id)}
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(cust.customer_id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Customerlist