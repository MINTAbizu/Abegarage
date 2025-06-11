// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//     Box,
//     Container,
//     Typography,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Chip,
//     CircularProgress
// } from '@mui/material';

// const Orders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/services/orders');
//             setOrders(response.data);
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to fetch orders');
//             setLoading(false);
//             console.error('Error fetching orders:', err);
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'pending':
//                 return 'warning';
//             case 'in_progress':
//                 return 'info';
//             case 'completed':
//                 return 'success';
//             case 'cancelled':
//                 return 'error';
//             default:
//                 return 'default';
//         }
//     };

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//                 <Typography color="error">{error}</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Service Orders
//             </Typography>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Order ID</TableCell>
//                             <TableCell>Date</TableCell>
//                             <TableCell>Customer</TableCell>
//                             <TableCell>Contact</TableCell>
//                             <TableCell>Vehicle</TableCell>
//                             <TableCell>Services</TableCell>
//                             <TableCell>Status</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {orders.map((order) => (
//                             <TableRow key={order.order_id}>
//                                 <TableCell>{order.order_id}</TableCell>
//                                 <TableCell>
//                                     {new Date(order.order_date).toLocaleDateString()}
//                                 </TableCell>
//                                 <TableCell>
//                                     {order.first_name} {order.last_name}
//                                 </TableCell>
//                                 <TableCell>
//                                     {order.phone_number}
//                                     <br />
//                                     {order.email}
//                                 </TableCell>
//                                 <TableCell>
//                                     {order.vehicle_brand} {order.vehicle_model}
//                                     <br />
//                                     {order.vehicle_number}
//                                 </TableCell>
//                                 <TableCell>{order.services}</TableCell>
//                                 <TableCell>
//                                     <Chip
//                                         label={order.order_status}
//                                         color={getStatusColor(order.order_status)}
//                                         size="small"
//                                     />
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default Orders; 