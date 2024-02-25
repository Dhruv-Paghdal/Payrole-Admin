import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { addClient } from '../service/clientService';
import moment from 'moment';

const AddClientForm = (props) => {
    const { register, handleSubmit, reset, formState: { errors }, getValues} = useForm();
    const onSubmit = async (payload) => {
        payload["subscription_start"] = moment(payload.subscription_start).format("YYYY-MM-DD").toString();
        payload["subscription_end"] = moment(payload.subscription_end).format("YYYY-MM-DD").toString();
        const {message, success} = await addClient(payload);
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
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="" {...register("company_name", { required: {value: true, message: "Company Name is required"},minLength: {value: 3, message: "Minimum 3 characters required"}})}/>
                    <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.company_name && errors.company_name.message}</p>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Company Email</Form.Label>
                    <Form.Control type="email" placeholder="" {...register("company_email", { required: {value: true, message: "Company email is required"},minLength: {value: 3, message: "Minimum 3 characters required"}})}/>
                    <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.company_email && errors.company_email.message}</p>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Company Mobile</Form.Label>
                    <Form.Control type="text" placeholder="" {...register("compnay_mobile", { required: {value: true, message: "Company mobile is required"},minLength: {value: 10, message: "Minimum 10 characters required"}, maxLength: {value: 10, message: "Maximum 10 characters required"}})}/>
                    <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.compnay_mobile && errors.compnay_mobile.message}</p>
                </Form.Group>
                </Col>
            </Row> 
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
            <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Company Admin Username</Form.Label>
                    <Form.Control type="text" placeholder="" {...register("company_admin_username", { required: {value: true, message: "Admin username is required"}, minLength: {value: 5, message: "Minimum 5 characters are required"}})}/>
                    <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.company_admin_username && errors.company_admin_username.message}</p>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Company Admin Password</Form.Label>
                    <Form.Control type="text" placeholder="" {...register("company_admin_password", { required: {value: true, message: "Admin password is required"}, minLength: {value: 5, message: "Minimum 5 characters are required"}})}/>
                    <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.company_admin_password && errors.company_admin_password.message}</p>
                </Form.Group>
            </Col>
            </Row>
            <Modal.Footer className='pb-0'>
            <Button className='submitButton' type="submit">Submit</Button>
            </Modal.Footer>
    </Form>
  )
}

export default AddClientForm;