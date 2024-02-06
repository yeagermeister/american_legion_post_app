const router = require('express').Router();
const {
  getSingleMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  getAllMenus,
  getTodaysMenu
} = require('../controllers/menuController');

//import auth middleware so we can lockdown routes.

const { authMiddleware } = require('../helpers/auth');
// /api/menu
router.route('/')
.post(authMiddleware, (req, res) => {createMenu (req, res);})
.get(getAllMenus);

router
.route('/today')
.get(getTodaysMenu);

// /api/menu/:menuId
router
  .route('/:menuId')
  .get(getSingleMenu)
  .put(updateMenu)
  .delete(deleteMenu);



  module.exports = router;

  