import React from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Center from './Center'
import useForm from '../hooks/useForm'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const getFreshModel = () => ({
  name: '',
  password: '',
})

export default function Login() {
  const {        
    values,
    // setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(getFreshModel)

  const login = e => {
    e.preventDefault()
    if (validate())
        console.log(values)
  }

  const validate = () => {
    let temp = {}
    temp.name = values.name !== "" ? "" : "Invalid name"
    temp.password = values.password !== "" ? "" : "Invalid password"
    setErrors(temp)
    return Object.values(temp).every(x => x === "")
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
            Bike Store Administrator Login
          </Typography>
          <Box sx={{
            '& .MuiTextField-root': {
                margin: 1,
                width: "90%"
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
                    name='password' 
                    id='password' 
                    value={values.password}
                    onChange={handleInputChange}
                    {...(errors.password && {errors:"true", helperText:errors.password})}
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
                    sx={{ width: "90%" }}
                >
                    Login
                </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  )
}
