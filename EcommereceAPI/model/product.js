
const { model, Schema, SchemaTypes } = require("mongoose")

const productSchema = new Schema({
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

const NameSlugMngSchema = new Schema({
    id: String,
    name: String,
    slug: String
});

const VariationMngSchema = new Schema({
    id: String,
    value: String,
    attribute: NameSlugMngSchema
});

const MetaMngSchema = new Schema({
    id: String,
    title: String,
    content: String
});


const ProductMngSchema = new Schema({
    sku: String,
    name: String,
    description: String,
    category: NameSlugMngSchema,
    tags: [NameSlugMngSchema],
    slug: String,
    image: ImageMngSchema,
    gallery: [ImageMngSchema],
    price: Number,
    sale_price: Number,
    charge_tax: Number,
    compare_at_price: Number,
    quantity: Number,
    track_quantity: Number,
    shop_location: Number,
    sell_out_of_stock: Boolean,
    physical_product: Boolean,
    shipping_weight: Number,
    customs_info: String,
    digital_product: Boolean,
    //todo: could be enum
    status: String,
    online_store: Boolean,
    point_of_sale: Boolean,
    india_and_international: Boolean,
    product_type: [NameSlugMngSchema],
    vendor: [NameSlugMngSchema],
    //todo: maybe there should be a collections schema
    collections: [NameSlugMngSchema],
    variations: [VariationMngSchema],
    meta: [MetaMngSchema]
});

module.exports = {
    productModel: model('products', ProductMngSchema),
    productSchema: ProductMngSchema,
    namesSlugSchema: NameSlugMngSchema
}
