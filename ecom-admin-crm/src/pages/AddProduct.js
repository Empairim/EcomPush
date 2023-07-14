import { useRef, useEffect } from 'react';
import { useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ProductForm from '../components/ProductForm';
import store from '../store/store';
import { productApi } from '../store/productApi';
import { ProductSchema } from '../backendZodSchemas/product';

export async function addProductAction({ request }) {
    try {
        const { data } = Object.fromEntries(
            (await request.formData()).entries()
        );

        const res = await store.dispatch(
            productApi.endpoints.addProduct.initiate(JSON.parse(data))
        );
        console.log(res);

        alert('added product image');
    } catch (err) {
        console.log(err);
    }

    return null;
}

export function formDataToJson(formData) {
    const formDataCopy = { ...formData }
    //todo: verify correctness
    formDataCopy.name = formDataCopy.name.trim();

    formDataCopy.slug = formDataCopy.name.trim().toLowerCase().replace(' ', '-');

    formDataCopy.image = {
        thumbnail: formDataCopy.image,
        original: formDataCopy.image
    };

    formDataCopy.gallery = [formDataCopy.image];

    formDataCopy.charge_tax = Boolean(formDataCopy.charge_tax);
    formDataCopy.track_quantity = Boolean(formDataCopy.track_quantity);

    formDataCopy.sale_price = formDataCopy.price;

    formDataCopy.collections = formDataCopy.collections.split(',');

    formDataCopy.sku = String(formDataCopy.sku);

    formDataCopy.shop_location = parseInt(formDataCopy.shop_location)

    formDataCopy.customs_info = String(formDataCopy.customs_info);

    formDataCopy.category = JSON.parse(formDataCopy.product_category).data.map((tag, idx) => {
        if (tag.length > 0) {

            return {
                id: idx,
                name: tag,
                slug: tag.trim().toLowerCase().replace(' ', '-')
            }
        }
    })[0];

    formDataCopy.product_type = JSON.parse(formDataCopy.product_type).data.map((tag, idx) => {
        if (tag.length > 0) {
            return {
                id: idx,
                name: tag,
                slug: tag.trim().toLowerCase().replace(' ', '-')
            }
        }
    });

    formDataCopy.vendor = JSON.parse(formDataCopy.vendor).data.map((tag, idx) => {
        if (tag.length > 0) {
            return {
                id: idx,
                name: tag,
                slug: tag.trim().toLowerCase().replace(' ', '-')
            }
        }
    });

    formDataCopy.collections = JSON.parse(formDataCopy.collections).data.map((tag, idx) => {
        if (tag.length > 0) {
            return {
                id: idx,
                name: tag,
                slug: tag.trim().toLowerCase().replace(' ', '-')
            }
        }
    });

    formDataCopy.tags = JSON.parse(formDataCopy.tags).data.map((tag, idx) => {
        if (tag.length > 0) {
            return {
                id: idx,
                name: tag,
                slug: tag.trim().toLowerCase().replace(' ', '-')
            }
        }
    });

    formDataCopy.variations = JSON.parse(formDataCopy.variations).variants.map((variation, idx) => {
        const [value, attribute] = variation.split(',');
        return {
            //todo: not sure where this id value should come from for variation
            //and attribute
            id: `${idx}`,
            value,
            attribute: {
                id: `${idx}`,
                name: attribute,
                slug: attribute.trim().toLowerCase().replace(' ', '-')
            }
        }
    });

    return formDataCopy;
}

export default function AddProduct() {
    const {
        register,
        control,
        getValues,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {},
        resolver: async (data, _, options) => {
            return zodResolver(ProductSchema)(formDataToJson(data), _, options);
        }
    });

    const submit = useSubmit();

    //todo: remove this useEffect, render error messages to the user
    useEffect(() => {
        console.log(errors);
    }, [errors])

    return <ProductForm
        register={register}
        control={control}
        getValues={getValues}
        setValue={setValue}
        errors={errors}
        handleSubmit={handleSubmit((data) => {
            submit({ data: JSON.stringify(data) }, {
                method: 'POST',
                action: '/add-product'
            })
        })} />
}
