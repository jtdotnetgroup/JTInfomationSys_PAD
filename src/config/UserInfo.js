// 用户信息
const UserInfo = {
  accessToken: '',
  encryptedAccessToken: '',
  expireInSeconds: 0,
  userId: 0,
  name: '',
  welcome: '',
  avatar: '',
  roles: [],
  info: {}
}
// 设置用户信息
// export function SetUserInfo (obj) {
//   console.log('2s')
//   this.UserInfo.accessToken = obj.accessToken
//   this.UserInfo.encryptedAccessToken = obj.encryptedAccessToken
//   this.UserInfo.expireInSeconds = obj.expireInSeconds
//   this.UserInfo.userId = obj.userId
//   console.log('3s')
// }
// // 获取用户信息
// export function GetUserInfo () {
//   return this.UserInfo
// }

export default UserInfo
