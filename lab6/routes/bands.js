const express = require('express');
const router = express.Router();
const data = require('../data');
const bandData = data.bands;
const validation = require('../data/validation');



router
  .route('/:id')
  .get(async (req, res) => {
    try{
        req.params.id = validation.checkId(req.params.id);
    } catch (e) {
        res.status(400).json(e);
    }
    
    try {
      let band = await bandData.get(req.params.id);
      for(let i=0; i<band.albums.length; i++){
          band.albums[i]._id = band.albums[i]._id.toString();
      }
      res.status(200).json(band);
    } catch (e) {
      res.status(404).json(e);
    }
  })
  .put(async (req,res) => {
    let bData = req.body;
    try {
      req.params.id = validation.checkId(req.params.id);
      let array = validation.check(bData.name, bData.genre, bData.website, bData.recordLabel, bData.bandMembers, bData.yearFormed);
      bData.name = array[0]; bData.genre = array[1]; bData.website = array[2]; bData.recordLabel = array[3]; bData.bandMembers = array[4]; bData.yearFormed = array[5];
    } catch (e) {
      return res.status(400).json({error: e});
    }
  
    try {
      await bandData.get(req.params.id);
    } catch (e) {
      return res.status(404).json({error: 'Band not found'});
    }
  
    try {
      let updatedPost = await bandData.update(req.params.id,bData.name, bData.genre, bData.website, bData.recordLabel, bData.bandMembers, bData.yearFormed);
      for(let i=0; i<updatedPost.albums.length; i++){
          updatedPost.albums[i]._id = updatedPost.albums[i]._id.toString();
      }
      res.status(200).json(updatedPost);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .delete(async (req, res) => {
    try {
        req.params.id = validation.checkId(req.params.id);
      } catch (e) {
        return res.status(400).json({error: e});
      }
      try {
        await bandData.get(req.params.id);
      } catch (e) {
        return res.status(404).json({error: 'Band not found'});
      }
      try {
        await bandData.remove(req.params.id);
        res.status(200).json({bandId: req.params.id,deleted: true});
      } catch (e) {
        res.status(500).json({error: e});
      }
  });
  // .post(async (req, res) => {
  //   res.send(`POST request to http://localhost:3000/bands/${req.params.id}`);
  // });






router
  .route('/')
  .get(async (req, res) => {
    try {
      const bandsList = await bandData.getAll();
      let outBandsList = [];
      for(let i=0; i<bandsList.length; i++){
        let obj = {};
        obj["_id"] = bandsList[i]._id;
        obj["name"] = bandsList[i].name;
        outBandsList.push(obj);
      }  
      res.status(200).json(outBandsList);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    let bData = req.body;
    try {
        let array = validation.check(bData.name, bData.genre, bData.website, bData.recordLabel, bData.bandMembers, bData.yearFormed);
        bData.name = array[0]; bData.genre = array[1]; bData.website = array[2]; bData.recordLabel = array[3]; bData.bandMembers = array[4]; bData.yearFormed = array[5];
    } catch (e) {
      return res.status(400).json({error: e});
    }
  
    try {
      const newBand = await bandData.create(bData.name, bData.genre, bData.website, bData.recordLabel, bData.bandMembers, bData.yearFormed);
      res.status(200).json(newBand);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });
  // .delete(async (req, res) => {
  //   res.send('DELETE request to http://localhost:3000/bands');
  // })
  // .put(async (req, res) => {
  //   res.send('PUT request to http://localhost:3000/bands');
  // });

module.exports = router;