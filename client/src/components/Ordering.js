import React, { useContext } from 'react';
import useStateContext, { stateContext } from '../hooks/useStateContext';
import { Box } from '@mui/system'
import Center from './Center';
import dayjs from 'dayjs';
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import useForm from '../hooks/useForm'
import OrderSummary from './OrderSummary';
import DateTimeSelect from './DateTimeSelect';
import BikeMenuSelect from './BikeMenuSelect';

const getFreshModel = () => ({
    item_name: '',
    date_time: dayjs()
});

export default function Order() {
    const { context, setContext } = useStateContext();

    const placeOrder = e => {
        // e.preventDefault();
    }

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
                                    value={values.date_time} 
                                    onChange={handleInputChange}
                                    name="date_time"
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
                                            />
                                            {/* <InputLabel id="item_select_label">Item Name</InputLabel>
                                            <Select
                                                labelId="item_select_label"
                                                id="item_name"
                                                name="item_name"
                                                label='Item Name'
                                                onChange={handleInputChange}
                                                value={values.item_name}
                                                sx={{width:"100%"}}
                                            >
                                            </Select> */}
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField 
                                                id="item_qty"
                                                name="item_qty"
                                                label='Qty'
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
