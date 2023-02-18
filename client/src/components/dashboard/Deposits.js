import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export default function Deposits({orderData}) {
  const total = orderData.reduce((acc, order) => acc + order.totalPrice, 0);

  return (
    <React.Fragment>
      <Title>Total sales</Title>
      <Typography component="p" variant="h4">
        ${total}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {dayjs().local().format('ddd, DD MMM YYYY HH:mm A')}
      </Typography>
    </React.Fragment>
  );
}