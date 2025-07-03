const express =require('express');
const { Ticket } = require('./models/Ticket');
const ticketPath =require('./routes/tickets');
const connectDB = require('./config/db');
const authPath =require('./routes/auth')

require("dotenv").config();


const app =express();

connectDB()

app.use(express.json())

app.use('/api/tickets',ticketPath)
app.use('/api/auth' ,authPath)



const port =process.env.PORT || 8000
app.listen(port , ()=> console.log(`server is running in ${process.env.NODE_ENV} mode on port ${port}`))
