import toast from "react-hot-toast";
import {
  addCollaborator,
  deleteCollaborator,
} from "../../database";
import Layout from "../layout/Layout";
import { Button } from "@nextui-org/react";
import Icon from "../shared/Icon";
import AddCollaborator from "./AddCollaborators";
import { useDisclosure } from "@nextui-org/react";
import {useEffect} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

const Collaborators = ({projectId, projectData}) => {
  const [colValue, setColValue] = useState("");


    const handleAddCollaboartor = async (collaboartor) => {
      // Adding collaborator in database
      if (!collaboartor) toast.error("Please enter collaborator email");
    else{
        try {
          const response = await addCollaborator(
            "/projects",
            projectId,
            collaboartor
          );
          onClose();
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const handleDelete = async (collaborator) => {
      try {
        await deleteCollaborator("/projects", projectId, collaborator);
        toast.success(`${collaborator} deleted successfully`);
      } catch (error) {
        console.error(error);
      }
    };
      
    const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure(
      "add-collaborator-modal"
    );
    // console.log("projectData",projectData.collaborators[0]);
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "projects", projectId), (doc) => {
        setColValue(doc.data().collaborators);
      });
      return () => {
        unsub();
      };
    }, [db]);
    return (
      <Layout>
        <div className="">
          {/* Left Sidebar  */}
          <div className="col-span-1 overflow-hidden  border border-default-300   rounded-xl">
            <h3 className="text-lg  text-green-400 border-b px-3 border-default-300 py-2 bg-default-100">
              Collaborators
            </h3>
            <div className="py-2 px-3">
              {projectData &&
                colValue.map((collaborator) => (
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
export default Collaborators