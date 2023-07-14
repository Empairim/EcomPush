const { model } = require("mongoose")
const { namesSlugSchema: VendorSchema } = require('./product');

module.exports = {
    vendorModel: model('vendors', VendorSchema),
    vendorSchema: VendorSchema
}
