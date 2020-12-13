const router = require('express-promise-router')();
const controller = require('../controllers/mangaListController');

router.post('/api/mangalist', controller.store);
router.get('/api/mangalist', controller.index);
router.get('/api/mangalist/:idusuario', controller.show);
router.get('/api/mangalist/:idusuario/:idmanga', controller.showOnlyOne);
router.put('/api/mangalist/:idusuario/:idmanga', controller.update);
router.delete('/api/mangalist/:idusuario/:idmanga', controller.destroy);
router.get('/api/mangalist/search/status/:idusuario/:status', controller.findByStatus);

module.exports = router;