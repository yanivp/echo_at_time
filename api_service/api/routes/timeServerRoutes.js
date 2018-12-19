'use strict';
const { body } = require('express-validator/check');

module.exports = function(app) {
  var timeServer = require('../controllers/timeServerController');

  app.post(
    '/echoAtTime',
    [
      body('when')
        .not().isEmpty()
        .toDate()
        .custom(
          value => {
            if(value < Date.now())
              return Promise.reject('Your message occurs in the past');
            return value;
          }
        ),
      body('message')
        .isLength({ max: 100 })
        .not().isEmpty()
        .trim()
        .escape()
    ],
    timeServer.echoAtTime,
  );
};
