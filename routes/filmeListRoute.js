const router = require('express-promise-router')();
const controller = require('../controllers/filmeListController');

router.post('/api/filmelist', controller.store);
router.get('/api/filmelist', controller.index);
router.get('/api/filmelist/:idusuario', controller.show);
router.put('/api/filmelist/:idusuario/:idfilme', controller.update);
router.get('/api/filmelist/:idusuario/:idfilme', controller.showOnlyOne);
router.delete('/api/filmelist/:idusuario/:idfilme', controller.destroy);
router.get('/api/filmelist/search/status/:idusuario/:status', controller.findByStatus);

module.exports = router;