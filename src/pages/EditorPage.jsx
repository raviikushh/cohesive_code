import { useState } from "react";
import Client from "../components/shared/Client";
import Editor from "../components/editor/Editor";
import toast from "react-hot-toast";

const EditorPage = () => {
  const [clients] = useState([
    { socketId: 1, username: "Ravi", email: "ravi@example.com" },
    { socketId: 2, username: "Adarsh", email: "adarsh@example.com" },
    { socketId: 3, username: "Nayak", email: "nayak@example.com" },
  ]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [collaborators, setCollaborators] = useState(clients);

  const handleAddCollaborator = () => {
    if (newCollaborator) {
      const newId = collaborators.length + 1;
      const newCollaboratorObj = { socketId: newId, email: newCollaborator };
      setCollaborators([...collaborators, newCollaboratorObj]);
      console.log(collaborators);
      setNewCollaborator("");
      toast.success("Collaborator added successfully");
    } else {
      toast.error("Please enter a collaboartor email");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* leftbar */}
      <div className="w-64 flex flex-col justify-between bg-gray-800 text-white p-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">
            Project Name
          </h2>
          <h3 className="text-lg mb-6 text-green-400">Language</h3>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Collaborators</h3>
              <button
                onClick={handleAddCollaborator}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition-colors duration-300 shadow-md"
              >
                Add
              </button>
            </div>
            <div className="collaboratorsList flex flex-col gap-2">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.socketId}
                  className="bg-gray-700 rounded-md p-2 text-sm shadow-md"
                >
                  {collaborator.email}
                </div>
              ))}
            </div>
            <div className="addCollaborator flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Add new collaborator"
                value={newCollaborator}
                onChange={(e) => setNewCollaborator(e.target.value)}
                className="flex-1 rounded-md bg-gray-700 text-white px-2 py-1 shadow-md"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Online</h3>
            <div className="clientsList flex flex-col gap-2">
              {clients.map((client) => (
                <Client
                  key={client.socketId}
                  username={client.username}
                  className="bg-gray-700 rounded-md p-2 text-sm shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="buttonContainer flex gap-2">
          <button className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300 shadow-md flex-1">
            LEAVE
          </button>
        </div>
      </div>
      {/* editor */}
      <div className="flex-1 p-4">
        <div className="bg-gray-800 rounded-md p-4 shadow-md h-full">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
