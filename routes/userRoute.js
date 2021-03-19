const router = require('express-promise-router')();
const controller = require('../controllers/userController');

router.post('/api/user/login', controller.login);
router.post('/api/user', controller.store);
router.get('/api/user', controller.index);
router.get('/api/user/:id', controller.show);
router.put('/api/user/:id', controller.update);
router.delete('/api/user/:id', controller.destroy);


module.exports = router;