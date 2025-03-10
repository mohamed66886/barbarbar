// pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBarbers, setTotalBarbers] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      const barbers = JSON.parse(localStorage.getItem("barbers")) || [];
      const services = JSON.parse(localStorage.getItem("services")) || [];

      const revenue = transactions.reduce((sum, transaction) => sum + transaction.totalPrice, 0);

      setTotalRevenue(revenue);
      setTotalTransactions(transactions.length);
      setTotalBarbers(barbers.length);
      setTotalServices(services.length);
    };

    loadData();
  }, []); // يتم تنفيذ الكود مرة واحدة عند تحميل الصفحة

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>لوحة التحكم</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">إجمالي الإيرادات</Typography>
              <Typography variant="h5">{totalRevenue} جنيه</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">عدد الحلاقين</Typography>
              <Typography variant="h5">{totalBarbers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">عدد الخدمات</Typography>
              <Typography variant="h5">{totalServices}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">عدد المعاملات</Typography>
              <Typography variant="h5">{totalTransactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
