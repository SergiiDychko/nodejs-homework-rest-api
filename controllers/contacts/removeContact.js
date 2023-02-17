const { Contact } = require('../../models/contact');

const { requestError } = require('../../helpers');


const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findOneAndRemove({ owner, contactId });
    if (!data) throw requestError(404, "Not found");
    res.status(201).json({message: "Delete success"});
};

module.exports = removeContact;
