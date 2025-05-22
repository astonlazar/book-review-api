const User = require('../models/userModel')
const Book = require('../models/bookModel')
const mongoose = require('mongoose')

//To get all the books
const getAllBooks = async (req, res) => {
  try {
    const page = req.query.page || 1
    const limit = 5
    const skip = (page - 1) * limit
    const author = req.query.author || ''
    const genre = req.query.genre || ''
  
    const filter = {}
  
    if(author) {
      filter.author = {$regex: author, $options: i}
    }
    if(genre) {
      filter.genres = { $in: [genre] }
    }
  
    //aggregation to find average rating and to connect with the user schema
    const booksData = await Book.aggregate([
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] },
              { $avg: "$reviews.rating" },
              0
            ]
          }
        }
      },
      {
        $lookup: {
          from: "users",             // Collection name of users
          localField: "uploadedBy",  // Field in the Book schema
          foreignField: "_id",       // Matching field in the User collection
          as: "uploadedBy"
        }
      },
      {
        $unwind: "$uploadedBy" // Flatten the uploadedByDetails array
      },
      {
        $project: {'uploadedBy.password': 0} //To not show the password
      },
      { $skip: skip },
      { $limit: limit }
    ]);

  
    const totalBooks = await Book.countDocuments(filter)
    const totalPages = Math.ceil(totalBooks/limit)
  
    res.status(200).json({message: 'Books extracted', page, totalPages, totalBooks, booksData})

  } catch (error) {
    res.status(401).json({message: 'Not able to load bookdata'})
  }
}

//To add a new Book
const addBook = async (req, res) => {
  try {
    const {title, author, publisher, publishedDate, genres, language, description, price} = req.body
    let email = req.user.email

    //creates an array from comma separated genres
    const genresArray = genres
      ? genres.split(',').map(genre => genre.trim())
      : []
    const userData = await User.findOne({email: email})

    
    if(userData) {        //checking for user
      let userId = userData._id
      let newBook = new Book({ //creating a new book data
        title,
        author,
        publisher,
        publishedDate,
        genres: genresArray,
        language,
        description,
        price,
        uploadedBy: userId
      })
      await newBook.save()
      return res.status(201).json({message: 'Book added'})
    } else {
      return res.status(401).json({message: 'Unauthorized'})
    }
  } catch(err) {
    res.status(500).json({message: 'Server Error'})
  }
  res.status(200).json({message: 'Worked'})
}

//To get the data of one by using _id
const getOneBook = async (req, res) => {
  try {
    const bookId = req.params.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit

    //aggregation to show average rating and also pagination for reviews, and connecting to user schema
    const bookData = await Book.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(bookId) } // Match the specific book
      },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] },
              { $avg: "$reviews.rating" },
              0
            ]
          }
        }
      },
      {
        $addFields: {
          paginatedReviews: {
            $slice: ["$reviews", skip, limit]
          },
          totalReviews: { $size: "$reviews" }
        }
      },
      {
        $lookup: {
          from: "users", // Name of the user collection
          localField: "uploadedBy",
          foreignField: "_id",
          as: "uploadedBy"
        }
      },
      {
        $unwind: "$uploadedBy" // Flatten the array
      },
      {
        $project: {
          "uploadedBy.password": 0,
          "uploadedBy.__v": 0
        }
      }
    ]);

    if(bookData) {
      res.status(200).json({message: 'Got the bookData', bookData})
    } else {
      res.status(404).json({message: 'Book not found'})
    }
  } catch (error) {
    res.status(500).json({message: 'Server Error'})
  }
}

//function to search a book based on title or author of the book
const searchBook = async (req, res) => {
  try {
    const {search} = req.query
    if(!search) {
      return res.status(400).json({message: 'Search query is required'})
    }

    const booksData = await Book.find({
      $or: [
        {title: {$regex: search, $options: 'i'}},
        {author: {$regex: search, $options: 'i'}}
      ]
    })
    res.status(200).json({message: 'Search success', booksData})
  } catch (error) {
    res.status(500).json({message: 'Server error'})
  }
}

module.exports = {
  getAllBooks,
  addBook,
  getOneBook,
  searchBook,
}