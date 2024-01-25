const { Menu } = require('../models');
const { trimId } = require('../helpers/helpers');

module.exports = {
// Get todays special
    getTodaysMenu: async (req, res) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
        
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
        
            const menu = await Menu.find({
              serveDate: {
                $gte: today,
                $lt: tomorrow
              }
            });
            if (!menu) {
              return res.status(404).json({ message: 'No menu found for today' });
            }
        
            res.json(menu);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        },
    

    // Get one menu
    getSingleMenu(req, res) {
        Menu.findOne({ _id: req.params.serveDate })
            .then(async (menu) =>
                !menu
                    ? res.status(404).json({ message: 'Single MEnu: No menu with that ID' })
                    : res.json({
                        menu
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createMenu(req, res) {
        Menu.create(req.body)

            .then((menu) => {
                return res.json(menu);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getAllMenus(req, res) {
        Menu.find()
            .then(async (menus) => {
                const menuObj = {
                    menus
                };
                return res.json(menuObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    updateMenu(req, res) {
        Menu.findOneAndUpdate({ _id: req.params.menuId }, req.body, { new: true })
            .then((menu) => {
                return res.json(menu);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    deleteMenu(req, res) {
        Menu.findOneAndDelete({ _id: req.params.menuId })
            .then((menu) => {
                return res.json(menu);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }
};

