import { InputLabel, MenuItem, Select } from '@mui/material';
import { React, useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api';

export default function BikeMenuSelect(props) {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //       const response = await fetch('https://api.example.com/data');
    //       const json = await response.json();
    //       setData(json);
    //     }
    //     fetchData();
    //   }, []);
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.itemAll)
            .get()
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <InputLabel id="item_select_label">Item Name</InputLabel>
            <Select
                labelId="item_select_label"
                sx={{width:"100%"}}
                id={props.id}
                name={props.name}
                label='Item Name'
                onChange={props.handleInputChange}
                value={props.item_name}
            >
                {data.map(item => (
                    <MenuItem value={item.name} price={item.price}>{item.name}</MenuItem>
                ))}
            </Select>
        </div>
    );
}
