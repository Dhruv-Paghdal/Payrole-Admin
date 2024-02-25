import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import moment from 'moment';
import { clientUpdate } from '../service/clientService';

const EditExpiredClientForm = (props) => {
    const { register, handleSubmit, formState: { errors }, reset, getValues} = useForm();
    const onSubmit = async (payload) => {
        payload["subscription_start"] = moment(payload.subscription_start).format("YYYY-MM-DD").toString();
        payload["subscription_end"] = moment(payload.subscription_end).format("YYYY-MM-DD").toString();
        const {success, message} = await clientUpdate(props?.clientId, payload);
        if(!success) {
            props.handleShow(true);
            props.setMessage(message);
            setTimeout(()=>{
                props.handleShow(false);
            }, 3000);
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
                <Form.Label>Subscription Start Date</Form.Label>
                <Form.Control type="date" placeholder="" {...register("subscription_start", { valueAsDate: true, required: {value: true, message: "Subscription start date is required"}, validate: value => moment(value).format("YYYY-MM-DD").toString() >= moment().format("YYYY-MM-DD").toString() || "Start date must be greater then present date"})}/>
                <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.subscription_start && errors.subscription_start.message}</p>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3">
                <Form.Label>Subscription End Date</Form.Label>
                <Form.Control type="date" placeholder="" {...register("subscription_end", {valueAsDate: true, required: {value: true, message: "Subscription end date is required"}, validate: value => moment(value).format("YYYY-MM-DD").toString() >  moment(getValues("subscription_start")).format("YYYY-MM-DD").toString() || "End date must be after start date"})}/>
                <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.subscription_end && errors.subscription_end.message}</p>
            </Form.Group>
            </Col>
        </Row>
        <Modal.Footer className='pb-0'>
            <Button className='submitButton' type="submit">Submit</Button>
        </Modal.Footer>
    </Form>
  )
}

export default EditExpiredClientForm