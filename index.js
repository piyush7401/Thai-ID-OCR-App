const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const ocrRoutes = require('./routes/ocr_routes');

const app = express();
const PORT = 8000;


// Connection of mongodb
mongoose.connect('mongodb://localhost:27017/ocr_database', { useNewUrlParser: true, useUnifiedTopology: true });

// middlewares 
app.use(express.json());

// routes 
app.use('/api', ocrRoutes);


app.listen(PORT,(req,res) =>{
    console.log("Server started");
});

