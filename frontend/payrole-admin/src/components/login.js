import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { PersonCircle, LockFill } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { login } from '../service/indexService';
import './css/login.css';
import '../App.css';

const Login = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await login(data);
        console.log(res);
        navigate("/dashboard");
    }
    return (
        <div className='loginCard'>
            <Card className="mainCard">
                <Card.Body>
                    <Card.Title className='title'>PAYROLL ADMIN</Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <InputGroup>
                                <InputGroup.Text style={{backgroundColor: "transparent"}}><PersonCircle color='#019bce'/></InputGroup.Text>
                                <Form.Control type="text" placeholder="Username" {...register("user_name")}/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <InputGroup>
                                <InputGroup.Text style={{backgroundColor: "transparent"}}><LockFill color='#019bce'/></InputGroup.Text>
                                <Form.Control type="password" placeholder="Password" {...register("password")}/>
                            </InputGroup>
                        </Form.Group>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Button className='submitButton loginButtton' type='submit'>Login</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login;