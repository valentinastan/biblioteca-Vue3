export default {
  SET_BOOKS (state, books) {
    state.books = books
  },
  SET_TOKEN (state, token) {
    console.log('SETTING tOKEN', token)
    state.token = token
  }
}