import { useRef, useEffect, useMemo, useState } from 'react';
import { useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ProductForm from '../components/ProductForm';
import store from '../store/store';
import { productApi, useGetProductByIdQuery } from '../store/productApi';
import { ProductSchema } from '../backendZodSchemas/product';
import { formDataToJson } from './AddProduct';

export async function editProductAction({ request }) {
    try {
        const { data } = Object.fromEntries(
            (await request.formData()).entries()
        );

        const res = await store.dispatch(
            productApi.endpoints.updateProduct.initiate(JSON.parse(data))
        );
        console.log(res);

        alert('added product image');
    } catch (err) {
        console.log(err);
    }

    return null;
}

function jsonToFormData(jsonData) {
    if (!jsonData) return {};

    const jsonDataCopy = { ...jsonData }
    //todo: verify correctness

    //todo: fix image doesn't seem to be sent to the backend.
    jsonDataCopy.image = jsonDataCopy.image.thumbnail;

    jsonDataCopy.sale_price = jsonDataCopy.price;

    jsonDataCopy.sku = Boolean(jsonDataCopy.sku);

    jsonDataCopy.customs_info = Boolean(jsonDataCopy.customs_info);

    jsonDataCopy.product_category = JSON.stringify({
        data: jsonDataCopy.category ? [jsonDataCopy.category.name] : []
    });


    jsonDataCopy.product_type = JSON.stringify({
        data: jsonDataCopy.product_type?.map((tag) => {
            return tag.name;
        })
    });

    jsonDataCopy.vendor = JSON.stringify({
        data: jsonDataCopy.vendor?.map((tag) => {
            return tag.name;
        })
    });

    jsonDataCopy.collections = JSON.stringify({
        data: jsonDataCopy.collections?.map((tag) => {
            return tag.name;
        })
    });

    jsonDataCopy.tags = JSON.stringify({
        data: jsonDataCopy.tags.map((tag) => {
            return tag.name;
        })
    });

    jsonDataCopy.variations = JSON.stringify({
        variants: jsonDataCopy.variations.map(variation => {
            return `${variation.value},${variation.attribute.name}`
        })
    });

    return jsonDataCopy;
}

export default function EditProduct() {
    const [input, setInput] = useState("");
    const [id, setId] = useState("");

    return <>
        <input
            type="text"
            value={input}
            onChange={(e) => {
                setInput(e.target.value);
            }}
            onKeyUp={(e) => {
                if (e.code === 'Enter') {
                    setId(input);
                };
            }} />
        <ProductFormWithDefault productId={id} />
    </>
}

function ProductFormWithDefault({
    productId,
}) {
    const { data } = useGetProductByIdQuery(productId);
    const defaults = useMemo(() => {
        return data ? jsonToFormData(data?.[0]) : {};
    }, [data, productId]);

    const {
        register,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm({
        values: defaults,
        resolver: async (data, _, options) => {
            return zodResolver(ProductSchema)(formDataToJson(data), _, options);
        }
    });

    const submit = useSubmit();

    //todo: remove this useEffect, render error messages to the user
    useEffect(() => {
        console.log(errors);
    }, [errors])

    return productId ?
        <ProductForm
            register={register}
            getValues={getValues}
            control={control}
            setValue={setValue}
            errors={errors}
            handleSubmit={handleSubmit((data) => {
                data.id = productId;
                submit({ data: JSON.stringify(data) }, {
                    method: 'POST',
                    action: '/edit-product'
                })
            })} />
        : null;
}
