const express = require('express');
const router = express.Router();
const data = require('../data');
const albumData = data.albums;
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
      let albums = await albumData.getAll(req.params.id);
      if(albums.length === 0) throw 'No albums data found in given band, add some albums';
      res.status(200).json(albums);
    } catch (e) {
      res.status(404).json(e);
    }
  })
  .post(async (req,res) => {
    let bData = req.body;
    try {
      req.params.id = validation.checkId(req.params.id);
      const newChanges = validation.check1(bData.title, bData.releaseDate, bData.tracks, bData.rating);
      bData.title = newChanges[0]; bData.releaseDate = newChanges[1]; bData.tracks = newChanges[2];    
    } catch (e) {
      return res.status(400).json({error: e});
    }
  
    try {
      await data.bands.get(req.params.id);
    } catch (e) {
      return res.status(404).json({error: 'Band not found'});
    }
  
    try {
      let band = await albumData.create(req.params.id,bData.title, bData.releaseDate, bData.tracks, bData.rating)
      for(let i=0; i<band.albums.length; i++){
          band.albums[i]._id = band.albums[i]._id.toString();
      }
      res.status(200).json(band);
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
        await albumData.get(req.params.id);
      } catch (e) {
        return res.status(404).json({error: 'Album not found'});
      }
      try {
        await albumData.remove(req.params.id);
        res.status(200).json({albumId: req.params.id,deleted: true});
      } catch (e) {
        res.status(500).json({error: e});
      }
  });  
  // .put(async (req, res) => {
  //   res.send(`PUT request to http://localhost:3000/albums/${req.params.id}`);
  // })
  // .patch(async (req, res) => {
  //   res.send(`PATCH request to http://localhost:3000/albums/${req.params.id}`);
  // });






router
  .route('/album/:id')
  .get(async (req, res) => {
    try{
        req.params.id = validation.checkId(req.params.id);
    } catch (e) {
        res.status(400).json(e);
    }
    
    try {
      let album = await albumData.get(req.params.id);
      if(!album){ throw 'No albums found with given ID'};
      res.json(album);
    } catch (e) {
      res.status(404).json(e);
    }
  });
  // .post(async (req, res) => {
  //   res.send(`POST request to http://localhost:3000/albums/album/${req.params.id}`);
  // })
  // .delete(async (req, res) => {
  //   res.send(`DELETE request to http://localhost:3000/albums/album/${req.params.id}`);
  // })
  // .patch(async (req, res) => {
  //   res.send(`PATCH request to http://localhost:3000/albums/album/${req.params.id}`);
  // })
  // .put(async (req, res) => {
  //   res.send(`PUT request to http://localhost:3000/albums/album/${req.params.id}`);
  // });

module.exports = router;