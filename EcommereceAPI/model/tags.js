const { model } = require("mongoose")
const { namesSlugSchema: TagSchema } = require('./product');

module.exports = {
    tagModel: model('tags', TagSchema),
    tagSchema: TagSchema
}
