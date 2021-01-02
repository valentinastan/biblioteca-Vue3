import { get, post } from './request'

export async function getBooksRequest() {
  let books = await get('books')

  return books.data
}

export async function postBookRequest(params) {
  let newBook = await post('book', params)
  
  console.log('params: ', params)
  console.log('post: ', newBook)

  return newBook.data
}