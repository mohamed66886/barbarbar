// pages/Reports.jsx
import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [barberEarnings, setBarberEarnings] = useState({});

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);

    let total = 0;
    let earnings = {};
    storedTransactions.forEach((transaction) => {
      total += transaction.totalPrice;
      earnings[transaction.barber] = (earnings[transaction.barber] || 0) + transaction.barberShare;
    });

    setTotalEarnings(total);
    setBarberEarnings(earnings);
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>تقارير الأرباح</Typography>
      <Paper sx={{ p: 2, mt: 3, backgroundColor: "#e3f2fd" }}>
        <Typography variant="h6">إجمالي الأرباح: {totalEarnings} جنيه</Typography>
      </Paper>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>الحلاق</TableCell>
              <TableCell>إجمالي الأرباح</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(barberEarnings).map((barber, index) => (
              <TableRow key={index}>
                <TableCell>{barber}</TableCell>
                <TableCell>{barberEarnings[barber]} جنيه</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Reports;
