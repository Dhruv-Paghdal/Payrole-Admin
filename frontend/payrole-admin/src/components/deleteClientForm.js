import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { clientDelete } from '../service/clientService';

const DeleteClientForm = (props) => {
  const handleDelete = async () => {
    const {success, message} = await clientDelete(props.clientId);
    if(!success) {
        props.handleShow(true);
        props.setMessage(message);
        setTimeout(()=>{
            props.handleShow(false);
        }, 3000);
    }
    props.handleClose();
    props.setModalFetch(true);
}
  return (
    <>
    <h6>Are you sure, you want to delete client?</h6>
    <Modal.Footer className='pb-0'>
        <Button className='submitButton' onClick={handleDelete}>Delete</Button>
    </Modal.Footer>
    </>
  )
}

export default DeleteClientForm