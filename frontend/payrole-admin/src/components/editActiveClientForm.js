import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { clientUpdate } from '../service/clientService';

const EditActiveClientForm = (props) => {
    const { register, handleSubmit, reset} = useForm();
    const onSubmit = async (payload) => {
        if(!payload.status) {
            const {success, message} = await clientUpdate(props?.clientId, {status: payload.status.toString()});
            if(!success) {
                props.handleShow(true);
                props.setMessage(message);
                setTimeout(()=>{
                    props.handleShow(false);
                }, 3000);
            }
        }
        reset();
        props.handleClose();
        props.setModalFetch(true);
    }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
                <Form.Label className='fs-6'>Active</Form.Label>
                <Form.Switch
                  className='fs-5'
                  value={true}
                  defaultChecked={true}
                  {...register("status")}
                />
            </Form.Group>
          </Col>
        </Row>
        <Modal.Footer className='pb-0'>
            <Button className='submitButton' type="submit">Submit</Button>
        </Modal.Footer>
    </Form>
  )
}

export default EditActiveClientForm