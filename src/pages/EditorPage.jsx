import  {useState} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'


const EditorPage = () => {
    const [clients] = useState([
        {socketId: 1, username: 'John Doe'},
        {socketId: 2, username: 'Issac Newton'},
    ])


  return (
    <div className="mainwrapper flex h-screen bg-gray-900">
        {/* leftbar */}
        <div className="leftBar w-64 flex flex-col justify-between bg-gray-800 text-white p-4">
            <div className="leftInner">
                <h3 className="text-lg font-semibold mb-4">Connected</h3>
                <div className="clientsList flex flex-col gap-2">
                    {clients.map((client) => (
                        <Client
                            key={client.socketId}
                            username={client.username}
                            className="bg-gray-700 rounded-md p-2 text-sm"
                        />
                    ))}
                </div>
            </div>
            <div className="buttonContainer flex flex-col gap-2">
                <button
                    className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                    onClick={() => {
                        const roomId = 'your_room_id'; // Replace 'your_room_id' with the actual room ID
                        navigator.clipboard.writeText(roomId);
                    }}
                >
                    COPY ROOM ID
                </button>
                <button
                    className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                    LEAVE
                </button>
            </div>
        </div>
        {/* editor */}
        <div className="Editor flex-1">
            <Editor />
        </div>
</div>
  )
}

export default EditorPage