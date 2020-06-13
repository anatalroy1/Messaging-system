const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoutes);
// app.use('/messages', );

app.listen(port, () => console.log(`server listenning on ${port}`));

