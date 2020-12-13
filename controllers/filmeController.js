const db = require('../config/database.js');

exports.store = async (req, res) => {
    const { nome, estudio, diretor, sinopse, genero, duracao, lancamento, imagem } = req.body;
    const { rows } = await db.query (
        "INSERT INTO filme(nome, estudio, diretor, sinopse, genero, duracao, lancamento, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [nome, estudio, diretor, sinopse, genero, duracao, lancamento, imagem]
    );

    res.status(201).json({
        result: "created"
    });
}

exports.index = async (req, res) => {
    const response = await db.query (
        "SELECT * FROM filme"
    );

    res.json(response.rows).status(200);
}

exports.show = async (req, res) => {
    let id = parseInt(req.params.id);
    const response = await db.query (
        "SELECT * FROM filme WHERE id = $1", [id]
    );
    
    res.json(response.rows).status(200);
}

exports.update = async (req, res) => {
    let id = parseInt(req.params.id);
    const { nome, estudio, diretor, sinopse, genero, duracao, lancamento, imagem } = req.body;

    const response = await db.query(
        "UPDATE filme SET nome = $1, estudio = $2, diretor = $3, sinopse = $4, genero = $5, duracao = $6, lancamento = $7, imagem = $8 WHERE id = $9", [ nome, estudio, diretor, sinopse, genero, duracao, lancamento, imagem, id ]
    );

    res.status(200).json({
        message: "update complete"
    })
}

exports.destroy = async (req, res) => {
    let id = parseInt(req.params.id);
    await db.query("DELETE FROM filme WHERE id = $1", [id]);

    res.status(200).json({
        message: "Deleted"
    })
}

exports.lancamentos = async (req, res) => {
    const response = await db.query("SELECT * FROM lancamentofilme ORDER BY lancamento");
    res.json(response.rows).status(200);
}

exports.findBy = async (req, res) => {
    let { searchType, searchName } = req.body;

    console.log(searchType);
    console.log(searchName);
    
    let response = {
        response: "busca inexistente"
    };
   
    if (searchType == 'nome') {
         response = await db.query (
            "SELECT * from filme WHERE nome = $1", [searchName]
        );
    } else if (searchType == 'estudio') {
        response = await db.query(
            "SELECT * from filme WHERE estudio = $1", [searchName]
        );
    } else if (searchType == 'genero') {
        response = await db.query(
            "SELECT * from filme WHERE genero = $1", [searchName]
        );
    } else if (searchType == 'diretor') {
        response = await db.query(
            "SELECT * from filme WHERE diretor = $1", [searchName]
        );
    } else {
        res.json(response);
    }


    res.json(response.rows).status(200);
}