import { post } from './request'

export async function postLoginRequest(params) {
  let user = await post('login', params)

  return user.data
}

export async function postSignUpRequest(params) {
  let newUser = await post('signUp', params)

  return newUser.data
}