require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`GustoHub Server is running on http://localhost:${PORT}`);
});