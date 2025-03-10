// pages/Cashier.jsx
import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Cashier = () => {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState(null);

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services")) || [];
    const storedBarbers = JSON.parse(localStorage.getItem("barbers")) || [];
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    
    setServices(storedServices);
    setBarbers(storedBarbers);
    setTransactions(storedTransactions);
  }, []);

  const handleCheckout = () => {
    if (!selectedService || !selectedBarber) return;

    const service = services.find((s) => s.name === selectedService);
    if (!service) return;

    const totalPrice = service.price;
    const barberShare = totalPrice / 2;

    const newTransaction = {
      service: selectedService,
      barber: selectedBarber,
      totalPrice,
      barberShare,
      date: new Date().toLocaleString(),
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    setCurrentInvoice(newTransaction);
    setSelectedService("");
    setSelectedBarber("");
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>واجهة الكاشير</Typography>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>اختر الخدمة</InputLabel>
        <Select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
          {services.map((service, index) => (
            <MenuItem key={index} value={service.name}>{service.name} - {service.price} جنيه</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>اختر الحلاق</InputLabel>
        <Select value={selectedBarber} onChange={(e) => setSelectedBarber(e.target.value)}>
          {barbers.map((barber, index) => (
            <MenuItem key={index} value={barber.name}>{barber.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleCheckout}>
        إتمام الدفع
      </Button>

      {currentInvoice && (
        <Paper sx={{ p: 2, mt: 3, backgroundColor: "#e3f2fd" }}>
          <Typography variant="h6">فاتورة العميل</Typography>
          <Typography>الخدمة: {currentInvoice.service}</Typography>
          <Typography>الحلاق: {currentInvoice.barber}</Typography>
          <Typography>السعر الإجمالي: {currentInvoice.totalPrice} جنيه</Typography>
          <Typography>نصيب الحلاق: {currentInvoice.barberShare} جنيه</Typography>
          <Typography>التاريخ: {currentInvoice.date}</Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mr: 1 }}
            onClick={() => window.print()}
          >
            طباعة الفاتورة
          </Button>

          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={() => {
              const message = `فاتورتك:\nالخدمة: ${currentInvoice.service}\nالحلاق: ${currentInvoice.barber}\nالسعر: ${currentInvoice.totalPrice} جنيه\nنصيب الحلاق: ${currentInvoice.barberShare} جنيه\nالتاريخ: ${currentInvoice.date}`;
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, "_blank");
            }}
          >
            إرسال عبر WhatsApp
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default Cashier;
