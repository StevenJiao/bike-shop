import React, { useContext, useState, useEffect } from 'react';
import useStateContext, { stateContext } from '../hooks/useStateContext';
import { Box } from '@mui/system'
import Center from './Center';
import dayjs from 'dayjs';
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useForm from '../hooks/useForm'
import OrderSummary from './OrderSummary';
import DateTimeSelect from './DateTimeSelect';
import BikeMenuSelect from './BikeMenuSelect';
import { createAPIEndpoint, ENDPOINTS } from '../api';

const getFreshModel = () => ({
    customer_name: '',
    order_date: dayjs()
});

export default function Order() {
    const [data, setData] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.itemAll)
            .get()
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const placeOrder = e => {
        // e.preventDefault();
        createAPIEndpoint(ENDPOINTS.order)
            .post(values)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }

    let addedItems = [];
    const addItem = e => {
        e.preventDefault();
    }

    const {        
        values,
        // setValues,
        errors,
        setErrors,
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
                                    label='customer name'>
                                </TextField>
                                <DateTimeSelect
                                    name="order_date"
                                    value={values.order_date} 
                                    onChange={handleInputChange}
                                ></DateTimeSelect>
                                {console.log(values)}
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
                                                value={values.item_name}
                                                onChange={handleInputChange}
                                                data={data}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField 
                                                id="item_qty"
                                                name="item_qty"
                                                label='Qty'
                                                value={values.qty}
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
                <OrderSummary></OrderSummary>
            </Grid>
        </Grid>
    )
}
