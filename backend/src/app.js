const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.route');
const cors = require('cors');
const foodPartnerRoutes = require('./routes/food-partner.route');

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'https://zomato-5-iz16.onrender.com',
    credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Backend live hai bhai! Zomato clone API running 🔥");
});
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/foodpartner', foodPartnerRoutes);



module.exports = app;