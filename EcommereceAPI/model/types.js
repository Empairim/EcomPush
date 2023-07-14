const { model } = require("mongoose")
const { namesSlugSchema: TypeSchema } = require('./product');

module.exports = {
    typeModel: model('types', TypeSchema),
    typeSchema: TypeSchema
}
