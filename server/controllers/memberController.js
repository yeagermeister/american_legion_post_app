const { Member } = require('../models');
const { trimId } = require('../helpers/helpers');

module.exports = {
    // Get all members
    getMembers(req, res) {
        Member.find()
            .then(async (members) => {
                const memberObj = {
                    members
                };
                return res.json(memberObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Get a single member
    getSingleMember(req, res) {
        Member.findOne({ _id: req.params.memberId })
            // .select('-__v')
            .lean()
            .then(async (member) =>
                !member
                    ? res.status(404).json({ message: 'No member with that ID' })
                    : res.json({
                        member
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // create a new member
    createMember(req, res) {
        Member.create(req.body)
            .then((member) => {
                let memberId = trimId(member._id);
                return Member.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { members: memberId } },
                    { new: true, runValidators: true }
                );
            })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Delete a member
    deleteMember(req, res) {
        Member.findOneAndDelete({ _id: req.params.memberId })
            .then((member) => {
                if (!member) {
                    return res.status(404).json({ message: 'No member with this ID' });
                }
            })
            .then((menu) => {
                res.json(menu);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
};

