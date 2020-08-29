const express = require('express');
const router = express.Router();
const bookTransactionLogService = require('./book_transaction_log');


router.get('/bookTransactionLog/list', (req, res) => {
  bookTransactionLogService.getBookTransactionLogList(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
})

module.exports = router;