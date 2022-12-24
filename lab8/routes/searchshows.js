const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/', async (req, res) => {
  let reqBody = req.body;
  let errors = [];

  if (!reqBody.showSearchTerm) {
    errors.push('No search term provided');
  }

  reqBody.showSearchTerm = reqBody.showSearchTerm.toString().trim();

  if (reqBody.showSearchTerm.length === 0) {
    errors.push('Empty spaces not allowed in search');
  }

  if (errors.length > 0) {
    res.status(400).render('searchshows/error', {
        errors: errors,
        title:'Shows Found',
        Subjh1:'Shows Found',
        hasErrors: true,
        showSearchTerm: reqBody.showSearchTerm,
        data: null
      });
  }

  try {
    let url = "http://api.tvmaze.com/search/shows?q="+reqBody.showSearchTerm;
    const {data} = await axios.get(url);

    if(data.length === 0){
        res.render('searchshows/error', {
            errors: errors,
            title:'Shows Found',
            Subjh1:'Shows Found',
            hasErrors: false,
            showSearchTerm: reqBody.showSearchTerm,
            data: null
          });        
    }else{
        let simpleData = [];
        let n=data.length;
        if(n>5){n=5;}

        for(let i=0;i<n;i++){
            let uri = "/show/"+data[i].show.id.toString();
            let str = '<a href="'+uri+'">'+data[i].show.name.toString()+'</a>';
            simpleData.push(str.toString());
        }

        res.render('searchshows/found', {
            errors: errors,
            title:'Shows Found',
            Subjh1:'Shows Found',
            hasErrors: false,
            showSearchTerm: reqBody.showSearchTerm,
            data: simpleData
          });

    }

  } catch (e) {
    res.status(500).json({error: e});
  }
});



module.exports = router;
