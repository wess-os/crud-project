const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

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

        return res.json({ loginStatus: true, Sucess: 'Sucesso' });
    } catch (error) {
        
        return res.json({ loginStatus: false, Error: 'Erro interno do servidor' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const pessoaData = req.body;

        const camposNecessarios = ['nome', 'sexo', 'data_nascimento', 'estado_civil', 'cep', 'endereco', 'numero', 'complemento', 'bairro', 'estado', 'cidade'];
        const camposFaltantes = camposNecessarios.filter(campo => !pessoaData.hasOwnProperty(campo));

        if (camposFaltantes.length > 0) {
            return res.status(400).json({ Status: false, Error: `Campos faltantes: ${camposFaltantes.join(', ')}` });
        }
    
        const ids = await db('pessoas').insert(pessoaData);
    
        res.json({ Status: true });
     } catch (err) {
        return res.json({ Status: false, Error: err });
     }
});

router.get('/list', async (req, res) => {
    try {
        const pessoas = await db('pessoas').select('*');

        if (pessoas.length === 0) {
            return res.status(404).json({ Status: false, Error: 'Nenhuma pessoa encontrada' });
        }

        res.json({ Status: true, Pessoas: pessoas });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: err.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sexo, data_nascimento, estado_civil, cep, endereco, numero, complemento, bairro, estado, cidade } = req.body;

        const updatedRows = await db('pessoas')
            .where({ id })
            .update({
                nome,
                sexo,
                data_nascimento,
                estado_civil,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                estado,
                cidade
            });

        if (updatedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Pessoa não encontrada' });
        }

        res.json({ Status: true, Message: 'Pessoa atualizada com sucesso' });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: err.message });
    }
});

module.exports = { router: router };