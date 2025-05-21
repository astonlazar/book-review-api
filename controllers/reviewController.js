const Book = require('../models/bookModel')
const User = require('../models/userModel')

//function to submit new review
const submitReview = async (req, res) => {
  try {
    const bookId = req.params.id
    const {review, rating} = req.body
    const userEmail = req.user.email
    console.log(bookId, review, rating)

    const bookData = await Book.findById(bookId)
    const userData = await User.findOne({email: userEmail})

    //checking if book or data is present
    if(!bookData || !userData) {
      return res.status(404).json({message: 'User or Book not found'})
    }

    const alreadyReviewed = bookData.reviews.some((elem) => 
      elem.userId.equals(userData._id)
    )

    if(!alreadyReviewed) { //if a user have not submited a review then new review is added
      bookData.reviews.push({
        userId: userData._id,
        review,
        rating
      })
      await bookData.save()
      res.status(201).json({message: 'Review added by user'})
      return
    } else {
      res.status(403).json({message: 'User already added review.'})
      return
    }
  } catch (error) {
    console.error('error in submitReview -', error)
    res.status(500).json({message: 'Server Error'})
  }
}

//function to update review
const updateReview = async (req, res) => {
  try {
    const bookId = req.params.id
    const {review, rating} = req.body
    const userEmail = req.user.email
    const bookData = await Book.findById(bookId)
    const userData = await User.findOne({email: userEmail})
    console.log(bookId, userEmail, userData)
  
    //checking if book or data is present
    if(!bookData || !userData) {
      return res.status(404).json({message: 'User or Book not found'})
    }
    
    //checking for matching review based on user id
    const reviewToUpdate = bookData.reviews.filter((elem, index) => 
      elem.userId.equals(userData._id)
    )

    //updating review and rating
    if(reviewToUpdate) {
      reviewToUpdate[0].review = review
      reviewToUpdate[0].rating = rating
    }
    await bookData.save()
    return res.status(200).json({message: 'Successfull updated'})
  } catch (error) {
    res.status(500).json({message: 'Server Error'})
  }
}

//function to delete review
const deleteReview = async (req, res) => {
  try {
    const bookId = req.params.id
    const userEmail = req.user.email

    const bookData = await Book.findById(bookId)
    const userData = await User.findOne({email: userEmail})

    if(!bookData || !userData) {
      return res.status(404).json({message: 'Book or User not found'})
    }

    let updatedReviews = bookData.reviews.filter(elem => 
      !(elem.userId.equals(userData._id))
    )
    bookData.reviews = updatedReviews
    await bookData.save()
    res.status(200).json({message: 'Review deleted successfully'})
  } catch (error) {
    res.status(500).json({message: 'Server error'})
  }
}

module.exports = {
  submitReview,
  updateReview,
  deleteReview
}