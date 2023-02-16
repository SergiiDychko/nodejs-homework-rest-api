const { Contact } = require('../../models/contact');

const {requestError} = require('../../helpers')

const getContactById = async (req, res) => {
  const { id: owner } = req.user;

  const { contactId } = req.params;
  const data = await Contact.findOne({owner, contactId}, "-owner");
  if (!data) throw requestError(404, "Not found");
  res.json(data);
};


module.exports = getContactById;