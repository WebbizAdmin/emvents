
const node_acl = require('acl')

const initializeAcl = (db) => {
  const mongoBackend = new node_acl.mongodbBackend(db)
  const acl = new node_acl(mongoBackend)
  // console.log('working', acl)
  acl.allow([
    {
      roles: 'members',
      allows: [
        { resources: '/events', permissions: '*' }
      ]
    }])
}

const addUserPermission = (userName) => {
  acl.addUserRoles(userName, 'members')
}

module.exports = {
  initializeAcl,
  addUserPermission
}
