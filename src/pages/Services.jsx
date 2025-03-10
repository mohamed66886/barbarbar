import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Services = () => {
  // تخزين الخدمات في حالة (State)
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  // تحميل البيانات من localStorage عند فتح الصفحة
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services")) || [];
    setServices(storedServices);
  }, []);

  // تحديث localStorage عند تغيير البيانات
  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  // دالة لإضافة خدمة جديدة
  const addService = () => {
    if (serviceName.trim() && servicePrice.trim()) {
      const newService = { name: serviceName, price: parseFloat(servicePrice) };
      setServices([...services, newService]);
      setServiceName("");
      setServicePrice("");
    }
  };

  // دالة لحذف خدمة
  const deleteService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>إدارة الخدمات</Typography>

      {/* نموذج إضافة خدمة جديدة */}
      <TextField
        label="اسم الخدمة"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />
      <TextField
        label="السعر (جنيه)"
        type="number"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={servicePrice}
        onChange={(e) => setServicePrice(e.target.value)}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addService}>
        إضافة الخدمة
      </Button>

      {/* عرض قائمة الخدمات */}
      <List sx={{ mt: 3 }}>
        {services.map((service, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" color="error" onClick={() => deleteService(index)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={service.name} secondary={`السعر: ${service.price} جنيه`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Services;
