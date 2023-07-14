const express = require('express');
const router = express.Router();
const shopModel = require('../model/shops');


// GET route for /shops
router.get('/', async (req, res) => {
  try {
    const shops = await shopModel.find();
    res.send(shops);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading shops data');
  }
});


// POST route for /shops
router.post('/', async (req, res) => {
  const newShop = req.body;

  try {
    // Check if the shop already exists
    const existingShop = await shopModel.findOne({ name: newShop.name });
    if (existingShop) {
      res.status(409).send('Shop already exists');
      return;
    }

    // Create a new shop
    const createdShop = await shopModel.create(newShop);
    res.send(createdShop);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating shop');
  }
});

module.exports = router;