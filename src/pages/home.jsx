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
        <div className="homePageWrapper flex justify-center min-h-screen bg-gray-800">
            <div className="formWrapper flex flex-col gap-8 items-center justify-center border-2 p-8 mt-20 rounded-lg bg-gray-700     shadow-lg">
                <h4 className="text-2xl font-semibold text-white">Paste invitation ROOM ID</h4>
                <div className="inputGroup flex flex-col gap-4 items-center">
                    <input
                        type="text"
                        className="border-2 border-gray-600 rounded-md p-3 w-72 text-center bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleEnterKey}
                    />
                    <input
                        type="text"
                        className="border-2 border-gray-600 rounded-md p-3 w-72 text-center bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="USER NAME"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        onKeyUp={handleEnterKey}
                    />
                    <button
                        onClick={JoinRoom}
                        className="border-2 p-3 rounded-md border-slate-700 bg-blue-600 hover:bg-blue-700 text-white font-semibold w-72 transition-colors duration-300"
                    >
                        Join Room
                    </button>
                    <span className="text-gray-400 text-sm">
                        if you dont have an invite then create &nbsp;
                        <a
                        className="text-green-400 underline hover:text-blue-500 transition-colors duration-300"
                        onClick={createNewRoom}
                        href="/editor/123"
                        >
                        new room
                        </a>
                    </span>
                </div>
             </div>
        </div>
    )
}

export default Home