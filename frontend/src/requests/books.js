import { get } from './request'

export async function getBooksRequest() {
  let books = await get('books')

  return books.data
}