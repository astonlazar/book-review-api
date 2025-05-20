const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    publisher: {
      type: String,
      trim: true
    },
    publishedDate: {
      type: Date
    },
    genres: {
      type: [String],
      default: []
    },
    language: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    reviews: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      review: {
        type: String,
        required: true,
        trim: true
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
  }]
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Book', bookSchema);