const express = require('express');
const router = express.Router();

router.get('/', function(request, response) {
	response.render('../views/layouts/main', {});
});

module.exports = router;