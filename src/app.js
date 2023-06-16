import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const porta = process.env.PORTA || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(porta, () => console.log(`
    🚀 Servidor iniciado na porta ${porta}
`));