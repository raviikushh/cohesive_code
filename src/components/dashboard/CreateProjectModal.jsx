import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { addDocument } from "../../database";
import { useState } from "react";
import useAuthState from "../../hooks/useAuthState";
import { supportedLanguages } from "../../constants/languages";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateProjectModal({ isOpen, onOpenChange, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const [projectName, setProjectName] = useState("");
  const [projectLanguage, setProjectLanguage] = useState("");

  const handleCreateProject = async () => {
    // Adding data in database
    if(!projectName || !projectLanguage)  toast.error('Please fill all the fields');
    else { 
    try {
      const data = {
        name: projectName,
        collaborators : [],
        language: projectLanguage,
        code : '',
        created_by: user.uid,
      };
      const response = await addDocument("/projects", data);
      console.log(response.id);
      onClose();
      navigate(`/project/${response.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <h5>Create a new project</h5>
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label="Project Name"
            labelPlacement="outside"
            value={projectName}
            placeholder="Enter project name"
            onChange={(e) => setProjectName(e.target.value)}
            className="input"
            variant="faded"
          />
          {/* TODO : Add Select component here */}
          <Select
            label="Language"
            labelPlacement="outside"  
            placeholder="Select a language"
            variant="faded"
            value={projectLanguage}
            onChange={(e) => setProjectLanguage(e.target.value)}
            className="bg-seonc"
          >
            {supportedLanguages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            className="font-medium"
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateProjectModal;
