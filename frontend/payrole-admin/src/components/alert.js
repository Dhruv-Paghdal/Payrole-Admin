import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const AlertMessage = (props) => {

  return (
    <ToastContainer
          className='p-3'
          position="top-end"
          style={{ zIndex: 1 }}
        >
          <Toast show={props.show} bg='light' style={{borderColor: "#f8d7da"}}>
            <Toast.Header closeButton={false} style={{borderColor: "#f8d7da"}}>
              <strong className="me-auto">Oops!....</strong>
            </Toast.Header>
            <Toast.Body className='p-4' style={{backgroundColor: "#f8d7da"}}>{props.message}</Toast.Body>
          </Toast>
    </ToastContainer>
  )
}

export default AlertMessage;