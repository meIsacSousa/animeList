const db = require('../config/database.js');


exports.store = async (req, res) => {
    const { idusuario, idanime, assistido, concluido, comentario } = req.body;
    const { rows } = await db.query (
        "INSERT INTO animelist VALUES ($1, $2, $3, $4, $5)", [idusuario, idanime, assistido, concluido, comentario]
    );

    res.status(201).json({
        result: "created"
    });
}

exports.index = async (req, res) => {
    const response = await db.query (
        "SELECT * FROM animelist"
    );

    res.json(response.rows).status(200);
}

// busca pelo usuario
exports.show = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    const response = await db.query (
        "SELECT * FROM animelist WHERE idusuario = $1", [id]
    );
    
    res.json(response.rows).status(200);
}

exports.update = async (req, res) => {
    let idusuario = parseInt(req.params.idusuario);
    let idanime = parseInt(req.params.idusuario);
    const {  assistido, concluido, comentario } = req.body;

    const response = await db.query(
        "UPDATE animelist SET assistido = $1, concluido = $2, comentario = $3 WHERE idusuario = $4 and idanime = $5", [ assistido, concluido, comentario, idusuario, idanime ]
    );

    res.status(200).json({
        message: "update complete"
    })
}

exports.destroy = async (req, res) => {
    let idusuario = parseInt(req.params.idusuario);
    let idanime = parseInt(req.params.idusuario);
    await db.query("DELETE FROM animelist WHERE idusuario = $1 and idanime = $2", [idusuario, idanime]);

    res.status(200).json({
        message: "Deleted"
    })
}

// ver por interesse, assistindo ou concluido
exports.findByStatus = async (req, res) => {
    // 0 = não iniciado, 1 = iniciado mas não concluido e 2 = concluido
    let idusuario = parseInt(req.params.idusuario);
    let status = parseInt(req.params.status);
    
    const response = await db.query (
        "SELECT * FROM animelist WHERE idusuario = $1 and concluido = $2", [idusuario, status]
    );
    
    res.json(response.rows).status(200);
}

exports.showOnlyOne = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    let idanime = parseInt(req.params.idanime)
    const response = await db.query (
        "SELECT * FROM animelist WHERE idusuario = $1 and idanime = $2", [id, idanime]
    );
    
    res.json(response.rows).status(200);
}