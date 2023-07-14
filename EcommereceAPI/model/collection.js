const { model } = require("mongoose")
const { namesSlugSchema: CollectionSchema } = require('./product');

module.exports = {
    collectionModel: model('collections', CollectionSchema),
    collectionSchema: CollectionSchema
}
