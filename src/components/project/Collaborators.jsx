import {
  addCollaborator,
  addProjectsInShared,
  deleteCollaborator,
  deleteProjectsInShared,
} from "../../database";
import { doc, onSnapshot } from "firebase/firestore";

import AddCollaborator from "./AddCollaborators";
import { Button } from "@nextui-org/react";
import Icon from "../shared/Icon";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import useAuthState from "../../hooks/useAuthState";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";

const Collaborators = ({ projectId, admin }) => {
  const [room, setRoom] = useState("");
  const { user } = useAuthState();

  const handleAddCollaboartor = async (collaborator) => {
    // Adding collaborator in database
    if (!collaborator) toast.error("Please enter collaborator email");
    else {
      try {
        await Promise.all([
          addCollaborator("/room", projectId, collaborator),
          addProjectsInShared("/shared", collaborator, projectId),
        ]);
        onClose();
      } catch (error) {
        console.error(error);
        toast.error("User doesn't exist on our platform.");
      }
    }
  };

  const handleDelete = async (collaborator) => {
    try {
      await deleteCollaborator("/room", projectId, collaborator);
      await deleteProjectsInShared("/shared", collaborator, projectId);
      toast.success(`${collaborator} removed successfully`);
    } catch (error) {
      console.error(error);
    }
  };

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure(
    "add-collaborator-modal"
  );

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "/room", projectId), (doc) => {
      setRoom(doc.data());
    });
    return () => {
      unsub();
    };
  }, [db]);

  const OnlineMarker = (isOnline) => {
    return (
      <div
        className={`rounded-full w-2 h-2 bg-green-500 ${
          isOnline ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
    );
  };

  return (
    <>
      <div className="p-4 flex flex-col gap-4 h-full w-full max-w-[300px] ">
        {/* Left Sidebar  */}
        <h3 className="text-lg ">Admin</h3>
        <div className="space-y-2">
          <div className="rounded-md p-2 py-2.5 text-sm shadow-md  cursor-pointer text-default-700 flex gap-2 items-center border border-amber-500 bg-amber-500/10">
            <Icon name="crown" size={16} className="text-amber-500 ml-1" />
            <span className="flex-1 flex items-center gap-2 text-amber-500">
              {admin}
            </span>
          </div>
        </div>
        <h3 className="text-lg ">Collaborators</h3>
        {room.collaborators &&
          room.collaborators.map((collaborator) => (
            <div
              key={collaborator}
              className="rounded-md p-2 text-sm shadow-md  cursor-pointer text-default-700 flex gap-2 items-center border border-default-200 bg-default-100/50 hover:border-default-300 hover:bg-default-100"
            >
              <Icon
                name="user"
                size={16}
                className="text-green-500  rounded-full ml-1"
              />
              <span className="flex-1 flex items-center gap-2">
                {collaborator}
              </span>

              {user && user.email === admin && (
                <button
                  className="text-default-400 hover:text-red-500 hover:bg-red-800/25 border border-transparent hover:border-red-500 rounded-md p-1  "
                  onClick={() => handleDelete(collaborator)}
                >
                  <Icon name="x" size={16} />
                </button>
              )}
            </div>
          ))}
        <Button
          color="primary"
          fullWidth
          radius="sm"
          className=""
          onClick={onOpen}
        >
          <Icon name={"user-plus"} size={16} />
          Add Collaborator
        </Button>
      </div>
      {/* leftbar */}
      <AddCollaborator
        handleAddCollaboartor={handleAddCollaboartor}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};
export default Collaborators;
