const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const schemes = await Schemes.find();
    res.json(schemes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const scheme = await Schemes.findById(id);
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.get('/:id/steps', async (req, res) => {
  const { id } = req.params;

  try {
    const steps = await Schemes.findSteps(id);
    res.json(steps);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.post('/', async (req, res) => {
  const schemeData = req.body;
  try {
    const newScheme = await Schemes.add(schemeData);
    res.json(newScheme);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        return Schemes.addStep(stepData, id);
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id.' })
      }
    })
    .then(step => {
      res.status(201).json(step);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new step' });
    });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const changedScheme = await Schemes.update(id, changes);
    if (changedScheme) {
      res.json(changedScheme);
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to create new step' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Schemes.remove(id);
    if (count) {
      res.json({ message: `deleted ${count} records` });
    } else {
      res.status(404).json({ message: 'invalid id' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'error with db', error: err });
  }
});

module.exports = router;
