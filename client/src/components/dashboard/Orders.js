import {useRef, /*useEffect,*/ Fragment}from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import dayjs from 'dayjs';
// import { Link } from 'react-router-dom';

// Generate Order Data
function createData(id, date, name, orderer, amount) {
  return { id, date, name, orderer, amount };
}

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Orders({orderData}) {
  const rows = useRef([]);
  // useEffect(() => {
  //   if (orderData.length > 0) {
  //     let freshRows = []
  //     Object.keys(orderData).forEach((key, ind) => {
  //       freshRows.push(
  //         createData(ind, dayjs(orderData[key].orderDate).format('YYYY-MM-DD'), orderData[key].customerName, orderData[key].adminName, orderData[key].totalPrice )
  //       )
  //     })
  //     rows.current = freshRows;
  //   }
  // }, [orderData])

  if (orderData.length > 0) {
    let freshRows = []
    Object.keys(orderData).forEach((key, ind) => {
      freshRows.push(
        createData(ind, dayjs(orderData[key].orderDate).format('YYYY-MM-DD'), orderData[key].customerName, orderData[key].adminName, orderData[key].totalPrice )
      )
    })
    rows.current = freshRows;
  }

  return (
    <Fragment>
      <Title>All Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Orderer</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.current.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.orderer}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="/dashboard/orders" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </Fragment>
  );
}