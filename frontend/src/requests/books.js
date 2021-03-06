import { get, post, put, del } from './request'

export async function getBooksRequest() {
  let books = await get('books')

  return books.data
}

export async function getOneBookRequest(id) {
  let currentBook = await get('books/' + id)

  return currentBook.data
}

export async function postBookRequest(params, headers) {
  let newBook = await post('books', params, headers)

  console.log('params: ', params)
  console.log('post: ', newBook)

  return newBook.data
}

export async function putBookRequest(params, headers) {
  let updatedBook = await put('books/' + params.id, params, headers)
  
  console.log('params: ', params)
  console.log('put: ', updatedBook)

  return updatedBook.data
}

export async function deleteBookRequest(id, headers) {
  await del('books/' + id, headers)
 
  return
}