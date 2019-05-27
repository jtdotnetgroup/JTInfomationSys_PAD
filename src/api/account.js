import axios from '@/lib/axios.js'

export function login (username, password) {
  // console.log(username, password)
  return axios({
    url: 'http://localhost:21021/api/TokenAuth/Authenticate',
    method: 'post',
    data: { usernameOrEmailAddress: username, password }
  })
}
