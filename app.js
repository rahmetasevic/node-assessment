require('dotenv').config();
const express = require("express");
const connectDB = require('./config/dbConnection');
const app = express();
const usersRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const validateToken = require('./middleware/verifyJWT');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

connectDB();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/user', usersRoutes);
app.use('/', validateToken, productRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
