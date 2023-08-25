const express = require("express");
const router = express.Router();
const formsController = require("../controllers/forms.controller");

router.post("/", formsController.create);
router.get("/findall/forms", formsController.findall);
router.post("/:id", formsController.find);
router.put("/:id", formsController.update);
router.delete("/:id", formsController.delete);

module.exports = router;
