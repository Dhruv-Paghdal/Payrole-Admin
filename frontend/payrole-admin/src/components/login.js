import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { PersonCircle, LockFill } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { login } from '../service/indexService';
import Alert from './alert';
import './css/login.css';
import '../App.css';

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [show, handleShow] = useState(false);
    const [message, setMessage] = useState("");
    
    const onSubmit = async (payload) => {
        const {success, message, data} = await login(payload);
        if(!success){
            handleShow(true);
            setMessage(message);
            setTimeout(()=>{
                handleShow(false);
            }, 5000);
            reset();
        }
        else {
            localStorage.setItem("token", data);
            // navigate("/Payrole-Admin/dashboard");
            navigate("/dashboard");
        }
    }
    return (
        <>
            <Alert show={show} message={message}/>
            <div className='loginCard'>
                <Card className="mainCard">
                    <Card.Body>
                        <Card.Title className='title'>PAYROLL ADMIN</Card.Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <InputGroup>
                                    <InputGroup.Text style={{backgroundColor: "transparent"}}><PersonCircle color='#019bce'/></InputGroup.Text>
                                    <Form.Control type="text" placeholder="Username" {...register("user_name", { required: {value: true, message: "Username is required"},minLength: {value: 5, message: "Minimum 5 characters required"}})}/>
                                </InputGroup>
                                <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.user_name && errors.user_name.message}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                            <InputGroup>
                                    <InputGroup.Text style={{backgroundColor: "transparent"}}><LockFill color='#019bce'/></InputGroup.Text>
                                    <Form.Control type="password" placeholder="Password" {...register("password", { required: {value: true, message: "Password is required"},minLength: {value: 5, message: "Minimum 5 characters required"}})}/>
                                </InputGroup>
                                <p style={{fontSize: "13px", textAlign: "left", color: "#6c8080"}}> {errors.password && errors.password.message}</p>
                            </Form.Group>
                            <div >
                                <Button className='w-100 submitButton loginButtton' type='submit'>Login</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Login;