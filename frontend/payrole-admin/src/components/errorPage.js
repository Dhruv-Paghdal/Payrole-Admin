import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='loginCard'>
        <Card className="mainCard">
            <Card.Body>
                <Card.Title className='title'>Page Not Found</Card.Title>
                <Card.Text>
                    The page you are attempting to access does not exist at the moment. 
                </Card.Text>
                {/* <Link to="/Payrole-Admin/" onClick={()=>{localStorage.removeItem("token")}}><Button className='w-100 submitButton'>Home</Button></Link> */}
                <Link to="/" onClick={()=>{localStorage.removeItem("token")}}><Button className='w-100 submitButton'>Home</Button></Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default ErrorPage