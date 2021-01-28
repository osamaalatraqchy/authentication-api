const CONTACT = require('../model/contactModel');

module.exports = {
    getContacts : async (req, res) =>{

        const contacts = await CONTACT.find();
        res.json({
            result : contacts.map(res => {
                return {
                    id : res.id,
                    name : res.name,
                    phone : res.phone
                }
            })
        })
    },

    insertContact : async (req, res) => {
        const contact = await new CONTACT({
            name : req.body.name,
            phone : req.body.phone
        }).save();

        res.json({
            message : "inserted successfully",
            id : contact.id,
            name : contact.name
        })
    }
}