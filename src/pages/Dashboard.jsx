import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { addDocument } from "../database";
import Icon from "../components/shared/Icon";
import ProjectCard from "../components/shared/ProjectCard";
import Layout from "../components/layout/Layout";
import { supportedLanguages } from "../constants/languages";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectLanguage, setNewProjectLanguage] = useState("");

  const handleCreateProject = async () => {
    if (newProjectName && newProjectLanguage) {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        language: newProjectLanguage,
      };

      setProjects([...projects, newProject]);

      setNewProjectName("");
      setNewProjectLanguage("");
      //   navigate(`/editor/${newProject.id}`);
    }
    const data = {
      name: newProjectName,
      language: newProjectLanguage,
    };

    // Adding data in database
    try {
      await addDocument(projects, data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <h6 className="text-xl text-gray-200 leading-8 ">Created by me</h6>
        <div className="grid grid-cols-5 gap-4">
          <ProjectCard name={"Cool Project"} language={"Java"} />
          <ProjectCard name={"Cool Project"} language={"Java"} />
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
              value={newProjectName}
              placeholder="Enter project name"
              onChange={(e) => setNewProjectName(e.target.value)}
              className="input"
              variant="faded"
            />
            {/* TODO : Add Select component here */}
            <Select
              label="Language"
              labelPlacement="outside"
              placeholder="Select a language"
              variant="faded"
              onChange={(e) => setNewProjectLanguage(e.target.value)}
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
    </>
  );
};
export default Dashboard;
