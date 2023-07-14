export default function FormSection({ title, children }) {
    return <>
        <div style={styles.div}>
            {title && <h1>{title}</h1>}
            {children}
        </div>
    </>
}

const styles = {
    div: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '0 5px',
        borderRadius: '.5rem',
        margin: '2rem .5rem',
        padding: '1rem',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.4)',
    }
}
