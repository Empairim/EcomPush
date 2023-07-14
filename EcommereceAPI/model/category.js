const { model, Schema, SchemaTypes } = require("mongoose")

const categorySchema = new Schema({
    name: { type: String, default: null, required: true },
    description: { type: String, default: null, required: false },
    slug: { type: String, default: null, required: false },
    image: { type: SchemaTypes.Mixed, default: null, required: false },
    gallery: { type: SchemaTypes.Array, default: null, required: false },
    price: { type: SchemaTypes.Decimal128, default: null, required: false },
    sale_price: { type: SchemaTypes.Decimal128, default: null, required: false },
    variations: { type: SchemaTypes.Mixed, default: null, required: false }
})

const ImageMngSchema = new Schema({
    thumbnail: String,
    original: String
});

const CategoryMngSchema = new Schema({
    name: String,
    tags: [String],
    slug: String,
    image: ImageMngSchema,
    icon: String,
    productCount: Number,
});

module.exports = {
    categoryModel: model('categories', CategoryMngSchema),
    categorySchema: CategoryMngSchema
}
