import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Analytics() {
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.orderAll)
            .get()
            .then(res => {
                setOrderData(res.data);
            })
            .catch(err => {
                console.log(err);
                navigate('/');
            });
    }, []);
    
    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Chart orderData={orderData} />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    }}
                >
                    <Deposits orderData={orderData} />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders orderData={orderData} />
                </Paper>
            </Grid>
        </Grid>
    )
}
    