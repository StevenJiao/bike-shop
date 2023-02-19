import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href="/dashboard/analytics">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Analytics"/>
    </ListItemButton>
    <ListItemButton href="/dashboard/ordering">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Ordering" />
    </ListItemButton>
    {/* <ListItemButton href="/dashboard/orders">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="All Orders" />
    </ListItemButton> */}
  </React.Fragment>
);