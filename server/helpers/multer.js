const multer = require('multer');
const path = require('path');
const fs = require('fs');

function setupMulter() {
  const dir = `./images/`;

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  };

  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, dir) // Use the absolute path
      },
      filename: function (req, file, cb) {
          const title = file.originalname.replace(/\s/g, '_'); // Replace spaces with underscores
          const filename = title + '-' + Date.now() + path.extname(file.originalname); //Appending extension
          cb(null, filename)
      }
  });

  return multer({ storage: storage });
}

module.exports = setupMulter();