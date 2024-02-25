const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

// config dotenv
require('dotenv').config();

// import routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// express app
const app = express();

// database connection
const dbUrl = 'mongodb://localhost:27017'; // Replace this with your actual database connection URL
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB database connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// server port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
