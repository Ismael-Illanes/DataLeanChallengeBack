const express = require('express');
const router = express.Router();
const formsController = require('../controllers/forms.controller');


router.post("/", formsController.create);
/* router.get('/:id', formsController.find);
router.put('/:id', formsController.update);
router.delete('/:id', formsController.delete);
router.get('/findall/forms', formsController.findAll); */


module.exports = router;
