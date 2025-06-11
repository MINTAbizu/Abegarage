import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Button,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert
} from '@mui/material';
import { format } from 'date-fns';

const OrderDetail = () => {
    const { order_id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchOrderDetails();
    }, [order_id]);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/${order_id}`);
            setOrder(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching order details');
            setLoading(false);
        }
    };

    const handleStatusUpdate = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/orders/${order_id}/status`, {
                status: parseInt(newStatus)
            });
            setSuccessMessage('Order status updated successfully');
            fetchOrderDetails();
            setStatusDialogOpen(false);
        } catch (err) {
            setError('Error updating order status');
        }
    };

    const handleCompletionUpdate = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/orders/${order_id}/completion`, {
                completion_date: completionDate
            });
            setSuccessMessage('Order completion date updated successfully');
            fetchOrderDetails();
            setCompletionDialogOpen(false);
        } catch (err) {
            setError('Error updating completion date');
        }
    };

    const handleServiceCompletion = async (service_id, completed) => {
        try {
            await axios.patch(`http://localhost:5000/api/orders/${order_id}/services/${service_id}/completion`, {
                completed: completed ? 1 : 0
            });
            setSuccessMessage('Service status updated successfully');
            fetchOrderDetails();
        } catch (err) {
            setError('Error updating service status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 1: return 'primary';
            case 2: return 'info';
            case 3: return 'warning';
            case 4: return 'success';
            case 5: return 'error';
            default: return 'default';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 1: return 'New';
            case 2: return 'In Progress';
            case 3: return 'Pending';
            case 4: return 'Completed';
            case 5: return 'Cancelled';
            default: return 'Unknown';
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!order) return <Typography>Order not found</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
                    {successMessage}
                </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Order Details</Typography>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/orders')}
                >
                    Back to Orders
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Order Information</Typography>
                        <Typography><strong>Order ID:</strong> {order.order_hash}</Typography>
                        <Typography><strong>Order Date:</strong> {format(new Date(order.order_date), 'MMM dd, yyyy HH:mm')}</Typography>
                        <Typography><strong>Status:</strong> 
                            <Chip
                                label={getStatusLabel(order.order_status)}
                                color={getStatusColor(order.order_status)}
                                size="small"
                                sx={{ ml: 1 }}
                            />
                        </Typography>
                        <Typography><strong>Total Price:</strong> ${order.order_total_price}</Typography>
                        <Typography><strong>Estimated Completion:</strong> {format(new Date(order.estimated_completion_date), 'MMM dd, yyyy')}</Typography>
                        {order.completion_date && (
                            <Typography><strong>Actual Completion:</strong> {format(new Date(order.completion_date), 'MMM dd, yyyy')}</Typography>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Customer Information</Typography>
                        <Typography><strong>Name:</strong> {order.customer_first_name} {order.customer_last_name}</Typography>
                        <Typography><strong>Vehicle:</strong> {order.vehicle_plate_number}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Services</Typography>
                        <List>
                            {order.services.split(',').map((service, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={service} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Notes</Typography>
                        <Typography><strong>Additional Requests:</strong> {order.additional_request || 'None'}</Typography>
                        <Typography><strong>Internal Notes:</strong> {order.notes_for_internal_use || 'None'}</Typography>
                        <Typography><strong>Customer Notes:</strong> {order.notes_for_customer || 'None'}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setStatusDialogOpen(true)}
                >
                    Update Status
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setCompletionDialogOpen(true)}
                >
                    Update Completion
                </Button>
            </Box>

            {/* Status Update Dialog */}
            <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
                <DialogTitle>Update Order Status</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={newStatus}
                            label="Status"
                            onChange={(e) => setNewStatus(e.target.value)}
                        >
                            <MenuItem value="1">New</MenuItem>
                            <MenuItem value="2">In Progress</MenuItem>
                            <MenuItem value="3">Pending</MenuItem>
                            <MenuItem value="4">Completed</MenuItem>
                            <MenuItem value="5">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleStatusUpdate} variant="contained">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Completion Update Dialog */}
            <Dialog open={completionDialogOpen} onClose={() => setCompletionDialogOpen(false)}>
                <DialogTitle>Update Completion Date</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        label="Completion Date"
                        value={completionDate}
                        onChange={(e) => setCompletionDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCompletionDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCompletionUpdate} variant="contained">Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderDetail; 