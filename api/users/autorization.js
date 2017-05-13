const acl = require('acl')
const dbInstance = require('../data/connect')

const configAcl = new acl(new acl.mongodbBackend(dbInstance, 'users'))

acl.allow('members', 'events', ['edit', 'view', 'delete'])

acl.addUserRoles('jason', 'members')
