const express = require("express");
const { generateToken } = require("../controllers/tokenController");
const { generateSignature } = require("../controllers/signatureController");

const router = express.Router();

router.post("/token", generateToken);
router.post("/signature", generateSignature);

module.exports = router;
