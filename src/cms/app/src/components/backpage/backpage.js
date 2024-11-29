function Backpage({ handleOnBack }) {
    const handleBackButton = () => {
        handleOnBack()
    }
    return (
        <div className="mb-2">
            <button className="btn ps-0 d-flex gap-1 align-items-center" onClick={handleOnBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="25px" height="25px" fill="gray">
                    <path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241 64 96c0-17.7-14.3-32-32-32S0 78.3 0 96L0 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-145 11.5 9.6 192 160z"/>
                </svg>
                <span style={{fontWeight:"bold",color:"gray", fontSize:"20px"}}>Back</span>
            </button>
        </div>
    )
}

export default Backpage;