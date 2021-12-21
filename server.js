// Express Server
const express = require('express');
// Connect to MongoDB
const connectDB = require('./config/db');
// App 
const app= express();
// PORT
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('API runnng'));

// Define routes
app.use('/routes/user', require('./routes/user'));
app.use('/routes/auth', require('./routes/auth'));
app.use('/routes/profile', require('./routes/profile'));
app.use('/routes/review', require('./routes/review'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

connectDB();