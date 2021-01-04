import { get, post } from './request'

export async function getReviewsRequest(bookId) {
  let reviews = await get('books/' + bookId + '/reviews')

  return reviews.data
}

export async function postReviewsRequest(params, headers) {
  console.log('params: ', params)
  let newReview = await post('books/' + params.bookId + '/reviews', params, headers)

  console.log('params: ', params)
  console.log('post: ', newReview)

  return newReview.data
}