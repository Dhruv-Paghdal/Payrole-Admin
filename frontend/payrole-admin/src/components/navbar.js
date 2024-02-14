import React,{useState} from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './css/navbar.css';
import Modal from './modal';

const Navibar = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("Add Client");
    const [type, setType] = useState("add");
    const handleShow = () => setShow(true);
    return (
        <div style={{height: "10vh"}} className='mx-3'>
            <Modal show={show} setShow={setShow} title={title} type={type}/>
            <Navbar className='pt-3'>
                <Container className='p-0'>
                    <Nav className="me-auto">
                            <Nav.Link href="" className='navLink px-3 active'>Active</Nav.Link>
                            <Nav.Link href="" className='navLink ms-3 px-3'>Inactive</Nav.Link>
                            <Nav.Link href="" className='navLink ms-3 px-3'>Expired</Nav.Link>
                            <Nav.Link href="" className='navLink ms-3 px-3'>Deleted</Nav.Link>
                    </Nav>
                    <div>
                        <Button className='submitButton px-4' onClick={()=>{handleShow(); setTitle("Add Client"); setType("add")}}>
                           <PlusLg fontSize={16} height={16} color='#FFFFFF'/><p className='m-0 ps-2'>Add Clients</p>
                        </Button>
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navibar;