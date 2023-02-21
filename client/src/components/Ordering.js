import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system'
import dayjs from 'dayjs';
import { Alert, Button, Card, CardContent, Collapse, FormControl, Grid, IconButton, TextField } from '@mui/material';
import useForm from '../hooks/useForm'
import OrderSummary from './OrderSummary';
import DateTimeSelect from './DateTimeSelect';
import BikeMenuSelect from './BikeMenuSelect';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const getFreshModel = () => ({
    customer_name: ''
});

export default function Order() {
    const [itemData, setData] = useState([]);
    const [orderDate, setOrderDate] = useState(dayjs());
    const [selectedMenuItem, setSelectedMenuItem] = useState({ name: '', price: '' });
    const [selectedQty, setSelectedQty] = useState(0);
    const [summaryItems, setSummaryitems] = useState([]);
    const { context } = useStateContext();
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    
    const total = summaryItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.itemAll)
            .get()
            .then(res => {
                setData(res.data);
            })
            .catch(err =>{ 
                console.log(err);
                navigate('/');
            });
    }, [navigate]);

    const placeOrder = e => {
        // e.preventDefault();
        if (!values.customer_name) {
            setErrorMsg('Customer name must be filled.');
            setOpen(true);
            return;
        }
        else if(!Number.isInteger(total)) {
            setErrorMsg('Quantity must be a number.');
            setOpen(true);
            return;
        }

        let payload = {
            id: `${orderDate.format()}-${values.customer_name}`,
            adminName: context.admin_name,
            customerName: values.customer_name,
            orderDate: orderDate.format(),
            totalPrice: total,
            orderitems: summaryItems.reduce((acc, item) => {
                acc[item.name] = item.quantity
                return acc
            }, {})
        };

        createAPIEndpoint(ENDPOINTS.orderCreate)
            .post(payload)
            .then(res => {
                setData(res.data);
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
        let item = {}
        item.name = selectedMenuItem.name;
        item.price = selectedMenuItem.price;
        item.quantity = selectedQty;
        setSummaryitems([...summaryItems, item]);
    };

    const {        
        values,
        // setValues,
        // errors,
        // setErrors,
        handleInputChange
    } = useForm(getFreshModel);
    
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
                            <form noValidate autoComplete="off" onSubmit={placeOrder}>
                                <TextField
                                    name='customer_name'
                                    label='customer name'
                                    value={values.customer_name}
                                    onChange={handleInputChange}
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
                                        <Grid item xs={9}>
                                            <BikeMenuSelect
                                                id="item_name"
                                                name="item_name"
                                                value={selectedMenuItem.name}
                                                onChange={handleMenuItemChange}
                                                data={itemData}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField 
                                                id="item_qty"
                                                name="item_qty"
                                                label='Qty'
                                                value={selectedQty}
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
                            severity='error'
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
