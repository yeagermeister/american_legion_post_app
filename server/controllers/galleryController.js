const { Gallery, User } = require('../models');
const { trimId } = require('../helpers/helpers');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = `/var/www/post291.org/images/`;


if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir) // Use the absolute path
  },
  filename: function (req, file, cb) {
    console.log("Server input in filename function, file: ", file);
    console.log("Server input, in filename function, req.body: ", req); 
    console.log("Server input, in filename function, req.files: ", req.files);
    const title = file.originalname.replace(/\s/g, '_'); // Replace spaces with underscores
    const filename = title + '-' + Date.now() + path.extname(file.originalname); //Appending extension
    cb(null, filename)
  }
});

const upload = multer({ storage: storage });

module.exports = {
    // Get all galleries
    getGalleries(req, res) {
        Gallery.find()
            .then(async (galleries) => {
                const galleryObj = {
                    galleries
                };
                return res.json(galleryObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //Get a single gallery
    getSingleGallery(req, res) {
        Gallery.findOne({ _id: req.params.galleryId })
            .lean()
            .then(async (gallery) =>
                !gallery
                    ? res.status(404).json({ message: 'No gallery with that ID' })
                    : res.json({
                        gallery
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new gallery
    createGallery: [upload.array('pics'), (req, res) => {
      console.log("Server input, in createGallery function, req.body: ", req.body);

      const galleryData = {
        ...req.body,
        pics: req.files.map(file => `${req.protocol}://${req.get('host')}/images/` + file.filename), // Store the file paths in the database
      };
      Gallery.create(galleryData)
        .then((gallery) => res.json(gallery))
        .catch((err) => res.status(500).json(err));
    }],

    // Delete a gallery
    deleteGallery(req, res) {   
        Gallery.findOneAndRemove({ _id: req.params.galleryId })
            .then((gallery) =>
                !gallery
                    ? res.status(404).json({ message: 'No such gallery exists' })
                    // This pulls the gallery reference from the user
                    : User.findOneAndUpdate(
                        { _id: gallery.UserId },
                        { $pull: { gallery: req.params.galleryId } },
                        { new: true }
                    )
            )
            .then(() =>
                res.json({ message: 'Gallery successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //Update a gallery
    updateGallery(req, res) {
        Gallery.findOneAndUpdate({_id: req.params.galleryId }, req.body,{ new: true })
            .then((gallery) => {return res.json(gallery)})
            .catch((err) => res.status(500).json(err));
    },


    // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
      // .select('-__v')
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        let thoughtId = trimId(thought._id);
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thoughtId } },
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

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          // This pulls the thought reference from the user
          : User.findOneAndUpdate(
              { _id: thought.UserId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then(() =>
        res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update the text of a thought
  updateReaction(req, res) {
    Gallery.findOneAndUpdate(
      { _id: req.params.reactionId },
      { reactionBody: req.body.reactionBody },
      { new: true }
    )
    .then((reaction) =>
    !thought
      ? res.status(404).json({ message: 'No such reaction exists' })
      : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
  // create a reaction
  addReaction(req, res) {
    Gallery.findOneAndUpdate(
      { _id: req.params.galleryId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
// Delete a reaction
  removeReaction(req, res) {
    Gallery.findOneAndUpdate(
      { _id: req.params.galleryId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

};
