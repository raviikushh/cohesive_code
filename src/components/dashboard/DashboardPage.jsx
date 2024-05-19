import Icon from "../shared/Icon";
import ProjectCard from "./ProjectCard";
import Layout from "../layout/Layout";
import CreateProjectModal from "./CreateProjectModal";
import { useDisclosure } from "@nextui-org/react";
import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";
import { getProjectsByUser, getDocument } from "../../database";
import { useEffect, useState } from "react";
import SharedProjectCard from "./SharedProjectCard";

/**
 * TODO 
 * 1. Write query to get docs from 'projects' collection where 'created_by' is equal to current user's uid.

 */

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthState(); // use user.uid to get currrent users id
  const [projects, setProjects] = useState([]);
  const [sharedProjectData, setsharedProjectData] = useState([]);

  const fetchProjects = async (userId) => {
    const projects = await getProjectsByUser(userId);
    console.log("projects by user",projects);
    setProjects(projects);
  };

  // console.log("Shared projects",sharedProjectData);

  const getSharedProjects = async (email) => {
    try {
      const response = await getDocument("shared", email);
      let shared = [];
      // write a loop to get project data for each response.projects
      for (let i = 0; i < response.projects.length; i++) {
        const projId = response.projects[i];
        const project = await getDocument("projects", projId);
        shared.push({...project,id:projId});
      }
      setsharedProjectData(shared);
      console.log("shared",shared);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    if (user) {
      fetchProjects(user.email);
      getSharedProjects(user.email);
    }
  }, [user]);

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure(
    "create-project-modal"
  );

  return (
    <>
      <Layout>
        <h6 className="text-xl text-gray-200 leading-8 ">Created by me</h6>
        <div className="grid grid-cols-5 gap-4">
          {/* Display all projects created by the user */}
          {/* <ProjectCard name={projects.name} language={projects.language} /> */}
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
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
        <div className="grid grid-cols-5 gap-4">
          {/* Display all projects created by the user */}
          {/* <ProjectCard name={projects.name} language={projects.language} /> */}
          {sharedProjectData.map((projects) => (
          <SharedProjectCard key={projects.created_by} project={projects}
          />
          ))}
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
        {/* <p className="text-default-400">No projects shared with you.</p> */}
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
