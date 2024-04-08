const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { router: adminRouter } = require('./routes/adminRouter');

const app = express();

app.use(cors({
    origin: [`http://localhost:${process.env.PORT_FRONTEND}`],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));
app.use(express.json());
app.use('/auth', adminRouter);

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});