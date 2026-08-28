import React from "react";
import { Button, Modal } from "@heroui/react";

export default function DeleteConfirmationModal({
  isDelModalOpen,
  setIsDelModalOpen,
  deleteItem,
}) {
  return (
    <div>
      <Modal isOpen={isDelModalOpen} onOpenChange={setIsDelModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90 lg:max-w-120">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Delete Item?</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this item?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full bg-gray-400" slot="close">
                  No
                </Button>
                <Button className="w-full" onClick={deleteItem}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
