import z from 'zod';

const ImageMngSchema = z.object({
    thumbnail: z.string(),
    original: z.string()
});

const NameSlugMngSchema = z.object({
    id: z.coerce.string(),
    name: z.string(),
    slug: z.string()
});

const VariationMngSchema = z.object({
    id: z.coerce.string(),
    value: z.string(),
    attribute: NameSlugMngSchema
});

const MetaMngSchema = z.object({
    id: z.coerce.string(),
    title: z.string(),
    content: z.string()
});


export const ProductSchema = z.object({
    sku: z.string().optional(),
    name: z.string().min(4),
    description: z.string().optional(),
    category: NameSlugMngSchema.optional(),
    tags: z.array(NameSlugMngSchema).optional(),
    slug: z.string(),
    image: ImageMngSchema.optional(),
    gallery: z.array(ImageMngSchema).optional(),
    price: z.coerce.number(),
    compare_at_price: z.coerce.number(),
    sale_price: z.coerce.number(),
    charge_tax: z.boolean().default(false),
    quantity: z.number().default(0),
    track_quantity: z.boolean().default(false),
    shop_location: z.number(),
    sell_out_of_stock: z.boolean().default(false),
    physical_product: z.boolean().default(false),
    shipping_weight: z.coerce.number(),
    customs_info: z.string().optional(),
    digital_product: z.boolean().default(false),
    //todo: could be enum
    status: z.string(),
    online_store: z.boolean().default(false),
    point_of_sale: z.boolean().default(false),
    india_and_international: z.boolean().default(false),
    product_type: z.array(NameSlugMngSchema).optional(),
    vendor: z.array(NameSlugMngSchema).optional(),
    //todo: maybe there should be a collections schema
    collections: z.array(NameSlugMngSchema).optional(),
    variations: z.array(VariationMngSchema).optional(),
    meta: z.array(MetaMngSchema).optional(),
    theme: z.string()
});
