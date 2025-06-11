import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    Alert,
    CircularProgress
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';

const CreateOrder = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [formData, setFormData] = useState({
        employee_id: 1, // This should come from the logged-in user
        order_total_price: '',
        estimated_completion_date: new Date(),
        additional_request: '',
        notes_for_internal_use: '',
        notes_for_customer: ''
    });

    useEffect(() => {
        fetchCustomers();
        fetchServices();
    }, []);

    useEffect(() => {
        if (selectedCustomer) {
            fetchCustomerVehicles(selectedCustomer.customer_id);
        }
    }, [selectedCustomer]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data.data);
        } catch (err) {
            setError('Error fetching customers');
        }
    };

    const fetchCustomerVehicles = async (customerId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/customers/${customerId}/vehicles`);
            setVehicles(response.data.data);
        } catch (err) {
            setError('Error fetching customer vehicles');
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/services');
            setServices(response.data.data);
        } catch (err) {
            setError('Error fetching services');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const orderData = {
                ...formData,
                customer_id: selectedCustomer.customer_id,
                vehicle_id: selectedVehicle.vehicle_id,
                services: selectedServices.map(service => ({
                    service_id: service.service_id
                }))
            };

            await axios.post('http://localhost:5000/api/orders', orderData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/orders');
            }, 2000);
        } catch (err) {
            setError('Error creating order');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Create New Order</Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Order created successfully!</Alert>}

            <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={customers}
                                getOptionLabel={(option) => `${option.customer_first_name} ${option.customer_last_name}`}
                                value={selectedCustomer}
                                onChange={(event, newValue) => setSelectedCustomer(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Customer"
                                        required
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={vehicles}
                                getOptionLabel={(option) => option.vehicle_plate_number}
                                value={selectedVehicle}
                                onChange={(event, newValue) => setSelectedVehicle(newValue)}
                                disabled={!selectedCustomer}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Vehicle"
                                        required
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={services}
                                getOptionLabel={(option) => option.service_name}
                                value={selectedServices}
                                onChange={(event, newValue) => setSelectedServices(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Services"
                                        required
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Total Price"
                                name="order_total_price"
                                type="number"
                                value={formData.order_total_price}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Estimated Completion Date"
                                    value={formData.estimated_completion_date}
                                    onChange={(newValue) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            estimated_completion_date: newValue
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth required />}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Additional Requests"
                                name="additional_request"
                                multiline
                                rows={2}
                                value={formData.additional_request}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Internal Notes"
                                name="notes_for_internal_use"
                                multiline
                                rows={2}
                                value={formData.notes_for_internal_use}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Customer Notes"
                                name="notes_for_customer"
                                multiline
                                rows={2}
                                value={formData.notes_for_customer}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/orders')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    Create Order
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateOrder; 