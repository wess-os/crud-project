const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const result = await db('admin').where({ email }).select('password').first();

        if (!result) {
            return res.json({ loginStatus: false, Error: 'Usuário não encontrado' });
        }

        // como nao houve tela para cadastro de 'admins' salvo no banco a senha mesmo e nao um hash, mas é uma maneira incorreta e que deve ser concertado futuramente
        // const isMatch = await bcrypt.compare(password, result.password);

        // if (!isMatch) {
        //     return res.json('Senha incorreta');
        // }

        if(password != result.password) {
            return res.json({ loginStatus: false, Error: 'Senha incorreta' });
        }

        const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ loginStatus: true, Sucess: 'Sucesso', token });
    } catch (error) {
        
        return res.json({ loginStatus: false, Error: 'Erro interno do servidor' });
    }
});

module.exports = router;