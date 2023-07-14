import { useEffect } from "react"
import { useWatch } from 'react-hook-form';

import store from '../store/store';
import { productApi } from '../store/productApi';

//register and control from react-hook-form useForm hook
export default function ImageUpload({ register, control, handleChange }) {
    const files = useWatch({
        control,
        name: 'productImage'
    });

    useEffect(() => {
        if (files && files[0]) {
            handleChange(files[0]);
        }
    }, [files])

    return <div style={styles.div}>
        <label htmlFor='productImage'>files</label>
        <input
            type='file'
            multiple accept='image/png, image/jpeg'
            {...register('productImage')}
        />
    </div>
}

const styles = {
    div: {
        width: '-webkit-fill-available',
        width: '-moz-available',
        minHeight: '10rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid grey',
        borderStyle: 'dashed',
        borderRadius: '1rem'
    }
}
