import { getBooksRequest, postBookRequest, putBookRequest, deleteBookRequest } from '../requests/books'

export default {
  getBooks(context) {
    getBooksRequest().then(books => context.commit('SET_BOOKS', books))
  },

  postBook(context, params) {
    postBookRequest(params).then(createdBook => context.commit('ADD_BOOK', createdBook))
  },

  putBook(context, params) {
    putBookRequest(params).then(updatedBook => context.commit('UPDATE_BOOK', updatedBook))
  },

  deleteBook(context, id) {
    deleteBookRequest(id).then(deletedId => context.commit('DELETE_BOOK', deletedId))

  }
}