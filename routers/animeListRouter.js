const router = require('express-promise-router')();
const controller = require('../controllers/animeListController');

router.post('/api/animelist', controller.store);
router.get('/api/animelist', controller.index);
router.get('/api/animelist/:idusuario', controller.show);
router.get('/api/animelist/:idusuario/:idanime', controller.showOnlyOne);
router.put('/api/animelist/:idusuario/:idanime', controller.update);
router.delete('/api/animelist/:idusuario/:idanime', controller.destroy);
// concluido, andamento ou não iniciado (0 - 1 - 2)
router.get('/api/animelist/search/status/:idusuario/:status', controller.findByStatus);


module.exports = router;