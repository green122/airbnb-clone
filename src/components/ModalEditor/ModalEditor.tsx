import React, { useState, useCallback, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import {Link} from "react-router-dom";

interface IModalEditorProps {
  children: ReactNode;
  buttonLabel?: string;
  proceedHandler: () => void;
}
export function ModalEditor({ children, proceedHandler, buttonLabel }: IModalEditorProps) {
  const history = useHistory();
  return (
    <Modal
      open={true}
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
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
        <Button primary={true} onClick={() => history.goBack()}>
          Close <Icon name="angle right" />
        </Button>
        <Button primary={true}>
           Proceed <Icon name="angle right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
