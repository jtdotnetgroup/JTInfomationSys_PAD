const getters = {
  TaskQty: state => state.TaskQty.TaskQty,
  token: state => state.account.accessToken,
  permissions: state => state.account.permissions,
  addRouters: state => state.permissions.addRouters
}

export default getters
