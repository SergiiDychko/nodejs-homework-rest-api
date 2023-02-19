const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { id } = req.user;
    const avatarName = `${id}_${uuidv4()}_${originalname}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    
    const cropImg = await jimp.read(tempUpload);
    
    await cropImg.cover(250, 250).writeAsync(tempUpload);
    
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', avatarName).replace('\\', '/');
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
};

module.exports = updAvatar;
