const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', authRoutes);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})