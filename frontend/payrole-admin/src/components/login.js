import React from 'react';
import { PersonCircle, LockFill } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './css/login.css';
import '../App.css';

const Login = () => {
    return (
        <div className='loginCard'>
            <Card className="mainCard">
                <Card.Body>
                    <Card.Title className='title'>PAYROLL ADMIN</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <InputGroup>
                                <InputGroup.Text style={{backgroundColor: "transparent"}}><PersonCircle color='#019bce'/></InputGroup.Text>
                                <Form.Control type="text" placeholder="Username" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <InputGroup>
                                <InputGroup.Text style={{backgroundColor: "transparent"}}><LockFill color='#019bce'/></InputGroup.Text>
                                <Form.Control type="password" placeholder="Password" />
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button className='submitButton loginButtton' type='submit'>Login</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login;