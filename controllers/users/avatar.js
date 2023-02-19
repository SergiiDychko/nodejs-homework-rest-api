const path = require('path');
const fs = require('fs/promises');
// const { nanoid } = require('nanoid');

const avatarsDir = path.join(__dirname, 'public', 'avatars');

const avatar = async (req, res) => {
//   console.log('це баді -----', req.body);
//   console.log('це файл -----', req.file);
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(avatarsDir, originalname)
    await fs.rename(tempUpload, resultUpload);
    const avatar = path.join('avatars', originalname)
    const newUser = {
        // id: nanoid(),
        ...req.body,
        avatar,
    };
};

module.exports = avatar;
