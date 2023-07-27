const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

router.get('/', controller.getFoodInfo,
  (req, res) => res.json(res.locals.foodInfo)
);

router.post('/',
  controller.postFoodInfo,
  (req, res) => res.json(res.locals.postFoodInfo)
);

router.put('/:filter',
  controller.putFoodInfo,
  (req, res) => res.json(res.locals.putFoodInfo)
);

router.get('/recall',
  controller.recallFoodInfo,
  (req, res) => res.json(res.locals.recallFoodInfo) //dummy data for now
);


module.exports = router;
