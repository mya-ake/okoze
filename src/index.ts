const express = require('express');
import * as expressTypes from 'express';
import consola from 'consola';
import axios from 'axios';

export const app = express();
const port = process.env.OKOZE_PORT ? Number(process.env.OKOZE_PORT) : 3000;
const host = process.env.OKOZE_HOST || 'localhost';
const originPort = `:${process.env.OKOZE_ORIGIN_PORT}`;
const originHost = process.env.OKOZE_ORIGIN_HOST || 'localhost';

const baseURL = `http://${originHost}${originPort}`;
const request = axios.create({
  baseURL,
});

app.all('*', async (req: expressTypes.Request, res: expressTypes.Response) => {
  const { method, url } = req;
  consola.info(`${method} ${baseURL}${url}`);
  const { status, data } = await request({
    method,
    url,
  }).catch(err => err.response);
  res.status(status);
  res.json(data);
});

// testApp.listen(Number(port), host, () => {
//   consola.ready({
//     message: `Okoze listening on http://${host}:${port}`,
//     badge: true,
//   });
// });
