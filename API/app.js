const express = require('express');
const cors = require('cors');


const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 5000;


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.use(cors());
app.use(express.json());


app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`GustoHub Server is running on http://localhost:${PORT}`);
});