const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);

app.get('/', (req, res) => res.send({ ok: true, message: 'CampusBeacon API' }));

module.exports = app;
