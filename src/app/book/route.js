const express = require('express')
const router = express.Router()
const bookService = require('./book')


router.get('/book/list', (req, res) => {
  bookService.getBookList(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
})

router.put('/book', (req, res) => {
  bookService.updateBook(req)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
})

module.exports = router;
