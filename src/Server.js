const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const artistsRoutes = require('./routes/artists');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts');
const ventaRoutes = require('./routes/ventas');
const sessionRoutes = require('./routes/session');
const shippingRoutes = require('./routes/shipping');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3308;
const dbOptions = {
    host: '34.222.130.2',
    user: 'univar',
    password: 'Univar98.',
    database: 'BejeweledShop'
}

// middlewares
app.use(myconn(mysql, dbOptions, 'single'));
app.use(cors());
app.use(express.json());
app.use('/api', artistsRoutes);
app.use('/api', productsRoutes);
app.use('/api', usersRoutes);
app.use('/api', cartRoutes);
app.use('/api', ventaRoutes);
app.use('/api', sessionRoutes);
app.use('/api', shippingRoutes);

// routes
app.get('/', (req, res)=>{
    res.send('Wlcome to my api');
});

// mongodb connection
mongoose
    .connect("mongodb+srv://alexlm1989:NevergrowupTS7@cluster0.cimj4ui.mongodb.net/sample_training?retryWrites=true&w=majority")
    .then(()=>console.log('Connected to MongoDb Atlas'))
    .catch((error) => console.error(error));

app.listen(3308, () => console.log('server listening on port', port));

