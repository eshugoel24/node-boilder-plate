'use strict';

import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebirdPromise from 'bluebird';


import routes from './routes';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,' +
    'Cache-Control, atlas-token, Access-Control-Allow-Origin');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT, PATCH');
  next();
});

const Mongoose = bluebirdPromise.promisifyAll(mongoose);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(`/v1`, routes);

app.use((err, request, response, next) => {
  if (err instanceof SyntaxError && err.body) {
    const errorData = err ? err.body || err : {};
    request.log.warn('Syntax error in the request json.', { errorData });
    const inValidJsonResponse = {
      status: 400,
      message: 'The request could not be understood by the server due to malformed syntax'
    };
    return response.status(400).json(inValidJsonResponse);
  }

  if (err) {
    request.log.error('Unknown error in middleware', { errorData: err });
    const unknonwErrorResponse = {
      status: 500,
      message: 'Internal server error.'
    };
    return response.status(500).json(unknonwErrorResponse);
  }
  next();
});


Mongoose.connect(config.MONGO_URL, (err)=>{
  if(err){
      return console.log('Error while connecting with mongo.');
  }
  app.listen(config.PORT, (err) => {
    if(err)
      return console.log("error in starting the server.");
    console.log(`Server is up at port ${config.PORT}`);
  });
});