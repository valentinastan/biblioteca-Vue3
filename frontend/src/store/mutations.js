export default {
  SET_BOOKS (state, books) {
    state.books = books
  },
  GET_ONE_BOOK (state, currentBook) {
    state.bookWithDetails = currentBook
  },
  SET_TOKEN (state, token) {
    console.log('SETTING TOKEN', token)
    state.token = token
  },
  ADD_BOOK (state, newBook) {
    state.books.unshift(newBook)
  },
  UPDATE_BOOK (state, updatedBook) {
    state.books = state.books.map( book => {
      if (book.id === updatedBook.id) {
        return updatedBook
      }
      else return book
    })
  },
  DELETE_BOOK (state, deletedId) {
    state.books = state.books.filter( book => book.id !== deletedId)
  },
  SET_REVIEWS (state, reviews) {
    state.reviews = reviews
    console.log('am actualizat state cu', state.reviews )
  },
  ADD_REVIEW (state, newReview) {
    state.reviews.unshift(newReview)
    if(state.reviews.length > 10) {
      state.reviews.pop()  
    }
  }
}