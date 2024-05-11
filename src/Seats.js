

export default function Seats() {

    const containerStyle = {
        backgroundColor: 'gray',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    };

    const seatContainerStyle = {
        display: 'flex',       

    }


    return (
        <>
        <div style={{backgroundColor: 'gray', justifyContent: 'center', display: 'flex', padding: '20px'}}>SCREEN</div>
        <div style={containerStyle}>
            <div style={seatContainerStyle}>
                {Array.from({length: 10}, (_, i) => (
                    <Seat />
                ))}
            </div>

            <div style={seatContainerStyle}>
                {Array.from({length: 10}, (_, i) => (
                    <Seat />
                ))}
            </div>

            <div style={seatContainerStyle}>
                {Array.from({length: 20}, (_, i) => (
                    <Seat />
                ))}
            </div>

            <div style={seatContainerStyle}>
                {Array.from({length: 20}, (_, i) => (
                    <Seat />
                ))}
            </div>

            <div style={seatContainerStyle}>
                {Array.from({length: 20}, (_, i) => (
                    <Seat />
                ))}
            </div>

            <div style={seatContainerStyle}>
                {Array.from({length: 20}, (_, i) => (
                    <Seat />
                ))}
            </div>
        </div>
        </>
    )
}

function Seat() {

    const seatStyle = {
        width: '28px',
        height: '28px',
        display: "block",
        cursor: "pointer",
        backgroundColor: 'red',
        borderRadius: '5px',
        margin: '5px'
    }
    return (
        <div style={seatStyle}></div>
    )
}