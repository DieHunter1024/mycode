const _schema = require('../../model/schema')
const config = require('../../../config/config')
let schema = new _schema(config.Collections.Users)
module.exports = schema;