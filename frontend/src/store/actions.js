import { getBooksRequest, getOneBookRequest, postBookRequest, putBookRequest, deleteBookRequest } from '../requests/books'
import { getReviewsRequest, postReviewsRequest } from '../requests/reviews'

export default {
  getBooks(context) {
    getBooksRequest().then(books => context.commit('SET_BOOKS', books))
  },

  getOneBook(context, id) {
    getOneBookRequest(id).then(currentBook => context.commit('GET_ONE_BOOK', currentBook))
  },

  postBook(context, params) {
    postBookRequest(params.data, params.header).then(createdBook => context.commit('ADD_BOOK', createdBook))
  },

  putBook(context, params) {
    putBookRequest(params.data, params.header).then(updatedBook => context.commit('UPDATE_BOOK', updatedBook))
  },

  deleteBook(context, params) {
    deleteBookRequest(params.id, params.header).then(deletedId => context.commit('DELETE_BOOK', deletedId))

  },

  getReviews(context, params) {
    getReviewsRequest(params).then(reviews => context.commit('SET_REVIEWS', reviews))
  },

  postReview(context, params) {
    console.log('params = ', params)
    postReviewsRequest(params.data, params.header).then(createdReview => context.commit('ADD_REVIEW', createdReview))
  },
}