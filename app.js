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

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to smartU</h1>
              <h3>smartU is a financial instrument web app that aids staff and individuals
               keep track of expenditures</h3>
              <p>For any more information please visit our
              <a href='https://github.com/jaesea17/smartu_api'>
              Github repo!</a></p>
              <h4>Thank you for visiting  &#x1F600;</h4>
              `);
  });

app.get('*', (req, res) => httpResponse(res, {
    statusCode: 400,
    status: 'failure',
    message: 'Oops! Not found',
  }));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}...`)
})