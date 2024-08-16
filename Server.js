const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const eventRoutes = require('./routes/events');

app.use('/api/v3/app', eventRoutes);

app.get('/api/v3/app', (req, res) => {
    res.send('Welcome to the Event Management API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
