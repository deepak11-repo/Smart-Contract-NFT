const express = require('express');
const app = express();
const certificateRoutes = require('./routes/certificateRoutes');

app.use(express.json());

app.use('/certificate', certificateRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;