const express = require('express');
const router = express.Router();
const { getContacts, insertContact } = require('../logic/contactLogic');

router.get('/', getContacts);
router.post('/', insertContact);

module.exports = router;