import React,{useState} from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './css/navbar.css';
import Modal from './modal';

const Navibar = (props) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("Add Client");
    const [type, setType] = useState("add");
    const handleModalShow = () => setShow(true);
    
    return (
        <div style={{height: "10vh"}} className='mx-3'>
            <Modal show={show} setShow={setShow} title={title} type={type} setMessage={props.setMessage} handleShow={props.handleShow} setModalFetch={props.setModalFetch}/>
            <Navbar className='pt-3'>
                <Container className='p-0'>
                    <Nav className="me-auto">
                            <div id={"ACTIVE"} className='navLink px-3 active' onClick={()=>{props.handleList("ACTIVE")}}>Active</div>
                            <div id={"INACTIVE"} className='navLink ms-3 px-3' onClick={()=>{props.handleList("INACTIVE")}}>Upcoming</div>
                            <div id={"EXPIRED"} className='navLink ms-3 px-3' onClick={()=>{props.handleList("EXPIRED")}}>Expired</div>
                            <div id={"DELETED"} className='navLink ms-3 px-3' onClick={()=>{props.handleList("DELETED")}}>Deleted</div>
                    </Nav>
                    <div>
                        <Button className='submitButton px-4 navButton' onClick={()=>{handleModalShow(); setTitle("Add Client"); setType("add")}}>
                           <PlusLg fontSize={16} height={16} color='#FFFFFF'/><p className='m-0 ps-2'>Add Clients</p>
                        </Button>
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navibar;