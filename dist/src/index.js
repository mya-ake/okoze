"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const consola_1 = __importDefault(require("consola"));
const app = express_1.default();
const port = process.env.OKOZE_PORT ? Number(process.env.OKOZE_PORT) : 3000;
const host = process.env.OKOZE_HOST || 'localhost';
app.all('*', (req, res) => {
    res.json({ message: 'test' });
});
app.listen(Number(port), host, () => {
    consola_1.default.ready({
        message: `Okoze listening on http://${host}:${port}`,
        badge: true,
    });
});
