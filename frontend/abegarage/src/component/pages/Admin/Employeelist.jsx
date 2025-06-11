import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useAuth } from '../../../context/Contextprovider'

function Employeelist() {
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(null)

    const { employee } = useAuth()
    const token = employee?.employee_token

    const getAllEmployees = async (token) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // ...(token && { 'Authorization': `Bearer ${token}` })
            }
        }

        const response = await fetch('http://localhost:5000/api/employees/', requestOptions)
        if (!response.ok) throw new Error('Failed to fetch employees')
        return response.json()
    }

    useEffect(() => {
        if (!token) return
        getAllEmployees(token)
            .then(data => setEmployees(data))
            .catch(err => setError(err.message))
    }, [token])

    return (
        <div>
            <h1>Employee List</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Added Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.employee_id}>
                            <td>{emp.employee_id}</td>
                            <td>{emp.employee_first_name} {emp.employee_last_name}</td>
                            <td>{emp.employee_email}</td>
                            <td>{emp.company_role_name || emp.company_role_id}</td>
                            <td>{emp.added_date ? new Date(emp.added_date).toLocaleDateString() : ''}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
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

export default Employeelist