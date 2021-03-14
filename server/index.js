const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send("API Running"))

//Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/videos', require('./routes/api/videos'))
app.use('/api/speakers', require('./routes/api/speakers'))
app.use('/api/tags', require('./routes/api/tags'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
