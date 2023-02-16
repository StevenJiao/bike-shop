import React, { useContext } from 'react'
import useStateContext, { stateContext } from '../hooks/useStateContext'
import Center from './Center'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'

export default function Order() {
    const { context, setContext } = useStateContext()
    
    return (
        <Card sx={{ width: "400"}}>
            <CardContent sx={{textAlign: 'center'}}>
                <form>
                    <TextField
                        name='customer_name'
                        label='customer name'>
                    </TextField>
                    <br></br>
                    <TextField
                        name='customer_name'
                        label='customer name'>
                    </TextField>
                </form>
            </CardContent>
        </Card>
    )
}
