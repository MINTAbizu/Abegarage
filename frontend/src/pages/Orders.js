import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/api/orders`);
                setOrders(response.data.data || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Helper for status badge
    const statusBadge = (status) => {
        if (status === 'Completed') return <span className="badge bg-success">Completed</span>;
        if (status === 'In progress') return <span className="badge bg-warning text-dark">In progress</span>;
        return <span className="badge bg-secondary">{status}</span>;
    };

    if (loading) {
        return (
            <div className="text-center p-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Orders <span style={{color: 'red'}}>&mdash;</span></h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Customer</th>
                        <th>Vehicle</th>
                        <th>Order Date</th>
                        <th>Received by</th>
                        <th>Order status</th>
                        <th>View/Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>
                                {order.customer_first_name} {order.customer_last_name}<br/>
                                {order.customer_email}<br/>
                                {order.customer_phone}
                            </td>
                            <td>
                                {order.vehicle_model}<br/>
                                {order.vehicle_year} {order.vehicle_plate_number}
                            </td>
                            <td>{order.order_date ? new Date(order.order_date).toLocaleDateString() : ''}</td>
                            <td>{order.employee_name}</td>
                            <td>{statusBadge(order.order_status)}</td>
                            <td>
                                <Button variant="link" size="sm" className="me-2">
                                    <i className="bi bi-eye"></i>
                                </Button>
                                <Button variant="link" size="sm">
                                    <i className="bi bi-pencil-square"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Orders; 