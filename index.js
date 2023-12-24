const mongoose = require("mongoose")
const express = require("express")
const app = express()
const ocrRoutes = require('./routes/ocrRoutes')
const port = 8000;

// Connection of mongodb
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });

// middlewares 
app.use(express.json());

// routes 
app.use('/api', ocrRoutes);


app.listen(port,(req,res) =>{
    console.log("Server started");
});

