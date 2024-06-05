import { Spinner, useDisclosure } from "@nextui-org/react";
import { getDocument, getProjectsByUser } from "../../database";
import { useEffect, useState } from "react";

import CreateProjectModal from "./CreateProjectModal";
import Icon from "../shared/Icon";
import Layout from "../layout/Layout";
import ProjectCard from "./ProjectCard";
import SharedProjectCard from "./SharedProjectCard";
import useAuthState from "../../hooks/useAuthState";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user,isLoading: isUserLoading } = useAuthState(); // use user.uid to get currrent users id
  const [projects, setProjects] = useState([]);
  const [sharedProjectData, setSharedProjectData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const navigate = useNavigate();

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure(
    "create-project-modal"
  );

  const fetchProjects = async (userId) => {
    const projects = await getProjectsByUser(userId);
    console.log("projects by user", projects);
    setProjects(projects);
  };

  const getSharedProjects = async (email) => {
    try {
      const response = await getDocument("shared", email);
      let shared = [];
      // get all the shared project data
      if (response?.projects) {
        for (let i = 0; i < response.projects.length; i++) {
          const projId = response.projects[i];
          const project = await getDocument("projects", projId);
          shared.push({ ...project, id: projId });
        }
        setSharedProjectData(shared);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    setIsLoadingData(true);
    await fetchProjects(user.email);
    await getSharedProjects(user.email);
    setIsLoadingData(false);
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  if (!user && !isUserLoading) return navigate("/login"); 

  return (
    <>
      <Layout>
        {isLoadingData ? (
          <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
            <Spinner size="lg" label="Loading your dashboard" />
          </div>
        ) : (
          <>
            <h6 className="text-xl text-gray-200 leading-8 ">Created by me</h6>
            <div className="grid grid-cols-5 gap-4">
              {/* Display all projects created by the user */}
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
              {sharedProjectData.length === 0 && (
                <span className="text-default-400">
                  No projects shared with you.
                </span>
              )}
              {sharedProjectData.map((projects) => (
                <SharedProjectCard
                  key={projects.created_by}
                  project={projects}
                />
              ))}
            </div>
          </>
        )}
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
