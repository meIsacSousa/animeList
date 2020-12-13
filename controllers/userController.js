const db = require('../config/database.js');
const JWT = require('jsonwebtoken');

exports.store = async (req, res) => {
    const { nome, login, senha, nivel } = req.body;
    const response = await db.query (
        "INSERT INTO usuario(nome, login, senha, nivel) VALUES ($1, $2, $3, $4)", [nome, login, senha, nivel]
    );

    res.status(201).json({
        menssage: "created"
    });
}

exports.index = async (req, res) => {
    const response = await db.query (
        "SELECT * FROM usuario"
    );

    res.json(response.rows).status(200);
}

exports.show = async (req, res) => {
    let id = parseInt(req.params.id);
    const response = await db.query (
        "SELECT * FROM usuario WHERE id = $1", [id]
    );
    
    res.json(response.rows).status(200);
}

exports.update = async (req, res) => {
    let id = parseInt(req.params.id);
    const { nome, login, senha, nivel } = req.body;

    const response = await db.query(
        "UPDATE usuario SET nome = $1, login = $2, senha = $3, nivel = $4 WHERE id = $5", [ nome, login, senha, nivel, id ]
    );

    res.status(200).json({
        message: "update complete"
    })
}

exports.destroy = async (req, res) => {
    let id = parseInt(req.params.id);
    await db.query("DELETE FROM usuario WHERE id = $1", [id]);

    res.status(200).json({
        message: "Deleted"
    })
}

exports.login = async (req, res) => {
    let { login, senha } = req.body;
    const response = await db.query (
        "SELECT * FROM usuario WHERE login = $1", [login]
    );
    const user = response.rows[0]
    if(response.rows.length > 0) {
        if(user.senha == senha ) {
            
            // login efetuado
            res.json({
                return: 1
            });
        } else {
           // senha incorreta
            res.json({
                return: 0
            });
        }
    } else {
        // usuário não identificado
        res.json({
            return: -1
        });
    }

}