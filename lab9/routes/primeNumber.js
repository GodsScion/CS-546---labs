const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("primeNumber/form");
  });
  
  router.post("/", (req, res) => {
    res.render("primeNumber/form");
  });
  
  module.exports = router;