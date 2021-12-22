const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./Back-end/config/db');
const userRouter = require('./Back-end/api/userRoutes');
const entriesRouter = require('./Back-end/api/entriesRoutes');

//middlewear
app.use(express.json());
app.use(cors());

//Route middlewear
app.use('/user', userRouter);
app.use('/entries', entriesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`)
})