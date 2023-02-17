import { InputLabel, MenuItem, Select } from '@mui/material';
import { React } from 'react'

export default function BikeMenuSelect(props) {
    return (
        <div>
            <InputLabel id="item_select_label">Item Name</InputLabel>
            <Select
                labelId="item_select_label"
                sx={{width:"100%"}}
                id={props.id}
                name={props.name}
                label='Item Name'
                onChange={props.onChange}
                value={props.item_name}
                item_price={props.item_price}
            >
                {props.data.map(item => (
                    <MenuItem key={item.name} value={item.name} item_price={item.price}>{item.name}</MenuItem>
                ))}
            </Select>
        </div>
    );
}
