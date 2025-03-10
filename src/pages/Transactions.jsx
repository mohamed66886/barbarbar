import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.barber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.date.includes(searchQuery)
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>سجل المعاملات</Typography>

      <TextField
        fullWidth
        label="بحث حسب الخدمة، الحلاق، أو التاريخ"
        variant="outlined"
        sx={{ mt: 2, mb: 2 }}
        value={searchQuery}
        onChange={handleSearch}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>التاريخ</TableCell>
              <TableCell>الخدمة</TableCell>
              <TableCell>الحلاق</TableCell>
              <TableCell>السعر الإجمالي</TableCell>
              <TableCell>نصيب الحلاق</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.service}</TableCell>
                <TableCell>{transaction.barber}</TableCell>
                <TableCell>{transaction.totalPrice} جنيه</TableCell>
                <TableCell>{transaction.barberShare} جنيه</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Transactions;
