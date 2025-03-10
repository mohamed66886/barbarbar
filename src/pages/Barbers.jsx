import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);
  const [barberName, setBarberName] = useState("");

  // تحميل قائمة الحلاقين من localStorage عند فتح الصفحة
  useEffect(() => {
    const storedBarbers = JSON.parse(localStorage.getItem("barbers")) || [];
    setBarbers(storedBarbers);
  }, []);

  // تحديث localStorage عند تغيير البيانات
  useEffect(() => {
    localStorage.setItem("barbers", JSON.stringify(barbers));
  }, [barbers]);

  // دالة لإضافة حلاق جديد
  const addBarber = () => {
    if (barberName.trim()) {
      setBarbers([...barbers, { name: barberName }]);
      setBarberName("");
    }
  };

  // دالة لحذف حلاق
  const deleteBarber = (index) => {
    const updatedBarbers = barbers.filter((_, i) => i !== index);
    setBarbers(updatedBarbers);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>إدارة الحلاقين</Typography>

      {/* إدخال اسم الحلاق */}
      <TextField
        label="اسم الحلاق"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        value={barberName}
        onChange={(e) => setBarberName(e.target.value)}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addBarber}>
        إضافة الحلاق
      </Button>

      {/* عرض قائمة الحلاقين */}
      <List sx={{ mt: 3 }}>
        {barbers.map((barber, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" color="error" onClick={() => deleteBarber(index)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={barber.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Barbers;
