import { useEffect, useState } from "react";
import Editor from "./Editor";
import {
  getDocument,
  addOnlineUsers,
  deleteOnlineUsers
} from "../../database";
import useAuthState from "../../hooks/useAuthState";
import { useParams } from "react-router-dom";
import Collaborators from "./Collaborators";

/**
 
 * 1. Get id from the url params - using react router dom
 * 2. Fetch the project details from the database using getDoc
 * 3. Display the project name and language in the leftbar
 *
 */
const ProjectPage = () => {
  const { user } = useAuthState();
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);

  const fetchProjectData = async (id) => {
    // TODO ;Add try catch
    try {
      const data = await getDocument("projects", id);
      setProjectData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnlineUsers = async (projectId) => {
    // Handle Online Users
    try {
      const response = await addOnlineUsers("/room", projectId, user.email);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveOnlineUsers = async (projectId) => {
    // Handle Online Users
    try {
      const response = await deleteOnlineUsers("/room", projectId, user.email);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
      handleOnlineUsers(projectId);
    }
    return () => {
      handleRemoveOnlineUsers(projectId);
    };
  }, [user]);
  // console.log("projectData",projectData.collaborators[0]);
  return (
    <div className="grid grid-cols-4 h-[calc(100vh-80px)] gap-4">
          <Collaborators projectId={projectId} projectData={projectData}/>
             <div className="col-span-3 border-1 overflow-hidden border-default-300 rounded-xl">
            {projectData && (
             <Editor project={projectData} projectId={projectId} />
          )}
        </div>
    </div>
  );
};

export default ProjectPage;
