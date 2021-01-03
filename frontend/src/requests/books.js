import { get, post, put, del } from './request'

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

export async function putBookRequest(params) {
  let updatedBook = await put('book/' + params.id, params)
  
  console.log('params: ', params)
  console.log('put: ', updatedBook)

  return updatedBook.data
}

export async function deleteBookRequest(id) {
  let deletedBook = await del('book/' + id)
  
  console.log('deletedBook: ', deletedBook)

  return deletedBook.data
}