const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/', apiController.getNotifications)
      .get('/:notificationId', apiController.sendNotification)
      .post('/:notificationId', apiController.markAsRead);

module.exports = router;
