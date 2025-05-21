const express = require('express')
const { getAllBooks, addBook, getOneBook, searchBook } = require('../controllers/bookController')
const { submitReview, updateReview, deleteReview } = require('../controllers/reviewController')
const verifyToken = require('../middlewares/verifyToken')

const bookRoute = express.Router()

//bookController
bookRoute.get('/books', getAllBooks)
bookRoute.post('/books', verifyToken, addBook)
bookRoute.get('/books/:id', getOneBook)
bookRoute.get('/search', searchBook)

//reviewController
bookRoute.post('/books/:id/reviews', verifyToken, submitReview)
bookRoute.put('/reviews/:id', verifyToken, updateReview)
bookRoute.delete('/reviews/:id', verifyToken, deleteReview)


module.exports = bookRoute