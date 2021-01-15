import { get, post } from './request'

export async function getReviewsRequest({ bookId, queryParams }) {
  let reviews = await get('books/' + bookId + '/reviews', queryParams)

  return reviews.data
}

export async function postReviewsRequest(params, headers) {
  let newReview = await post('books/' + params.bookId + '/reviews', params, headers)

  console.log('params: ', params)
  console.log('post: ', newReview)

  return newReview.data
}