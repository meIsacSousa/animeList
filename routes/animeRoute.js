const router = require('express-promise-router')();
const controller = require('../controllers/animeController');

router.post('/api/anime', controller.store);
router.get('/api/anime', controller.index);
router.get('/api/anime/:id', controller.show);
router.put('/api/anime/:id', controller.update);
router.delete('/api/anime/:id', controller.destroy);
router.get('/api/anime/search/lancamento', controller.lancamentos);
router.post('/api/anime/search', controller.findBy);

module.exports = router;