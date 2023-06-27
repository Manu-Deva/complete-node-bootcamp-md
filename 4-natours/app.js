const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//* MIDDLEWARE
// middleware allows for manipulation of req and res

//existing middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan(`dev`));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`)); //* in same folder as app.js (current file), becomes root

//custom defined middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//* ROUTES
//mounting routers from subapps
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
