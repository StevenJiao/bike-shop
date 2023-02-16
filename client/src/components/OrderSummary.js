import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function OrderSummary() {
  const [items, setItems] = useState([
    { name: 'Product A', price: 10.00, quantity: 2 },
    { name: 'Product B', price: 5.50, quantity: 1 },
    { name: 'Product C', price: 15.25, quantity: 3 }
  ]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">${item.price.toFixed(2)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="right">Total</TableCell>
            <TableCell align="right">${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderSummary;