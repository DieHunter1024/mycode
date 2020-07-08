const _schema = require('../../model/schema')
const config = require('../../../config/config')
let schema = new _schema(config.Collections.Order)
module.exports = schema;