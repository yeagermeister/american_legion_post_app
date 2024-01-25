const router = require('express').Router();

const { 
    getAdmins,
    getSingleAdmin,
    createAdmin,
    deleteAdmin,
} = require('../../controllers/adminController');

// /api/admin
router.route('/').get(getAdmins).post(createAdmin).get(getSingleAdmin); 

// /api/admin/:adminId
router.route('/:adminId').delete(deleteAdmin);  

module.exports = router;
