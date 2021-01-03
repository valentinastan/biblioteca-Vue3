export default {
  SET_BOOKS (state, books) {
    state.books = books
  },
  SET_TOKEN (state, token) {
    console.log('SETTING TOKEN', token)
    state.token = token
  },
  ADD_BOOK (state, newBook) {
    state.books.push(newBook)
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
  }
}