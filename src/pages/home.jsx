//import uuid to generate unique room id
import {v4 as uuid} from 'uuid';
import {useState} from 'react';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
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
        navigate(`/editor/${roomId}?name=${userName}`,{
            state:{
                userName,
            },
    });

    }

    //handle enter key press
    const handleEnterKey = (e) => {
        if(e.key === 'Enter') JoinRoom(e);
    }

    return (
        //room id and user name input fields
        <div className="homePageWrapper flex justify-center">
            <div className="formWrapper flex flex-col gap-4 items-center justify-center border-2 p-4 mt-10 h-auto border-gray-900 rounded-md bg-slate-600">
                <h4>Paste invitation ROOM ID</h4>
                <div className="inputGroup flex flex-col gap-2 items-center">
                    <input type="text"  className='border-2 border-gray-700  rounded-md p-2 w-52 text-center bg-slate-300'
                            placeholder="ROOM ID" 
                            //set room id state on change
                            onChange={(e) => setRoomId(e.target.value)}
                            value={roomId}
                            onKeyUp={handleEnterKey}
                    />
                    <input type="text" className='border-2 border-gray-700 rounded-md p-2 w-52 text-center bg-slate-300'
                            placeholder="USER NAME" 
                            //set user name state on change
                            onChange = {(e) => setUserName(e.target.value)}
                            value={userName} 
                            onKeyUp={handleEnterKey}
                    />
                    <button onClick = {JoinRoom} className='border-2 p-1 rounded-md border-slate-700 bg-sky-500 hover:bg-sky-400'>
                        Join Room
                    </button>
                    <span className=''>
                        if you dont have an invite then create &nbsp;
                        <a className='text-green-400 underline hover:text-sky-500'
                            onClick={createNewRoom}
                            href="/editor/123"> new room</a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home