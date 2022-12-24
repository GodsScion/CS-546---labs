const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.userApi;

function checkId(str){
    if (!str) throw 'Please enter input, it cannot be empty or null or undefined!';
    if(typeof str != 'string') throw 'ID must be of string type! From Routes Validation!';
    str = str.trim();
    if (str.trim().length === 0) throw 'Inputs with just spaces are not allowed!';
    if (isNaN(str)) throw 'Given input is not a number';
    str = Number(str);
    if(!Number.isInteger(str)) throw 'Given id is not a whole number!';
    if (parseInt(str) < 0) throw 'Id must be greater than 0';

    return true;  
}

router
    .route('/people/:id')
    .get(async (req, res) => {
        try {
            if(checkId(req.params.id)){
                const post = await postData.getPersonById(req.params.id);
                res.json(post);
            }
        } catch (e) {
            res.status(404).json(e);
        }
    })
    .post(async (req, res) => {
        res.send(`POST request to http://localhost:3000/people/${req.params.id}`);
    })
    .delete(async (req, res) => {
        res.send(`DELETE request to http://localhost:3000/people/${req.params.id}`);
    });

router
    .route('/people')
    .get(async (req, res) => {
        try {
          const postList = await postData.getPeople();
          res.json(postList);
        } catch (e) {
          res.status(500).send(e);
        }
      })
      .post(async (req, res) => {
        res.send('POST request to http://localhost:3000/people');
      })
      .delete(async (req, res) => {
        res.send('DELETE request to http://localhost:3000/people');
      });

router
    .route('/work/:id')
    .get(async (req, res) => {
        try {
            if(checkId(req.params.id)){
                const post = await postData.getWorkById(req.params.id);
                res.json(post);
            }
        } catch (e) {
            res.status(404).json(e);
        }
    })
    .post(async (req, res) => {
        res.send(`POST request to http://localhost:3000/work/${req.params.id}`);
    })
    .delete(async (req, res) => {
        res.send(`DELETE request to http://localhost:3000/work/${req.params.id}`);
    });

router
    .route('/work')
    .get(async (req, res) => {
        try {
            const postList = await postData.getWork();
            res.json(postList);
        } catch (e) {
            res.status(500).send(e);
        }
    })
    .post(async (req, res) => {
        res.send('POST request to http://localhost:3000/work');
    })
    .delete(async (req, res) => {
        res.send('DELETE request to http://localhost:3000/work');
    });
    
module.exports = router;