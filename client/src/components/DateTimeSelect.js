import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimeSelect(props) {
  const {value, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Order Date-Time"
          name="date_time"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}
