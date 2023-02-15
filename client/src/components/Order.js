import React, { useContext } from 'react'
import useStateContext, { stateContext } from '../hooks/useStateContext'
import Center from './Center'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'

export default function Order() {
    const { context, setContext } = useStateContext()
    
    return (
        <Center>
            <Card sx={{ width: "400"}}>
                <CardContent sx={{textAlign: 'center'}}>
                    <Typography 
                        variant='h3' 
                        sx={{ marginY: 3 }}
                    >
                        Order Page
                    </Typography>
                    <form>
                        <TextField
                            name='customer_name'
                            label='customer name'>
                        </TextField>
                    </form>
                </CardContent>
            </Card>
        </Center>
    )
}
