import { Modal, Button } from 'react-bootstrap';

const MessageModal = ({ show, username, onContinue }) => (
  <Modal show={show} centered>
    <Modal.Header>
      <Modal.Title className="w-100 text-center">Login Successful</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      Welcome, {username}! You have successfully logged in.
    </Modal.Body>
    <Modal.Footer className="justify-content-center">
      <Button variant="success" onClick={onContinue}>Continue</Button>
    </Modal.Footer>
  </Modal>
);
export default MessageModal;