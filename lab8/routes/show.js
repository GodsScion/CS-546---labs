const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', async (req, res) => {
    try {
      const {data} = await axios.get("http://api.tvmaze.com/shows/"+req.params.id.toString());
      
      if(data && data.name.toString() !== "Not Found"){
        res.render('show/found', {
            data: data,
            title: data.name
        });
      }

    } catch (e) {
      //res.status(500).json({error: e});
      res.status(404).render('show/notfound',{
        title: "Not found",
        id: req.params.id.toString()
      });
    }
  });
  

module.exports = router;
