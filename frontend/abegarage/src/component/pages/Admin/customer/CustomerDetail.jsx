import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (!id) {
                setError('Customer ID is missing');
                setLoading(false);
                return;
            }

            try {
                // First fetch the specific customer
                const customerResponse = await axios.get(`http://localhost:5000/api/customers/customer/${id}`);
                const customerData = customerResponse.data.data;
                
                if (!customerData) {
                    throw new Error('Customer not found');
                }
                
                setCustomer(customerData);

                // Then fetch vehicles for this specific customer
                const vehiclesResponse = await axios.get(`http://localhost:5000/api/customers/customer/${id}/vehicles`);
                setVehicles(vehiclesResponse.data.data);

                // Fetch available services
                const servicesResponse = await axios.get('http://localhost:5000/api/services/services');
                setServices(servicesResponse.data.data);

            } catch (err) {
                console.error('Error fetching customer data:', err);
                if (err.response) {
                    setError(`Error: ${err.response.status} - ${err.response.data.message || 'Failed to fetch customer data'}`);
                } else if (err.request) {
                    setError('No response from server. Please check your connection.');
                } else {
                    setError(err.message || 'Failed to fetch customer data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [id]);

    const handleServiceChange = (serviceId) => {
        setSelectedServices(prev => 
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const handleCreateOrder = async () => {
        if (selectedServices.length === 0) {
            setError('Please select at least one service');
            return;
        }

        try {
            setError('');
            setSuccess('');
            setLoading(true);

            // Create order with selected services
            const orderData = {
                customer_id: id,
                services: selectedServices.map(serviceId => ({ service_id: serviceId }))
            };

            const response = await axios.post(`http://localhost:5000/api/services/customer/${id}/services`, orderData);
            
            if (response.data.success) {
                setSuccess('Order created successfully!');
                // Clear selected services after successful order creation
                setSelectedServices([]);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create order. Please try again.');
        } finally {
            setLoading(false);
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

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning" role="alert">
                    Customer not found
                </div>
                <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex flex-column gap-4">
                {/* Customer Information Card */}
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                        <h2 className="mb-0">Customer Details</h2>
                        <Button variant="light" onClick={() => navigate(-1)}>Back</Button>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex flex-wrap gap-4">
                            <div className="flex-grow-1">
                                <div className="mb-3">
                                    <h5 className="text-muted mb-2">Name</h5>
                                    <p className="h4 mb-0">{customer.customer_first_name} {customer.customer_last_name}</p>
                                </div>
                                <div className="mb-3">
                                    <h5 className="text-muted mb-2">Email</h5>
                                    <p className="h5 mb-0">{customer.customer_email}</p>
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <div className="mb-3">
                                    <h5 className="text-muted mb-2">Phone</h5>
                                    <p className="h5 mb-0">{customer.customer_phone_number}</p>
                                </div>
                                <div className="mb-3">
                                    <h5 className="text-muted mb-2">Status</h5>
                                    <span className={`badge ${customer.active_customer_status === 1 ? 'bg-success' : 'bg-danger'} fs-6`}>
                                        {customer.active_customer_status === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Vehicles Card */}
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">Registered Vehicles</h3>
                        <Button 
                            variant="light" 
                            onClick={() => navigate(`/vehicle-registration/${id}`)}
                        >
                            Add New Vehicle
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        {vehicles.length === 0 ? (
                            <div className="alert alert-info">
                                No vehicles registered for this customer.
                            </div>
                        ) : (
                            <div className="d-flex flex-wrap gap-4">
                                {vehicles.map(vehicle => (
                                    <Card key={vehicle.vehicle_id} className="flex-grow-1" style={{ minWidth: '300px' }}>
                                        <Card.Body>
                                            <div className="d-flex flex-column gap-3">
                                                <div>
                                                    <h5 className="text-muted mb-2">Vehicle Details</h5>
                                                    <p className="h4 mb-0">{vehicle.vehicle_make} {vehicle.vehicle_model}</p>
                                                    <p className="text-muted mb-0">{vehicle.vehicle_year}</p>
                                                </div>
                                                <div className="d-flex flex-wrap gap-3">
                                                    <div>
                                                        <h6 className="text-muted mb-1">License Plate</h6>
                                                        <p className="mb-0">{vehicle.vehicle_tag}</p>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-muted mb-1">Type</h6>
                                                        <p className="mb-0">{vehicle.vehicle_type}</p>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-muted mb-1">Mileage</h6>
                                                        <p className="mb-0">{vehicle.vehicle_mileage}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-wrap gap-3">
                                                    <div>
                                                        <h6 className="text-muted mb-1">Serial Number</h6>
                                                        <p className="mb-0">{vehicle.vehicle_serial}</p>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-muted mb-1">Color</h6>
                                                        <p className="mb-0">{vehicle.vehicle_color}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Card.Body>
                </Card>

                {/* Services Card */}
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">Select Services</h3>
                        <Button 
                            variant="light" 
                            onClick={handleCreateOrder}
                            disabled={loading || selectedServices.length === 0}
                        >
                            {loading ? 'Creating Order...' : 'Create Order'}
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        
                        {success && (
                            <div className="alert alert-success" role="alert">
                                {success}
                            </div>
                        )}

                        <Form>
                            <div className="d-flex flex-wrap gap-4">
                                {services.map(service => (
                                    <div key={service.service_id} className="flex-grow-1" style={{ minWidth: '800px' }}>
                                        <Form.Check
                                            type="checkbox"
                                            id={`service-${service.service_id}`}
                                            label={
                                                <div>
                                                    <span className="h5 mb-0">{service.service_name}</span>
                                                    {service.service_description && (
                                                        <small className="text-muted d-block mt-1">
                                                            {service.service_description}
                                                        </small>
                                                    )}
                                                </div>
                                            }
                                            checked={selectedServices.includes(service.service_id)}
                                            onChange={() => handleServiceChange(service.service_id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CustomerDetail; 