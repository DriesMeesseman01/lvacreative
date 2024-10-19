import { CircularProgress } from '@mui/material'

export default function Loader({ text = '' }) {
    return (
        <div
            style={{
                width: '80%',
                marginTop: '4rem',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}
            >
                <div style={{ padding: '4rem' }}>
                    <h2>{text}</h2>
                </div>
                <div>
                    <CircularProgress />
                </div>
            </div>
        </div>
    )
}
