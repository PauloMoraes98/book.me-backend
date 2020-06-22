require('dotenv/config');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log(`Servidor na porta ${process.env.PORT || '3333'}`);
});
