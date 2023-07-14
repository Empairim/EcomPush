import { useEffect, useState } from "react"

export default function Variations({ initialVariants, onChange }) {


    const [variants, setVariants] = useState([]);

    const [variant, setVariant] = useState("");
    const [attribute, setAttribute] = useState("");


    useEffect(() => {
        setVariants(initialVariants ?
            JSON.parse(initialVariants).variants : []);
    }, [initialVariants]);

    useEffect(() => {
        if (onChange) {
            onChange(variants);
        }
    }, [variants]);

    function handleAdd() {
        const variantString = `${variant},${attribute}`;
        if (
            variant.length > 0 &&
            attribute.length > 0 &&
            !variants.includes(variantString)
        ) {
            setVariants([...variants, variantString]);
            setVariant("");
            setAttribute("");
        }
    }

    function handleDelete(idx) {
        setVariants([
            ...variants.slice(0, idx),
            ...variants.slice(idx + 1)]
        );
    }

    return <>
        <div style={styles.flex}>
            <input
                type="text"
                value={variant}
                placeholder="variant"
                onChange={(e) => {
                    setVariant(e.target.value);
                }}
            />
            <input
                type="text"
                value={attribute}
                placeholder="attribute"
                onChange={(e) => {
                    setAttribute(e.target.value);
                }}
            />
            <button type="button" onClick={handleAdd}>add</button>
        </div>

        <ul>
            {variants.map((variant, idx) => {
                return <div style={styles.flex} key={`${idx}${variant}`}>
                    <li>{variant}</li>
                    <button
                        type="button"
                        onClick={() => handleDelete(idx)}
                    >delete</button>
                </div>
            })}
        </ul>
    </>
}

const styles = {
    flex: {
        display: 'flex',
        gap: '5px'
    }
}
