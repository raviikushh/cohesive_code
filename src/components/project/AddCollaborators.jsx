import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Input,
  } from "@nextui-org/react";
  
  import { addDocument } from "../../database";
  import { useState } from "react";
  import useAuthState from "../../hooks/useAuthState";
  import { useNavigate } from "react-router-dom";
  import toast from "react-hot-toast";
  
  function AddCollaborator({ isOpen, onOpenChange, onClose }) {
    const navigate = useNavigate();
    const { user } = useAuthState();
    const [collaboartor, setNewCollaborator] = useState("");
  
    const handleAddCollaboartor = async () => {
      // Adding data in database
      if(!collaboartor)  toast.error('Please enter collaborator email');
      else { 
      try {
        const data = {
        };
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
            <h5>Add New Collaborator</h5>
          </ModalHeader>
          <ModalBody>
            <Input
              type="email"
              label="Collaborator Email"
              labelPlacement="outside"
              value={collaboartor}
              placeholder="Enter collaborator email"
              onChange={(e) => setNewCollaborator(e.target.value)}
              className="input"
              variant="faded"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              className="font-medium"
              onClick={handleAddCollaboartor}
            >
              ADD
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default AddCollaborator;
  