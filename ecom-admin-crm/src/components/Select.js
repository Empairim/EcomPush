import { useEffect, useState } from "react"

export default function Select({
    initialValues,
    getInitialOptions,
    name = "unset",
    onChange
}) {
    const [values, setValues] = useState([]);
    const [options, setOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        setValues(initialValues ?
            (JSON.parse(initialValues).data || []) : []);
    }, [initialValues]);

    useEffect(() => {
        (async () => {
            const tags = (await getInitialOptions()).map((tag) => {
                return tag.name;
            });

            setOptions(tags);
        })();
    }, [getInitialOptions]);

    useEffect(() => {
        if (onChange) {
            onChange(values);
        }
    }, [values]);

    useEffect(() => {
        setFilteredOptions(options.filter((option) => {
            return option.startsWith(value);
        }));
    }, [value]);

    function handleAdd() {
        if (options.includes(value)) {
            setValues([...new Set([...values, value])]);
            setFilteredOptions([]);
            setValue("");
        }
    }

    function handleDelete(idx) {
        setValues([
            ...values.slice(0, idx),
            ...values.slice(idx + 1)]
        );
    }

    return <>
        <div style={{ ...styles.flex, ...styles.selectInput }}>
            {values && values.length > 0 &&
                <>
                    {values.map((value, idx) => {
                        return <div key={`${idx}${value}`} style={styles.selected}>
                            <div style={styles.selectedText}>{value}</div>
                            <button
                                type="button"
                                onClick={() => handleDelete(idx)}
                            >x</button>
                        </div>
                    })}
                </>
            }
            <input
                type="text"
                value={value}
                placeholder={name}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && value.length > 0) {
                        handleAdd();
                    }
                }}
                style={styles.input}
            />
            {value.length > 0 && filteredOptions.length > 0 &&
                <div style={styles.options}>
                    {filteredOptions.map((option, idx) => {
                        return <div key={`${idx}${option}`}>{option}</div>
                    })}
                </div>
            }
        </div>
    </>
}

const styles = {
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px'
    },
    selectInput: {
        maxWidth: '11rem',
        position: 'relative',
        marginBottom: '1rem',
        borderRadius: '.5rem',
        backgroundColor: '#ededed',
        padding: '.5rem'
    },
    selected: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1px',
        margin: '1px',
    },
    selectedText: {
        maxWidth: '5rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    options: {
        position: 'absolute',
        top: '100%',
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        zIndex: '10',
    },
    input: {
        display: 'block',
        minWidth: 'min-content',
        border: 'none',
        background: 'none',
        outline: 'none',
        ':focus': {
            border: 'none',
        }
    }
}
