const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

const product_route = require('./routes/product.route');

dotenv.config();
const app = express();

const __dirname = path.resolve();

// Middleware to parse JSON bodies
app.use(express.json()); 

app.use('/api/products',product_route);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'Frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'));
    });
}


// Start the server
const PORT = 3000;
app.listen(PORT, async () => {
    await connectDB(); // Ensure DB connection before starting the server
    console.log(`Server is running on http://localhost:${PORT}`);
});
