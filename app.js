const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const queryParser = require('express-query-parser');
const userRoutes = require('./src/routes/userRoutes');
const messagesRoutes = require('./src/routes/messagesRoutes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(queryParser({ parseNull: true, parseBoolean: true}));

app.use('/user', userRoutes);
app.use('/messages', messagesRoutes);

app.listen(port, () => console.log(`server listenning on ${port}`));

