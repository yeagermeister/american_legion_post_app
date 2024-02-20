const router = require('express').Router();
const multer = require('../../helpers/multer');

const {
  getGalleries,
  getSingleGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  addReaction,
  removeReaction,
} = require('../../controllers/galleryController');




// /api/gallery
router.route('/')
.get(getGalleries)
router.post('/', multer.array('pics'), createGallery);

// /api/gallery/:galleryId
router.route('/:galleryId')
.get(getSingleGallery)
.delete(deleteGallery)
.put(updateGallery);

// /api/gallery/:galleryId/reaction
router.route('/:galleryId/reaction')
.post(addReaction)
.delete(removeReaction);

module.exports = router;