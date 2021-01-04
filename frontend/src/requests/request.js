import axios from 'axios'

let SERVER = 'http://localhost:2020'

export async function get(url, params) {
  let response = await axios.get(`${SERVER}/${url}`, {
    params
  })

  return response
}

const axiosFormActionDefaults = ({ url, method, params = {}, headers = {} }) => ({
  method,
  url,
  data: params,
  headers
})

export async function post(url, params, headers) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'POST',
    params,
    headers,
  }))

  return response
}

export async function del(url, headers) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'DELETE',
    headers,
  }))

  return response
}

export async function put(url, params, headers) {
  let response = await axios(axiosFormActionDefaults({
    url: `${SERVER}/${url}`,
    method: 'PUT',
    params,
    headers,
  }))

  return response
}