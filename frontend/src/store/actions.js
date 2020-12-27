import { getBooksRequest } from '../requests/books'

export default {
  getBooks(context) {
    getBooksRequest().then(books => context.commit('SET_BOOKS', books))
  },
}