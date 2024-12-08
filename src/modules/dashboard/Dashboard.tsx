import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Copyright from './internals/components/Copyright';

import dashboard_img from '../../assets/picture/dashboard.png';

export const Dashboard = React.memo(() => {
  return (
    <Box sx={{ width: '100%' }} className="flex flex-col p-5 h-full">
      <Typography component="h2" variant="h6">
        Overview
      </Typography>
      <Box className="flex grow mt-5 w-full">
        <img
          src={dashboard_img}
          alt="dashboard_img"
          className="h-auto"
          style={{
            objectFit: 'contain',
            transition: 'opacity 0.3s',
          }}
        />
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
});

// import React, { useState } from 'react';
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   MenuItem,
//   Select,
//   Card,
//   CardContent,
//   Avatar,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
// } from '@mui/material';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// const mockStats = {
//   salesByCountry: [
//     { country: 'Germany', sales: 120 },
//     { country: 'USA', sales: 150 },
//     { country: 'Japan', sales: 100 },
//   ],
//   salesByProduct: [
//     { product: 'Battery', sales: 200 },
//     { product: 'Pad', sales: 170 },
//   ],
//   salesOverTime: [
//     { time: 'Jan', sales: 300 },
//     { time: 'Feb', sales: 280 },
//     { time: 'Mar', sales: 350 },
//   ],
// };

// const mockRecentActivities = [
//   {
//     id: 1,
//     type: 'Shipment',
//     detail: 'Shipped 10 products to Germany.',
//     timestamp: '2 hours ago',
//   },
//   {
//     id: 2,
//     type: 'Dispatch',
//     detail: 'Dispatched 15 products to USA.',
//     timestamp: '1 day ago',
//   },
//   {
//     id: 3,
//     type: 'Shipment',
//     detail: 'Shipped 20 products to Japan.',
//     timestamp: '3 days ago',
//   },
// ];

// export const Dashboard = React.memo(() => {
//   const [filter, setFilter] = useState('country'); // Default filter for stats

//   const getFilteredData = () => {
//     switch (filter) {
//       case 'country':
//         return mockStats.salesByCountry;
//       case 'product':
//         return mockStats.salesByProduct;
//       case 'time':
//         return mockStats.salesOverTime;
//       default:
//         return [];
//     }
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Dashboard
//       </Typography>

//       {/* Statistics Section */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           Sales & Shipment Statistics
//         </Typography>
//         <Select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           sx={{ mb: 2 }}
//         >
//           <MenuItem value="country">By Country</MenuItem>
//           <MenuItem value="product">By Product</MenuItem>
//           <MenuItem value="time">Over Time</MenuItem>
//         </Select>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={getFilteredData()}>
//             <XAxis dataKey={filter === 'time' ? 'time' : filter} />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="sales" fill="#1976d2" />
//           </BarChart>
//         </ResponsiveContainer>
//       </Paper>

//       {/* Recent Activities Section */}
//       <Paper sx={{ p: 3, mb: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           Recent Activities
//         </Typography>
//         <List>
//           {mockRecentActivities.map((activity) => (
//             <ListItem key={activity.id}>
//               <ListItemAvatar>
//                 <Avatar>{activity.type === 'Shipment' ? 'S' : 'D'}</Avatar>
//               </ListItemAvatar>
//               <ListItemText
//                 primary={activity.detail}
//                 secondary={activity.timestamp}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>

//       {/* Quick Actions Section */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Quick Register</Typography>
//               <Typography variant="body2" color="textSecondary" gutterBottom>
//                 Add new shipment or dispatch records.
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 // component={Link}
//                 href="/register"
//               >
//                 Go to Register
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Quick Search</Typography>
//               <Typography variant="body2" color="textSecondary" gutterBottom>
//                 Find shipment or dispatch records.
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 // component={Link}
//                 href="/search"
//               >
//                 Go to Search
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Quick Stats</Typography>
//               <Typography variant="body2" color="textSecondary" gutterBottom>
//                 Analyze your shipment data.
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 // component={Link}
//                 href="/stats"
//               >
//                 Go to Stats
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* User Information Section */}
//       <Paper sx={{ p: 3, mt: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           User Information
//         </Typography>
//         <Typography variant="body1">Welcome back, John Doe!</Typography>
//         <Typography variant="body2" color="textSecondary">
//           You have 3 pending notifications and 2 recent searches.
//         </Typography>
//         <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
//           View Settings
//         </Button>
//       </Paper>
//     </Box>
//   );
// });
