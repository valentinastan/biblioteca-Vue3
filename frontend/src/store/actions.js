import { getBooksRequest, postBookRequest } from '../requests/books'

export default {
  getBooks(context) {
    getBooksRequest().then(books => context.commit('SET_BOOKS', books))
  },

  postBook(context, params) {
    postBookRequest(params).then(createdBook => context.commit('ADD_BOOK', createdBook))
  }
}