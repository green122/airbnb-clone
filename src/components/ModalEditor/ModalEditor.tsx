import React, { useState, useCallback, ReactNode } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

interface IModalEditorProps {
  children: ReactNode;
  buttonLabel: string;
  proceedHandler: () => void;
}
export function ModalEditor({ children, proceedHandler, buttonLabel }: IModalEditorProps) {
  const [showModal, setShowModal] = useState(false);
  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);
  return (
    <Modal
      trigger={<Button onClick={openModal}>{buttonLabel}</Button>}
      open={showModal}
      onClose={closeModal}
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Modal Header</Header>
          <p>
            This is an example of expanded content that will cause the modal's
            dimmer to scroll
          </p>
        </Modal.Description>
        {children}
      </Modal.Content>
      <Modal.Actions>
        <Button primary={true} onClick={closeModal}>
          Close <Icon name="angle right" />
        </Button>
        <Button primary={true} onClick={proceedHandler}>
          Proceed <Icon name="angle right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
