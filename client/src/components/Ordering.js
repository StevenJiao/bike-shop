import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system'
import dayjs from 'dayjs';
import { Alert, Button, Card, CardContent, Collapse, FormControl, Grid, IconButton, TextField } from '@mui/material';
import OrderSummary from './OrderSummary';
import DateTimeSelect from './DateTimeSelect';
import BikeMenuSelect from './BikeMenuSelect';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function Order() {
    // for all item data from database for menu item select
    const [itemData, setData] = useState([]);
    // customer name
    const[customerName, setCustomerName] = useState('');
    // order date input
    const [orderDate, setOrderDate] = useState(dayjs());
    // selected bike item from select menu dropdown
    const [selectedMenuItem, setSelectedMenuItem] = useState({ name: '', price: '' });
    // quantity of selected item
    const [selectedQty, setSelectedQty] = useState(0);
    // for setting summary items (item, quantitity, subtotal)
    const [summaryItems, setSummaryitems] = useState([]);
    // grabbing context for populating the admin's name from login
    const { context } = useStateContext();
    // used for error messages
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [errorType, setErrorType] = useState('error');

    const navigate = useNavigate();
    
    // take summary items and grab the total cost 
    const total = summaryItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // first we make db connection to get all bike item data stored
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.itemAll)
            .get()
            .then(res => {
                setData(res.data);
            })
            .catch(err =>{ 
                if (err.response.status === 401) navigate('/');
                else console.log(err);
            });
    }, [navigate]);

    const placeOrder = e => {
        e.preventDefault();
        // error checking for placing an order
        if (!customerName) {
            setErrorType('error');
            setErrorMsg('Customer name must be filled.');
            setOpen(true);
            return;
        }

        // build our payload for the server to accept
        let payload = {
            id: `${orderDate.format()}-${customerName}`,
            adminName: context.admin_name,
            customerName: customerName,
            orderDate: orderDate.format(),
            totalPrice: total,
            orderitems: summaryItems.reduce((acc, item) => {
                acc[item.name] = item.quantity
                return acc
            }, {})
        };

        // send the payload to the server
        createAPIEndpoint(ENDPOINTS.orderCreate)
            .post(payload)
            .then(() => {
                setErrorType('success');
                setErrorMsg('Order successfully created.');
                setOpen(true);

                // reset the form
                setCustomerName('');
                setOrderDate(dayjs());
                setSelectedMenuItem({ name: '', price: '' });
                setSummaryitems([]);
                setSelectedQty(0);
            })
            .catch(err => console.log(err));
    }

    const handleMenuItemChange = (event) => {
        const selectedValue = event.target.value;
        const selectedMenuItemObject = itemData.find((item) => item.name === selectedValue);
        setSelectedMenuItem(selectedMenuItemObject);
    };

    const addItem = (e) => {
        e.preventDefault();

        // error checking for adding an item
        if(!selectedMenuItem || !selectedMenuItem.name) {
            setErrorType('error');
            setErrorMsg('Item must be selected.');
            setOpen(true);
            return;
        }
        
        let item = {}
        item.name = selectedMenuItem.name;
        item.price = selectedMenuItem.price;
        item.quantity = selectedQty;
        setSummaryitems([...summaryItems, item]);
    };
    
    return (
        <Grid container spacing={2}>
            <Grid xs={4} item>
                <Card sx={{ width: "400"}}>
                    <CardContent sx={{textAlign: 'center'}}>
                        <Box sx={{
                            '& .MuiTextField-root': {
                                margin: 1.5,
                                width: "90%"
                                }
                            }}
                        >
                            <form id="order_form" noValidate autoComplete="off" onSubmit={placeOrder}>
                                <TextField
                                    name='customer_name'
                                    label='customer name'
                                    value={customerName}
                                    onChange={(e) => {setCustomerName(e.target.value)}}
                                >
                                </TextField>
                                <DateTimeSelect
                                    name="order_date"
                                    value={orderDate} 
                                    onChange={(newValue) => {setOrderDate(newValue)}}
                                ></DateTimeSelect>
                                <Button 
                                    type="submit" 
                                    variant='contained' 
                                    sx={{ width: "50%", mt: 3 }}
                                >
                                    Place Order
                                </Button>
                            </form>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={4} item>
                <Card sx={{ width: "400"}}>
                    <CardContent sx={{textAlign: 'center'}}>
                            <form noValidate autoComplete="off" onSubmit={addItem}>
                                <FormControl >
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <BikeMenuSelect
                                                id="item_name"
                                                name="item_name"
                                                value={selectedMenuItem.name}
                                                onChange={handleMenuItemChange}
                                                data={itemData}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField 
                                                id="item_qty"
                                                name="item_qty"
                                                label='Qty'
                                                value={selectedQty}
                                                type="number"
                                                onChange={(e) => setSelectedQty(e.target.value)}
                                                inputProps={{ 
                                                    inputMode: 'numeric', 
                                                    pattern: '[0-9]*' 
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button 
                                                type="submit" 
                                                variant='contained' 
                                                sx={{ width: "50%", mt: 3 }}
                                            >
                                                Add Item
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </form>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={4} item>
                <OrderSummary
                    items={summaryItems}
                    total={total}
                />
            </Grid>
            <Grid xs={12} item display="flex" justifyContent="center" alignItems="center">
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            severity={errorType}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {errorMsg}
                        </Alert>
                    </Collapse>
                </Box>
            </Grid>
        </Grid>
    )
}
