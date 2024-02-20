const router = require('express').Router();
const Member = require('../../models/Member');

const {
  getMembers,
  // getSingleMember,
  deleteMember,
  createMember
} = require('../../controllers/memberController');

//import auth middleware so we can lockdown routes.
const { authMiddleware, adminMiddleware } = require('../../helpers/auth');

// /api/members
router.route('/')
.get(authMiddleware, adminMiddleware, (req, res) => {getMembers (req, res);})
.post(authMiddleware, adminMiddleware, (req, res) => {createMember (req, res);});

// /api/members/:memberId
router.route('/:memberId')
.delete(authMiddleware, adminMiddleware, (req, res) => {deleteMember (req, res);});

router.get('/:memberID', async (req, res) => {
  try {
    const member = await Member.findOne({ memberID: req.params.memberID });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.put('/:memberID', async (req, res) => {
//   try {
//     const member = await Member.findOneAndUpdate(
//       { memberID: req.params.memberID },
//       req.body,
//       { new: true, upsert: true, runValidators: true });
//     if (!member) {
//       return res.status(404).json({ message: 'Member not found' });
//     }
//     res.json(member);
//   }
//   catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;