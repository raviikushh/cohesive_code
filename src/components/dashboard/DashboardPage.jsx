import Icon from "../shared/Icon";
import ProjectCard from "./ProjectCard";
import Layout from "../layout/Layout";
import CreateProjectModal from "./CreateProjectModal";
import { useDisclosure } from "@nextui-org/react";
import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getDocument } from "../../database";
import { useEffect, useState } from "react";

/**
 * TODO 
 * 1. Write query to get docs from 'projects' collection where 'created_by' is equal to current user's uid.

 */

const DashboardPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {user} = useAuthState();    // use user.uid to get currrent users id
  // const [projects,setProjects] = useState([]);
const[projects,setProjects] = useState([]);

  console.log("Project id using params",projectId);
  const fetchProjects = async (projectId) => {
    // Write query to get docs from 'projects' collection where 'created_by' is equal to current user's uid.
    try {
      const data = await getDocument("/projects", projectId);
      console.log(data);
      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  }
// console.log("Projects",projects);


  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure(
    "create-project-modal"
  );
  if(!user){
    navigate('/login');
  }

  const userId = projects.created_by;
  console.log("User id",userId)

  useEffect(() => {
    if (projectId) {
      fetchProjects(projectId);
    }
}, [projectId]);

  return (
    <>
      <Layout>
        <h6 className="text-xl text-gray-200 leading-8 ">Created by me</h6>
        <div className="grid grid-cols-5 gap-4">
          {/* Display all projects created by the user */}
          <ProjectCard name={projects.name} language={projects.language} />
          <ProjectCard name={"Cool Project"} language={"Java"} />
          <button
            onClick={() => {
              onOpen();
            }}
            className=" border select-none border-default-200  text-md font-light text-default-400 aspect-video flex flex-col cursor-pointer items-center justify-center rounded-xl hover:shadow-xl hover:bg-default-100/50 hover:text-default-500 hover:border-default-300 active:scale-95 duration-200 ease-out"
          >
            <Icon name="plus" size={32} />
            Create a new project
          </button>
        </div>
        <h6 className="text-xl text-gray-200 leading-8">Shared with me</h6>
        <p className="text-default-400">No projects shared with you.</p>
      </Layout>
      <CreateProjectModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
export default DashboardPage;
