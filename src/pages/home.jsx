
const home = () => {
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <h4>Paste invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input type="text" 
                            placeholder="ROOM ID" />
                    <input type="text" 
                            placeholder="USER NAME" />
                    <button>Join Room</button>
                    <span>
                        if you dont have an invite then create &nbsp;
                        <a href="/editor/123"> new room</a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default home