import toast from "react-hot-toast";
import {
  addCollaborator,
  addProjectsInShared,
  deleteCollaborator,
  deleteProjectsInShared,
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

const Collaborators = ({projectId}) => {
  const [colValue, setColValue] = useState("");
  const[onlineUsers, setOnlineUsers] = useState([]);


    const handleAddCollaboartor = async (collaboartor) => {
      // Adding collaborator in database
      if (!collaboartor) toast.error("Please enter collaborator email");
    else{
        try {
          const response = await addCollaborator(
            "/room",
            projectId,
            collaboartor
          );
          onClose();
          const responseForShared = await addProjectsInShared("/shared", collaboartor,  projectId);
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const handleDelete = async (collaborator) => {
      try {
        await deleteCollaborator("/room", projectId, collaborator);
        await deleteProjectsInShared("/shared", collaborator, projectId);
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
      const unsub = onSnapshot(doc(db, "/room", projectId), (doc) => {
        setColValue(doc.data().collaborators);
      });
      if (projectId) {
        const unsub = onSnapshot(doc(db, "/room", projectId), (doc) => {
          setOnlineUsers(doc.data());
        });
      }
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
              {colValue &&
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
          <div className="col-span-1 overflow-hidden  border border-default-300   rounded-xl mt-6">
          <h3 className="text-lg  text-green-400 border-b px-3 border-default-300 py-2 bg-default-100">
              Online Users
            </h3>
            {onlineUsers.online &&
                onlineUsers.online.map((online) => (
                  <div
                    key={online}
                    className="bg-default-50 rounded-md p-2 text-sm shadow-md hover:bg-default-100 cursor-pointer flex gap-4 items-center"
                  > 
                    <span className="rounded-full uppercase bg-secondary-600 text-white text-xs text-semibold w-6 h-6 flex items-center justify-center">
                      {online[0].toUpperCase()}
                    </span>
                    {online}
                  </div>
                ))}
          </div>
        </div>
        {/* leftbar */}
        <AddCollaborator
          handleAddCollaboartor={handleAddCollaboartor}
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      </Layout>
    );
  };
export default Collaborators