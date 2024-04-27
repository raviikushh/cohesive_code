//import uuid to generate unique room id
import {v4 as uuid} from 'uuid';
import {useState} from 'react';
import toast from 'react-hot-toast';


const Home = () => {
    const [roomId, setRoomId] = useState(''); //room id state
    const [userName, setUserName] = useState(''); //user name state

    const createNewRoom = (e) => {
        e.preventDefault();
        const RoomId = uuid();
        setRoomId(RoomId);

        // adding toast notification
        toast.success('New room created');
    }

    const JoinRoom = (e) => {
        e.preventDefault();
        if(roomId === '' || userName === '') {
            toast.error('Please enter both room id and user name');
            return;
        }
        else toast.success('Joining room');
        //redirect to the editor page with room id
        window.location.href = `/editor/${roomId}`;
    }

    return (
        //room id and user name input fields
        <div className="homePageWrapper">
            <div className="formWrapper">
                <h4>Paste invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input type="text" 
                            placeholder="ROOM ID" 
                            onChange={(e) => setRoomId(e.target.value)}
                            value={roomId}
                    />
                    <input type="text" 
                            placeholder="USER NAME" 
                            onChange = {(e) => setUserName(e.target.value)}
                            value={userName} 
                    />
                    <button onClick = {JoinRoom}>
                        Join Room
                    </button>
                    <span>
                        if you dont have an invite then create &nbsp;
                        <a 
                            onClick={createNewRoom}
                            href="/editor/123"> new room</a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home