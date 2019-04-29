import axios from '@/lib/axios.js'

export function login (username, password) {
  console.log(username, password)
  return axios({
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data: { usernameOrEmailAddress: username, password }
  })
}
