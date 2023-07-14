// const mongoose = require('mongoose');

// const shopSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true
//   },
//   owner_id: {
//     type: Number,
//     required: true
//   },
//   owner_name: {
//     type: String,
//     required: true
//   },
//   is_active: {
//     type: Boolean,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   phone: {
//     type: String,
//     required: true
//   },
//   website: {
//     type: String,
//     required: true
//   },
//   ratings: {
//     type: String,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   slug: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   cover_image: {
//     id: {
//       type: Number,
//       required: true
//     },
//     thumbnail: {
//       type: String,
//       required: true
//     },
//     original: {
//       type: String,
//       required: true
//     }
//   },
//   logo: {
//     id: {
//       type: Number,
//       required: true
//     },
//     thumbnail: {
//       type: String,
//       required: true
//     },
//     original: {
//       type: String,
//       required: true
//     }
//   },
//   created_at: {
//     type: Date,
//     required: true
//   },
//   updated_at: {
//     type: Date,
//     required: true
//   }
// });

// const Shop = mongoose.model('Shop', shopSchema);

// module.exports = Shop;

const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  owner_id: { type: Number, required: true },
  owner_name: { type: String, required: true },
  is_active: { type: Boolean, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  ratings: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  cover_image: {
    id: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    original: { type: String, required: true }
  },
  logo: {
    id: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    original: { type: String, required: true }
  },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true }
});

const ShopModel = mongoose.model('Shop', shopSchema);

module.exports = ShopModel;
