const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
    const { id: owner } = req.user;

  const data = await Contact.find({ owner }, "-createAt -updateAt").populate('owner', 'name email');
  res.json(data);
};

module.exports = listContacts;