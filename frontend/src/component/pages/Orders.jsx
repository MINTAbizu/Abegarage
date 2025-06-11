import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'

function Orders() {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/api/orders')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch orders')
                return res.json()
            })
            .then(data => setOrders(data.data || []))
            .catch(err => setError(err.message))
    }, [])

    // Helper for status badge
    const statusBadge = (status) => {
        if (status === 'Completed') return <span className="badge bg-success">Completed</span>
        if (status === 'In progress') return <span className="badge bg-warning text-dark">In progress</span>
        return <span className="badge bg-secondary">{status}</span>
    }

    return (
        <div>
            <h2>Orders <span style={{color: 'red'}}>&mdash;</span></h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Table striped bordered hover>
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
                                {order.customer_name}<br/>
                                {order.customer_email}<br/>
                                {order.customer_phone}
                            </td>
                            <td>
                                {order.vehicle_model}<br/>
                                {order.vehicle_year} {order.vehicle_plate}
                            </td>
                            <td>{order.order_date ? new Date(order.order_date).toLocaleDateString() : ''}</td>
                            <td>{order.received_by}</td>
                            <td>{statusBadge(order.order_status)}</td>
                            <td>
                                <Button variant="link" size="sm">
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
    )
}

export default Orders