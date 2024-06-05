import {
  getDocument,
  updateUserStatusToOffline,
  updateUserStatusToOnline,
} from "../../database";
import { set, update } from "firebase/database";
import { useEffect, useState } from "react";

import Collaborators from "./Collaborators";
import CommentsSection from "./Comments";
import Editor from "./Editor";
import Icon from "../shared/Icon";
import { Spinner } from "@nextui-org/react";
import useAuthState from "../../hooks/useAuthState";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { user, isLoading: isUserLoading } = useAuthState();
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  const fetchProjectData = async (id) => {
    try {
      if (!id) throw new Error("No project id");
      if (!user) throw new Error("No user");
      const [project, room] = await Promise.all([
        getDocument("projects", id),
        getDocument("room", id),
      ]);
      console.log(project);
      console.log(room);

      const isCollaborator = room.collaborators.includes(user?.email);
      const isOwner = project.created_by === user?.email;

      if (!isCollaborator && !isOwner) {
        setError("NO_ACCESS");
        throw new Error("NO_ACCESS");
      }

      // User is either a collaborator or the owner of the project
      setProjectData(project);
      setRoom(room);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (projectId && user) {
      fetchProjectData(projectId);
    }
  }, [projectId, user]);

  if (!projectData || !room) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4 text-4xl font-medium text-default-400 text-center p-10">
        <Spinner size="lg" label="Loading your project" />
      </div>
    );
  }

  // Don't show the project page if user is not a collaborator and is not thw owner
  if (error === "NO_ACCESS") {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4 text-4xl font-medium text-default-400 text-center p-10">
        <Icon name="heart-crack" size={120} className="text-rose-500" />
        Oops!! You don't have access to this project. <br /> Please contact the
        project owner to get access <br />
        <em className="font-boldt text-primary-500">
          {" "}
          ({projectData?.created_by}){" "}
        </em>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4 text-4xl font-medium text-default-400 text-center p-10">
        <Icon name="heart-crack" size={120} className="text-rose-500" />
        {error}
      </div>
    );
  }

  return (
    <div className="flex  h-[calc(100vh-80px)] ">
      <Collaborators projectId={projectId} admin={projectData?.created_by} />
      <Editor project={projectData} projectId={projectId} />
      <div className="col-span-1">
        <CommentsSection projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectPage;
