const fs = require('fs');
const path = require('path');

const deleteImage = async (imagePath, folderName) => {
  try {
    const uploadsDir = path.join(__dirname, '..', `/uploads/${folderName}`);
    const filePath = path.join(uploadsDir, imagePath);

      console.log(filePath)

    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log(`File not found: ${filePath}`);
        } else {
          console.error(err);
          // throw new Error('Error deleting file');
        }
      } else {
        console.log('File deleted successfully');
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteImage };