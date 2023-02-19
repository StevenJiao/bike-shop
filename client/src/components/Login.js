import React from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Center from './Center'
import useForm from '../hooks/useForm'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext, { stateContext } from '../hooks/useStateContext';
import { useNavigate } from 'react-router';
import { Copyright } from './Copyright';

const getFreshModel = () => ({
    name: '',
    pwd: ''
});

export default function Login() {
    const {context, setContext} = useStateContext();
    const navigate = useNavigate();

    const {        
        values,
        // setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    const login = e => {
        e.preventDefault();

        let payload = {
            name: values.name,
            pwd: values.pwd
        }

        if (validate())
            createAPIEndpoint(ENDPOINTS.authenticate)
                .post(payload)
                .then(res => {
                    setContext({admin_name: res.data});
                    let authData = btoa(payload.name + ':' + payload.pwd);
                    localStorage.setItem('authData', authData);
                    navigate('/dashboard/analytics');
                })
                .catch(err => console.log(err));
    }

    const validate = () => {
        let temp = {};
        temp.name = values.name !== "" ? "" : "Invalid name";
        temp.pwd = values.pwd !== "" ? "" : "Invalid password";
        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    }

    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <Center>
            <Card sx={{ width: "400"}}>
                <CardContent sx={{textAlign: 'center'}}>
                    <Typography 
                        variant='h3' 
                        sx={{ marginY: 3 }}
                    >
                        Bike Store Admin Login
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            margin: 1,
                            width: "50%"
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField 
                                label='Name' 
                                name='name' 
                                id='name'
                                value={values.name}
                                onChange={handleInputChange}
                                variant='outlined'
                                {...(errors.name && {errors:"true", helperText:errors.name})}
                            />
                            <TextField
                                name='pwd' 
                                id='password' 
                                value={values.pwd}
                                onChange={handleInputChange}
                                {...(errors.pwd && {errors:"true", helperText:errors.pwd})}
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    ),
                                }}
                                />
                            <Button 
                                type="submit" 
                                variant='contained' 
                                sx={{ width: "40%", m: 4 }}
                            >
                                Login
                            </Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
            <Copyright sx={{ pt: 4 }} />
        </Center>
    )
}
