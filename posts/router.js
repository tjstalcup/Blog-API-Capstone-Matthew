const express = require('express');


const {Entry} = require('./models');

const router = express.Router();

router.use(express.json());
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });
router.use(jwtAuth);

router.get('/', (req, res) => {
    Entry
    .find({username: req.user.username})
    .then(entries => {
      console.log(req.user)
      res.json({
        entries: entries.map(
          (entry) => entry.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'})
    });
  });


  module.exports = {router};