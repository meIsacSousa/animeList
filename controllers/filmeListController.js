const db = require('../config/database.js');


exports.store = async (req, res) => {
    const { idusuario, idfilme, assistido, concluido, comentario } = req.body;
    const { rows } = await db.query (
        "INSERT INTO filmelist VALUES ($1, $2, $3, $4, $5)", [idusuario, idfilme, assistido, concluido, comentario]
    );

    res.status(201).json({
        result: "created"
    });
}

exports.index = async (req, res) => {
    const response = await db.query (
        "SELECT * FROM filmelist"
    );

    res.json(response.rows).status(200);
}

exports.show = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    const response = await db.query (
        "SELECT * FROM filmelist WHERE idusuario = $1", [id]
    );
    
    res.json(response.rows).status(200);
}

exports.update = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    let idfilme = parseInt(req.params.idfilme);
    const { assistido, comentario } = req.body;
    
    const response = await db.query(
        "UPDATE filmelist SET assistido = $1, comentario = $2 WHERE idusuario = $3 and idfilme = $4", [ assistido, comentario, id, idfilme ]
    );
    
    const filmeQuery = await db.query(
        "SELECT * FROM filme where id = $1", [idfilme]
    );
    console.log(filmeQuery.rows);
    const filme = filmeQuery.rows[0];

    // chamando função de auto-update do estado do conteúdo
    await db.query(
        "SELECT consumo_status_filme($1::time without time zone, $2::time without time zone, $3, $4)", [assistido, filme.duracao, id, idfilme]
    ); 

    res.status(200).json({
        message: "update complete"
    })
}

exports.destroy = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    let idfilme = parseInt(req.params.idfilme);
    await db.query("DELETE FROM filmelist WHERE id = $1 and idfilme = $2", [id, idfilme]);

    res.status(200).json({
        message: "Deleted"
    })
}

exports.showOnlyOne = async (req, res) => {
    let id = parseInt(req.params.idusuario);
    let idfilme = parseInt(req.params.idfilme)
    const response = await db.query (
        "SELECT * FROM filmelist WHERE idusuario = $1 and idfilme = $2", [id, idfilme]
    );
    
    res.json(response.rows).status(200);
}

// ver por interesse, assistindo ou concluido
exports.findByStatus = async (req, res) => {
    // 0 = não iniciado, 1 = iniciado mas não concluido e 2 = concluido
    let idusuario = parseInt(req.params.idusuario);
    let status = parseInt(req.params.status);
    
    const response = await db.query (
        "SELECT * FROM filmelist WHERE idusuario = $1 and concluido = $2", [idusuario, status]
    );
    
    res.json(response.rows).status(200);
}