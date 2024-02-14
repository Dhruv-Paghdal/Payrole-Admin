import './css/modal.css';
import React,{ useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AppModal = (props) => {
    const show = props.show;
    const setShow = props.setShow;

    const handleClose = () => setShow(false);
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
        <Form>
          {(props.type === "add" || props.type === "edit" || props.type === "active-edit") && <Row>
            <Col>
              <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" placeholder="" disabled={props.type === "edit" || props.type === "active-edit"}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                  <Form.Label>Company Email</Form.Label>
                  <Form.Control type="email" placeholder="" disabled={props.type === "edit" || props.type === "active-edit"}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                  <Form.Label>Company Mobile</Form.Label>
                  <Form.Control type="text" placeholder="" disabled={props.type === "edit" || props.type === "active-edit"}/>
              </Form.Group>
            </Col>
          </Row>}
          {(props.type === "add" || props.type === "edit" || props.type === "active-edit") && <Row>
            <Col>
              <Form.Group className="mb-3">
                  <Form.Label>Subscription Start Date</Form.Label>
                  <Form.Control type="date" placeholder="" disabled={props.type === "active-edit"}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                  <Form.Label>Subscription End Date</Form.Label>
                  <Form.Control type="date" placeholder="" disabled={props.type === "active-edit"}/>
              </Form.Group>
            </Col>
          </Row>}
          {(props.type === "add") && <Row>
            <Col>
              <Form.Group className="mb-3">
                  <Form.Label>Company Admin Username</Form.Label>
                  <Form.Control type="text" placeholder="" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                  <Form.Label>Company Admin Password</Form.Label>
                  <Form.Control type="text" placeholder="" />
              </Form.Group>
            </Col>
          </Row>}
          {(props.type === "delete") && <Row>
            <Col>
              <p className='fs-6 mb-0'>Are you sure, you want to delete client?</p>
            </Col>
          </Row>}
          {(props.type === "active-edit") && <Row>
            <Col>
              <Form.Group className="mb-3">
                  <Form.Label className='fs-6'>Active</Form.Label>
                  <Form.Check
                    type="switch"
                    className='fs-5'
                    defaultChecked
                  />
              </Form.Group>
            </Col>
          </Row>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='submitButton'>{props.type === "delete" ? "Delete" : "Submit"}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AppModal;

// req.body.company_name,
//req.body.company_email,
//req.body.compnay_mobile,
//req.body.subscription_start,
//req.body.subscription_end,
//req.body.company_admin_username,
//req.body.company_admin_password,