const authMiddleware = require('../middlerares/authMiddleware');
const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const pessoaData = req.body;

        const camposNecessarios = ['nome', 'sexo', 'data_nascimento', 'estado_civil', 'cep', 'endereco', 'numero', 'complemento', 'bairro', 'estado', 'cidade'];
        const camposFaltantes = camposNecessarios.filter(campo => !pessoaData.hasOwnProperty(campo));

        if (camposFaltantes.length > 0) {
            return res.status(400).json({ Status: false, Error: `Campos faltantes: ${camposFaltantes.join(', ')}` });
        }

        // Verifica se já existe uma pessoa com o mesmo nome
        const pessoaExistente = await db('pessoas').where('nome', pessoaData.nome).first();

        if (pessoaExistente) {
            return res.status(400).json({ Status: false, Error: 'Já existe uma pessoa com esse nome.' });
        }
    
        const ids = await db('pessoas').insert(pessoaData);
    
        res.json({ Status: true });
     } catch (err) {
        return res.json({ Status: false, Error: err });
     }
});

router.get('/list', authMiddleware, async (req, res) => {
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

router.put('/update/:id', authMiddleware, async (req, res) => {
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

router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const personExists = await db('pessoas').where({ id }).first();
        if (!personExists) {
            return res.status(404).json({ Status: false, Error: 'Pessoa não encontrada' });
        }

        const deletedRows = await db('pessoas').where({ id }).del();

        if (deletedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Pessoa não encontrada' });
        }

        res.json({ Status: true, Message: 'Pessoa deletada com sucesso' });
    } catch (err) {
        return res.status(500).json({ Status: false, Error: err.message });
    }
});

module.exports = router;