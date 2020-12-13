const db = require('../config/database.js');


exports.store = async (req, res) => {
    const { idusuario, idmanga, capitulo, concluido, comentario } = req.body;
    const { rows } = await db.query (
        "INSERT INTO mangalist VALUES ($1, $2, $3, $4, $5)", [idusuario, idmanga, capitulo, concluido, comentario]
    );

    res.status(201).json({
        result: "created"
    });
}

exports.index = async (req, res) => {
    const response = await db.query (
        "SELECT * FROM mangalist"
    );

    res.json(response.rows).status(200);
}

exports.show = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    const response = await db.query (
        "SELECT * FROM mangalist WHERE idusuario = $1", [id]
    );
    
    res.json(response.rows).status(200);
}

exports.update = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    let idmanga = parseInt(req.params.idmanga);
    const { capitulo, concluido, comentario } = req.body;

    const response = await db.query(
        "UPDATE mangalist SET capitulo = $1, concluido = $2, comentario = $3 WHERE idusuario = $4 and idmanga = $5", [ capitulo, concluido, comentario, id, idmanga]
    );

    res.status(200).json({
        message: "update complete"
    })
}

exports.destroy = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    let idmanga = parseInt(req.params.idmanga);
    await db.query("DELETE FROM mangalist WHERE idusuario = $1 and idmanga = $2", [id, idmanga]);

    res.status(200).json({
        message: "Deleted"
    })
}

exports.showOnlyOne = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    let idmanga = parseInt(req.params.idmanga)
    const response = await db.query (
        "SELECT * FROM mangalist WHERE idusuario = $1 and idmanga = $2", [id, idmanga]
    );
    
    res.json(response.rows).status(200);
}

// ver por interesse, assistindo ou concluido
exports.findByStatus = async (req, res) => {
    // 0 = não iniciado, 1 = iniciado mas não concluido e 2 = concluido
    let idusuario = parseInt(req.params.idusuario);
    let status = parseInt(req.params.status);
    
    const response = await db.query (
        "SELECT * FROM mangalist WHERE idusuario = $1 and concluido = $2", [idusuario, status]
    );
    
    res.json(response.rows).status(200);
}