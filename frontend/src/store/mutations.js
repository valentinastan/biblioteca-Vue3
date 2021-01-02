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
}