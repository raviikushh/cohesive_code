import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Input,
  } from "@nextui-org/react";
  import { useState } from "react";
  
  function AddCollaborator({handleAddCollaboartor,projectId, isOpen, onClose ,onOpenChange,  }) {
    const [collaboartor, setNewCollaborator] = useState("");
  
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
              onClick={()=>handleAddCollaboartor(collaboartor)}
            >
              ADD
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default AddCollaborator;
  