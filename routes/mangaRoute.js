const router = require('express-promise-router')();
const controller = require('../controllers/mangaController');

router.post('/api/manga', controller.store);
router.get('/api/manga', controller.index);
router.get('/api/manga/:id', controller.show);
router.put('/api/manga/:id', controller.update);
router.delete('/api/manga/:id', controller.destroy);
router.get('/api/manga/search/lancamento', controller.lancamentos);
router.post('/api/manga/search', controller.findBy);

module.exports = router;