const expressLib = require('express');
const {
  getUsers,
  postUser,
  putUser,
  deleteUserController,
} = require('../controllers/userController');

const router = expressLib.Router();

router.get('/users', getUsers);
router.post('/users', postUser);
router.put('/users/:id', putUser);
router.delete('/users/:id', deleteUserController);

module.exports = router;
