import { useRef, forwardRef, useMemo, useState, useEffect } from "react";
import { Form, useSubmit } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import FormSection from "../components/FormSection";
import Variations from "../components/Variations";
import Select from "../components/Select";
import ImageUpload from "../components/ImageUpload";
import store from "../store/store";
import { productApi } from "../store/productApi";
import { categoryApi } from "../store/productCategoryApi";
import { collectionApi } from "../store/collectionApi";
import { typesApi } from "../store/productTypeApi";
import { vendorsApi } from "../store/vendorApi.js";
import { tagsApi } from "../store/tagsApi";

export default function ProductForm({
    register,
    control,
    getValues,
    setValue,
    errors,
    handleSubmit,
}) {
    const hiddenInput = useRef(null);
    const form = useRef(null);
    const submitButton = useRef(null);

    const [selectedLocation, setSelectedLocation] = useState("");
    const [shops, setShops] = useState([]);

    useEffect(() => {
        fetchShops();
    }, []);

    const fetchShops = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/shops");
            const data = await response.json();

            setShops(data);
        } catch (error) {
            console.error("Error fetching shops:", error);
        }
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                method="post"
                encType="multipart/form-data"
                ref={form}
            >
                <div style={styles.twoColumn}>
                    <div className="main">
                        <FormSection>
                            <label htmlFor="name">Title</label>
                            <Input
                                type="text"
                                style={styles.input.text}
                                {...register("name")}
                            />

                            <label htmlFor="description">Description</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={getValues("description") || ""}
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    //console.log('Editor is ready to use!', editor);
                                }}
                                onBlur={(event, editor) => {
                                    //console.log('Blur.', editor);

                                    const data = editor.getData();
                                    setValue("description", data);
                                }}
                                onFocus={(event, editor) => {
                                    //console.log('Focus.', editor);
                                }}
                            />
                            <Input
                                type="text"
                                style={styles.hidden}
                                {...register("description")}
                            />
                        </FormSection>

                        <FormSection title="Media">
                            {getValues("image") && (
                                <img src={getValues("image")} style={styles.image} />
                            )}
                            <ImageUpload
                                register={register}
                                control={control}
                                handleChange={async (files) => {
                                    //todo: handle multiple files
                                    const formData = new FormData();
                                    formData.append("productImage", files);

                                    const {
                                        data: { uploadImage },
                                    } = await store.dispatch(
                                        productApi.endpoints.addProductImage.initiate(formData)
                                    );

                                    setValue("image", uploadImage);
                                }}
                            />
                            <Input
                                type="text"
                                style={styles.hidden}
                                ref={hiddenInput}
                                {...register("image")}
                            />
                        </FormSection>

                        <FormSection title="Pricing">
                            <div style={styles.flex.row}>
                                <div style={styles.flex.column}>
                                    <label htmlFor="price">price</label>
                                    <Input type="number" {...register("price")} />
                                </div>
                                <div style={styles.flex.column}>
                                    <label htmlFor="compare_at_price">compare-at-price</label>
                                    <Input type="number" {...register("compare_at_price")} />
                                </div>
                            </div>

                            <div style={styles.inline}>
                                <Input type="checkbox" {...register("charge_tax")} />
                                <label htmlFor="charge_tax">Charge tax on this product</label>
                            </div>

                            <hr style={styles.hr} />

                            <div style={styles.flex.row}>
                                <div style={styles.flex.column}>
                                    <label htmlFor="cost_per_item">Cost per item</label>
                                    <Input type="number" {...register("cost_per_item")} />
                                </div>
                                <div style={styles.flex.column}>
                                    <label htmlFor="profit">Profit</label>
                                    <Input type="number" {...register("profit")} />
                                </div>
                                <div style={styles.flex.column}>
                                    <label htmlFor="margin">Margin</label>
                                    <Input type="number" {...register("margin")} />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="Inventory">
                            <div style={{ ...styles.flex.column, width: "100%" }}>
                                <div style={styles.inline}>
                                    <Input type="checkbox" {...register("track_quantity")} />
                                    <label htmlFor="track_quantity">Track quantity</label>
                                </div>

                                <hr style={styles.hr} />

                                <div
                                    style={{
                                        ...styles.flex.row,
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <label htmlFor="shop_location">Shop location</label>
                                    <select
                                        id="shop_location"
                                        {...register("shop_location")}
                                    >
                                        <option value="">Select a location</option>
                                        {shops.map((shop) => (
                                            <option key={shop.id} value={shop.id}>
                                                {shop.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>

                            <hr style={styles.hr} />

                            <div style={styles.inline}>
                                <Input type="checkbox" {...register("sell_out_of_stock")} />
                                <label htmlFor="sell_out_of_stock">
                                    Continue selling when out of stock
                                </label>
                            </div>

                            <hr style={styles.hr} />

                            <div style={styles.inline}>
                                <Input type="checkbox" {...register("sku")} />
                                <label htmlFor="sku">This product has a SKU or barcode</label>
                            </div>
                        </FormSection>

                        <FormSection title="Shipping">
                            <div
                                style={{
                                    ...styles.flex.column,
                                    ...styles.bordered,
                                    width: "-webkit-fill-available",
                                    width: "-moz-available",
                                    padding: "1rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                <div style={styles.inline}>
                                    <Input type="checkbox" {...register("physical_product")} />
                                    <label htmlFor="physical_product">Physical product</label>
                                </div>

                                <label htmlFor="shipping_weight">Shipping Weight</label>
                                <Input type="number" {...register("shipping_weight")} />

                                <hr style={styles.hr} />

                                <div style={styles.inline}>
                                    <Input type="checkbox" {...register("customs_info")} />
                                    <label htmlFor="customs_info">
                                        Include customs info for international shipping
                                    </label>
                                </div>
                            </div>

                            <div
                                style={{
                                    ...styles.flex.row,
                                    ...styles.bordered,
                                    alignItems: "center",
                                    width: "-webkit-fill-available",
                                    width: "-moz-available",
                                    padding: ".2rem",
                                }}
                            >
                                <Input type="checkbox" {...register("digital_product")} />
                                <label htmlFor="digital_product">
                                    Digital product or service
                                </label>
                            </div>
                        </FormSection>

                        <FormSection title="Variants">
                            <Variations
                                initialVariants={getValues("variations")}
                                onChange={(data) => {
                                    setValue("variations", JSON.stringify({ variants: data }));
                                }}
                            />
                            <Input
                                type="text"
                                style={styles.hidden}
                                {...register("variations")}
                            />
                        </FormSection>
                    </div>
                    <div className="metadata">
                        <FormSection>
                            <label htmlFor="status">status</label>
                            <select
                                {...register("status")}
                                style={{
                                    width: "100%",
                                }}
                            >
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                            </select>
                        </FormSection>

                        <FormSection>
                            <div
                                style={{
                                    ...styles.flex.row,
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <h2>Publishing</h2>
                            </div>

                            <h3>Sales Channels</h3>
                            <div style={styles.inline}>
                                <Input type="checkbox" {...register("online_store")} />
                                <label htmlFor="online_store">Online Store</label>
                            </div>

                            <div style={styles.inline}>
                                <Input type="checkbox" {...register("point_of_sale")} />
                                <label htmlFor="point_of_sale">Point of Sale</label>
                            </div>

                            <hr style={styles.hr} />

                            <h3>Markets</h3>
                            <div style={styles.inline}>
                                <Input
                                    type="checkbox"
                                    {...register("india_and_international")}
                                />
                                <label htmlFor="india_and_international">
                                    India and International
                                </label>
                            </div>
                        </FormSection>

                        <FormSection>
                            <div
                                style={{
                                    ...styles.flex.row,
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <h2>Product Organization</h2>
                                <a href="#">i</a>
                            </div>
                            <label htmlFor="product_category">Product category</label>
                            <Select
                                name="category"
                                initialValues={getValues("product_category")}
                                getInitialOptions={async () => {
                                    const {
                                        data: { data: categories },
                                    } = await store.dispatch(
                                        categoryApi.endpoints.getCategories.initiate()
                                    );

                                    return categories;
                                }}
                                onChange={(data) => {
                                    setValue("product_category", JSON.stringify({ data }));
                                }}
                            />
                            <Input
                                type="text"
                                style={styles.hidden}
                                {...register("product_category")}
                            />

                            <label htmlFor="product_type">Product type</label>
                            <Select
                                name="type"
                                initialValues={getValues("product_type")}
                                getInitialOptions={async () => {
                                    const {
                                        data: { data: types },
                                    } = await store.dispatch(
                                        typesApi.endpoints.getTypes.initiate()
                                    );

                                    return types;
                                }}
                                onChange={(data) => {
                                    setValue("product_type", JSON.stringify({ data }));
                                }}
                            />
                            <Input
                                type="text"
                                style={styles.hidden}
                                {...register("product_type")}
                            />

                            <label htmlFor="vendor">Vendor</label>
                            <Select
                                name="vendor"
                                initialValues={getValues("vendor")}
                                getInitialOptions={async () => {
                                    const {
                                        data: { data: vendors },
                                    } = await store.dispatch(
                                        vendorsApi.endpoints.getVendors.initiate()
                                    );

                                    return vendors;
                                }}
                                onChange={(data) => {
                                    setValue("vendor", JSON.stringify({ data }));
                                }}
                            />
                            <Input
                                type="text"
                                style={styles.hidden}
                                {...register("vendor")}
                            />

                            <label htmlFor="collections">Collections</label>
                            <Select
                                name="collections"
                                initialValues={getValues("collections")}
                                getInitialOptions={async () => {
                                    const {
                                        data: { data: collections },
                                    } = await store.dispatch(
                                        collectionApi.endpoints.getCollections.initiate()
                                    );

                                    return collections;
                                }}
                                onChange={(data) => {
                                    setValue("collections", JSON.stringify({ data }));
                                }}
                            />
                            <Input
                                type="text"
                                style={styles.hidden}
                                {...register("collections")}
                            />

                            <div
                                style={{
                                    ...styles.flex.row,
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <label htmlFor="tags">Tags</label>
                            </div>
                            <Select
                                name="tags"
                                initialValues={getValues("tags")}
                                getInitialOptions={async () => {
                                    const {
                                        data: { data: tags },
                                    } = await store.dispatch(
                                        tagsApi.endpoints.getTags.initiate()
                                    );

                                    return tags;
                                }}
                                onChange={(data) => {
                                    setValue("tags", JSON.stringify({ data }));
                                }}
                            />
                            <Input type="text" style={styles.hidden} {...register("tags")} />
                        </FormSection>

                        <FormSection title="Online Store">
                            <label htmlFor="theme">Theme template</label>
                            <select
                                {...register("theme")}
                                style={{
                                    width: "100%",
                                }}
                            >
                                <option value="default">default</option>
                            </select>
                        </FormSection>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        const submit = submitButton.current;
                        submit.disabled = false;
                        submit.click();
                        submit.disabled = true;
                    }}
                >
                    submit
                </button>

                <button type="submit" disabled ref={submitButton} style={styles.hidden}>
                    submit
                </button>
            </Form>
        </>
    );
}

const Input = forwardRef(function(props, ref) {
    return (
        <input
            {...props}
            style={{ ...styles.input.base, ...props.style }}
            ref={ref}
        />
    );
});

const styles = {
    flex: {
        column: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "5px",
        },
        row: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "5px",
        },
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    twoColumn: {
        display: "flex",
    },
    inline: {
        display: "inline",
    },
    hidden: {
        display: "none",
    },
    bordered: {
        border: "1px solid grey",
        borderRadius: ".2rem",
    },
    image: {
        width: "50rem",
    },
    input: {
        base: {
            padding: ".3rem",
            margin: ".5rem 0",
            borderRadius: ".2rem",
            borderWidth: "1px",
        },
        text: {
            alignSelf: "stretch",
        },
        number: {},
        checkbox: {},
    },
    hr: {
        border: "none",
        borderBottom: "1px solid grey",
        width: "100%",
    },
};
