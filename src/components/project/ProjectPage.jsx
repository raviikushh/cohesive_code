import { useEffect, useState } from "react";
import Client from "../shared/Avatar";
import Editor from "./Editor";
import toast from "react-hot-toast";
import { getDocument } from "../../database";
import { useParams } from "react-router-dom";

/**
 
 * 1. Get id from the url params - using react router dom
 * 2. Fetch the project details from the database using getDoc
 * 3. Display the project name and language in the leftbar
 *
 */
const ProjectPage = () => {
  const { projectId } = useParams();
  const [clients] = useState([
    { socketId: 1, username: "Ravi", email: "ravi@example.com" },
    { socketId: 2, username: "Adarsh", email: "adarsh@example.com" },
    { socketId: 3, username: "Nayak", email: "nayak@example.com" },
  ]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [collaborators, setCollaborators] = useState(clients);
  const [projectData, setProjectData] = useState(null);

  const fetchProjectData = async (id) => {
    // TODO ;Add try catch
    try{
      const data = await getDocument("projects", id);
      console.log(data);
      setProjectData(data);
    }
    // Fetch project data from the database
    catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, []);

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
            {projectData?.name || "Project Name"}
          </h2>
          <h3 className="text-lg mb-6 text-green-400">
            {projectData?.language || "Language"}
          </h3>
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

export default ProjectPage;
