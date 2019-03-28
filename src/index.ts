import * as express from 'express';
import consola from 'consola';

export const app = express();
const port = process.env.OKOZE_PORT ? Number(process.env.OKOZE_PORT) : 3000;
const host = process.env.OKOZE_HOST || 'localhost';

app.all('*', (req, res) => {
  res.json({ message: 'test' });
});

// app.listen(Number(port), host, () => {
//   consola.ready({
//     message: `Okoze listening on http://${host}:${port}`,
//     badge: true,
//   });
// });
