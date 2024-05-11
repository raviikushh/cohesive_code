import { useEffect, useState } from "react";
import Editor from "./Editor";
import toast from "react-hot-toast";
import {
  addCollaborator,
  getDocument,
  deleteCollaborator,
} from "../../database";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { Button } from "@nextui-org/react";
import Icon from "../shared/Icon";
import AddCollaborator from "./AddCollaborators";
import { useDisclosure } from "@nextui-org/react";

/**
 
 * 1. Get id from the url params - using react router dom
 * 2. Fetch the project details from the database using getDoc
 * 3. Display the project name and language in the leftbar
 *
 */
const ProjectPage = () => {
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
  const handleAddCollaboartor = async (collaboartor) => {
    // Adding collaborator in database
    if (!collaboartor) toast.error("Please enter collaborator email");
    else {
      try {
        const response = await addCollaborator(
          "/projects",
          projectId,
          collaboartor
        );
        fetchProjectData(projectId);
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (collaborator) => {
    try {
      await deleteCollaborator("/projects", projectId, collaborator);
      fetchProjectData(projectId);
      toast.success("Collaborator deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, []);

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure(
    "add-collaborator-modal"
  );
  // console.log("projectData",projectData.collaborators[0]);

  return (
    <Layout>
      <div className="grid grid-cols-4 h-[calc(100vh-80px)] gap-4">
        {/* Left Sidebar  */}
        <div className="col-span-1 overflow-hidden  border border-default-300   rounded-xl">
          <h3 className="text-lg  text-green-400 border-b px-3 border-default-300 py-2 bg-default-100">
            Collaborators
          </h3>
          <div className="py-2 px-3">
            {projectData &&
              projectData.collaborators.map((collaborator) => (
                <div
                  key={collaborator}
                  className="bg-default-50 rounded-md p-2 text-sm shadow-md hover:bg-default-100 cursor-pointer flex gap-4 items-center"
                >
                  <span className="rounded-full uppercase bg-primary-600 text-white text-xs text-semibold w-6 h-6 flex items-center justify-center">
                    {collaborator[0].toUpperCase()}
                  </span>
                  {collaborator}
                  <Icon
                    onClick={() => handleDelete(collaborator)}
                    name="x"
                    size={16}
                    className="ml-auto"
                  />
                </div>
              ))}

            <Button
              color="primary"
              fullWidth
              radius="sm"
              className="mt-4"
              onClick={onOpen}
            >
              <Icon name={"plus"} size={16} />
              Add Collaborator
            </Button>
          </div>
        </div>
        {/* Editor */}
        <div className="col-span-3 border-1 overflow-hidden border-default-300 rounded-xl ">
          {projectData && (
            <Editor project={projectData} projectId={projectId} />
          )}
        </div>
        {/* Console */}
      </div>
      {/* leftbar */}
      <AddCollaborator
        handleAddCollaboartor={handleAddCollaboartor}
        projectId={projectId}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </Layout>
  );
};

export default ProjectPage;
