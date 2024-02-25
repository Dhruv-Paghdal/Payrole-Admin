import './css/modal.css';
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import ClientInfoForm from './clientInfoForm';
import AddClientForm from './addClientForm';
import EditInactiveClientForm from './editInactiveClientForm';
import EditActiveClientForm from './editActiveClientForm';
import EditExpiredClientForm from './editExpiredClientForm';
import DeleteClientForm from './deleteClientForm';

const AppModal = (props) => {
    const show = props.show;
    const setShow = props.setShow;
    const handleClose = () => {setShow(false)};
  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(props.type === "add") && <AddClientForm handleShow={props.handleShow} setMessage={props.setMessage} handleClose={handleClose} setModalFetch={props.setModalFetch}/>}
        {(props.type === "active-edit") && <EditActiveClientForm handleShow={props.handleShow} setMessage={props.setMessage} clientId={props?.data._id} handleClose={handleClose} setModalFetch={props.setModalFetch}/>}
        {(props.type === "inactive-edit") && <EditInactiveClientForm handleShow={props.handleShow} setMessage={props.setMessage} clientId={props?.data._id} handleClose={handleClose} setModalFetch={props.setModalFetch}/>}
        {(props.type === "edit") && <EditExpiredClientForm handleShow={props.handleShow} setMessage={props.setMessage} clientId={props?.data._id} handleClose={handleClose} setModalFetch={props.setModalFetch}/>}
        {(props.type === "delete") && <DeleteClientForm handleShow={props.handleShow} setMessage={props.setMessage} clientId={props?.data._id} handleClose={handleClose} setModalFetch={props.setModalFetch}/>}
        {(props.type === "info") && <ClientInfoForm handleShow={props.handleShow} setMessage={props.setMessage} clientId={props?.data._id} handleClose={handleClose} />}
      </Modal.Body>
    </Modal>
  )
}

export default AppModal;