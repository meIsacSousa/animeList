const db = require('../config/database.js');

exports.store = async (req, res) => {
    const { nome, autor, revista, sinopse, genero, volumes, capitulos, lancamento, imagem } = req.body;
    const { rows } = await db.query (
        "INSERT INTO manga(nome, autor, revista, sinopse, genero, volumes, capitulos, lancamento, imagem ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [nome, autor, revista, sinopse, genero, volumes, capitulos, lancamento, imagem ]
    );

    res.status(201).json({
        result: "created"
    });
}

exports.index = async (req, res) => {
    const response = await db.query (
        "SELECT * FROM manga"
    );

    res.json(response.rows).status(200);
}

exports.show = async (req, res) => {
    let id = parseInt(req.params.id);
    const response = await db.query (
        "SELECT * FROM manga WHERE id = $1", [id]
    );
    
    res.json(response.rows).status(200);
}

exports.update = async (req, res) => {
    let id = parseInt(req.params.id);
    const { nome, autor, revista, sinopse, genero, volumes, capitulos, lancamento, imagem } = req.body;

    const response = await db.query(
        "UPDATE manga SET nome = $1, autor = $2, revista = $3, sinopse = $4, genero = $5, volumes = $6, capitulos = $7, lancamento = $8, imagem = $9 WHERE id = $10", [ nome, autor, revista, sinopse, genero, volumes, capitulos, lancamento, imagem, id ]
    );

    res.status(200).json({
        message: "update complete"
    })
}

exports.destroy = async (req, res) => {
    let id = parseInt(req.params.id);
    await db.query("DELETE FROM manga WHERE id = $1", [id]);

    res.status(200).json({
        message: "Deleted"
    })
}

exports.lancamentos = async (req, res) => {
    const response = await db.query("SELECT * FROM lancamentomanga ORDER BY lancamento");
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
            "SELECT * from manga WHERE nome = $1", [searchName]
        );
    } else if (searchType == 'autor') {
        response = await db.query(
            "SELECT * from manga WHERE autor = $1", [searchName]
        );
    } else if (searchType == 'revista') {
        response = await db.query(
            "SELECT * from manga WHERE revista = $1", [searchName]
        );
    } else if (searchType == 'genero') {
        response = await db.query(
            "SELECT * from manga WHERE genero = $1", [searchName]
        );
    } else {
        res.json(response);
    }


    res.json(response.rows).status(200);
}