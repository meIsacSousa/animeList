const router = require('express-promise-router')();
const controller = require('../controllers/filmeController');

router.post('/api/filme', controller.store);
router.get('/api/filme', controller.index);
router.get('/api/filme/:id', controller.show);
router.put('/api/filme/:id', controller.update);
router.delete('/api/filme/:id', controller.destroy);
router.get('/api/filme/search/lancamento', controller.lancamentos);
router.post('/api/filme/search', controller.findBy);

module.exports = router;