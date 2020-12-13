const db = require('../config/database.js');


exports.store = async (req, res) => {
    const { nome, autor, estudio, diretor, sinopse, genero, episodios, temporadas, lancamento, imagem } = req.body;
    const { rows } = await db.query (
        "INSERT INTO anime(nome, autor, estudio, diretor, sinopse, genero, episodios, temporadas, lancamento, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [nome, autor, estudio, diretor, sinopse, genero, episodios, temporadas, lancamento, imagem]
    );

    res.status(201).json({
        result: "created"
    });
}

exports.index = async (req, res) => {
    const response = await db.query (
        "SELECT * FROM anime"
    );

    res.json(response.rows).status(200);
}

exports.show = async (req, res) => {
    let id = parseInt(req.params.id);
    const response = await db.query (
        "SELECT * FROM anime WHERE id = $1", [id]
    );
    
    res.json(response.rows).status(200);
}

exports.update = async (req, res) => {
    let id = parseInt(req.params.id);
    const { nome, autor, estudio, diretor, sinopse, genero, episodios, temporadas, lancamento, imagem } = req.body;

    const response = await db.query(
        "UPDATE anime SET nome = $1, autor = $2, estudio = $3, diretor = $4, sinopse = $5, genero = $6, episodios = $7, temporadas = $8, lancamento = $9, imagem = $10 WHERE id = $11", [ nome, autor, estudio, diretor, sinopse, genero, episodios, temporadas, lancamento, imagem, id ]
    );

    res.status(200).json({
        message: "update complete"
    })
}

exports.destroy = async (req, res) => {
    let id = parseInt(req.params.id);
    await db.query("DELETE FROM anime WHERE id = $1", [id]);

    res.status(200).json({
        message: "Deleted"
    })
}

exports.lancamentos = async (req, res) => {
    const response = await db.query("SELECT * FROM lancamentoanime ORDER BY lancamento");
    res.json(response.rows).status(200);
}

// procurar por nome, estudio entre outros - selecionando o parâmetro
exports.findBy = async (req, res) => {
    let { searchType, searchName } = req.body;

    console.log(searchType);
    console.log(searchName);
    
    let response = {
        response: "busca inexistente"
    };
   
    if (searchType == 'nome') {
         response = await db.query (
            "SELECT * from anime WHERE nome = $1", [searchName]
        );
    } else if (searchType == 'autor') {
        response = await db.query(
            "SELECT * from anime WHERE autor = $1", [searchName]
        );
    } else if (searchType == 'estudio') {
        response = await db.query(
            "SELECT * from anime WHERE estudio = $1", [searchName]
        );
    } else if (searchType == 'genero') {
        response = await db.query(
            "SELECT * from anime WHERE genero = $1", [searchName]
        );
    } else if (searchType == 'diretor') {
        response = await db.query(
            "SELECT * from anime WHERE diretor = $1", [searchName]
        );
    } else {
        res.json(response);
    }


    res.json(response.rows).status(200);
}