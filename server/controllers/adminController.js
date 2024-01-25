const { Admin } = require('../models')
const { trimId } = require('../helpers/helpers')

module.exports = {
    //Get a single admin
    getSingleAdmin(req, res) {
        Admin.findOne({ _id: req.params.email })
            .then(async (admin) =>
                !admin
                    ? res.status(404).json({ message: 'No admin with that email' })
                    : res.json({
                        admin
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new admin
    createAdmin(req, res) {
        Admin.create(req.body)
            .then((admin) => res.json(admin))
            .catch((err) => res.status(500).json(err));
    },
    // Delete an admin
    deleteAdmin(req, res) {   
        Admin.findOneAndRemove({ _id: req.params.adminId })
            .then((admin) =>
                !admin
                    ? res.status(404).json({ message: 'No such admin exists' })     
                    : res.json({ message: 'Admin successfully deleted' })
            )
            // .then(() =>
            //     res.json({ message: 'Admin successfully deleted' })
            // )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get all admins
    getAdmins(req, res) {
        Admin.find()
            .then(async (admins) => {
                const adminObj = {
                    admins
                };
                return res.json(adminObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }
};



