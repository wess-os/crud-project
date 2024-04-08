const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db('admin').where({ email }).select('password').first();

        if (!result) {
            return res.json({ loginStatus: false, Error: 'Usuário não encontrado' });
        }

        // const isMatch = await bcrypt.compare(password, result.password);

        // if (!isMatch) {
        //     return res.json('Senha incorreta');
        // }

        if(password != result.password) {
            return res.json({ loginStatus: false, Error: 'Senha incorreta' });
        }

        const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        res.cookie('token', token);

        return res.json({ loginStatus: true, Error: 'Sucesso' });
    } catch (error) {
        console.error(error);
        return res.json({ loginStatus: false, Error: 'Erro interno do servidor' });
    }
});

module.exports = { router: router };