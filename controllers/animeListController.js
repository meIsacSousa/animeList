const db = require('../config/database.js');
const PDFKit = require('pdfkit');
const fs = require('fs');


const pdf = new PDFKit();

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
    let idanime = parseInt(req.params.idanime);
    const {  assistido, comentario } = req.body;

    const response = await db.query(
        "UPDATE animelist SET assistido = $1, comentario = $2 WHERE idusuario = $3 and idanime = $4", [ assistido, comentario, idusuario, idanime ]
    );
    console.log("teste")
    console.log(idanime)
    const animeQuery = await db.query(
        "SELECT * from anime where id = $1", [idanime]
    );
    console.log(animeQuery.rows)
    const anime = animeQuery.rows[0];
    console.log(anime)
    await db.query(
        "SELECT consumo_status_anime($1, $2, $3, $4)", [assistido, anime.episodios, idusuario, idanime]
    );

    res.status(200).json({
        message: "update complete"
    })
}

exports.destroy = async (req, res) => {
    let idusuario = parseInt(req.params.idusuario);
    let idanime = parseInt(req.params.idanime);
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

exports.animePDF = async (req, res) => {
    pdf
        .fontSize('13')
        .text('Anime List', {
            align: 'center'
        })
        .text('Anime I');
    pdf.pipe(fs.createWriteStream('animeList.pdf'));
    pdf.end();
    res.json().status();
}