// components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Barber Shop
        </Typography>
        <Button color="inherit" component={Link} to="/">الرئيسية</Button>
        <Button color="inherit" component={Link} to="/dashboard">لوحة التحكم</Button>
        <Button color="inherit" component={Link} to="/barbers">الحلاقين</Button>
        <Button color="inherit" component={Link} to="/services">الخدمات</Button>
        <Button color="inherit" component={Link} to="/cashier">الكاشير</Button>
        <Button color="inherit" component={Link} to="/reports">التقارير</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
